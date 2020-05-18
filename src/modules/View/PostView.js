import IView from './IView';
import Observer from '../../controller/observer';
import { fetchGET } from '../../ajax/ajax';
import { Router } from '../../Routes/routes';

const postTmpl = require('../../pug/pages/singlePost.pug');

export default class PostView extends IView {
	render() {
		const postId = Router.getFragment().split('/')[1];
		fetchGET({
			url: BACKEND_IP + `/api/v1/post/${postId}/comments`,
			callback: (response) => {
				response.json().then((response) => {
					if (!response.comments) response.comments = [];
					const data = {
						data: response,
						main: true,
					};
					console.log(data);
					super.clear();
					this.parent.innerHTML += postTmpl(data);
					Observer.emit('listenPostsLikes');
					Observer.emit('singlePost:render');
					Observer.emit('listenCommentLikes');
				});
			},
		});
	}
}
