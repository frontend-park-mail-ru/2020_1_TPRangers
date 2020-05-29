import IView from './IView';
import Observer from '../../controller/observer';
import { fetchGET } from '../../ajax/ajax';
import { Router } from '../../Routes/routes';

const postTmpl = require('../../pug/pages/singlePost.pug');

export default class PostView extends IView {
	render() {
		const postId = Router.getFragment().split('/')[1];
		fetchGET({
			url: BACKEND_IP + '/api/v1/profile',
			callback: profileResp => {
				profileResp.json()
					.then(profileResp => {
						fetchGET({
							url: BACKEND_IP + `/api/v1/post/${postId}/comments`,
							callback: (response) => {
								response.json().then((response) => {
									if (!response.comments) response.comments = [];
									response.isMe = profileResp.user.login === response.authorUrl;
									let date = new Date(Date.parse(response.date));
									response.date =  ('0' + date.getDate()).slice(-2) +  '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear()  + ' в ' + date.getHours() + ':' + ('0' + date.getMinutes()).slice(-2);
									response.comments.forEach(val => {
										val.isMe = profileResp.user.login === val.authorUrl;
										let date = new Date(Date.parse(val.date));
										val.date =  ('0' + date.getDate()).slice(-2) +  '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear()  + ' в ' + date.getHours() + ':' + ('0' + date.getMinutes()).slice(-2);
									})
									const data = {
										data: response,
										main: true,
									};
									console.log(data)
									super.clear();
									this.parent.innerHTML += postTmpl(data);
									Observer.emit('listenPostsLikes');
									Observer.emit('singlePost:render');
									Observer.emit('listenCommentLikes');
								});
							},
						});
					})
			}
		})
	}
}
