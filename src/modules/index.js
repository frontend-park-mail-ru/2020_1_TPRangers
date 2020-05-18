// Main modules file
import { Router } from '../Routes/routes';

import LoginView from './View/LoginView';
import Observer from '../controller/observer';
import RegView from './View/RegView';

import ProfileView from './View/ProfileView';
import SettingsView from './View/SettingsView';
import FriendsView from './View/FriendsView';
import NewsView from './View/NewsView';
import MediaView from './View/MediaAlbumsView';
import UserView from './View/UserView';
import MediaPhotosView from './View/MediaPhotosView';
import SendPost from './View/createPostView';
import AddPhotos from './View/addPhotos';
import MessagesView from './View/MessagesView';
import DialogView from './View/DialogView';
import PostView from './View/PostView';
import CreateDialogView from './View/createDialogView';
import GroupView from './View/GroupView';
import singleGroupView from './View/singleGroupView';

// const leftBlockTmpl = require("../pug/includes/modules/left-block.pug");
const testTmpl = require('../pug/pages/news.pug');

const app = document.getElementById('app');

if (!app) console.log('app not found');

app.addEventListener('click', (evt) => {
	if (evt.target instanceof Element) {
		if (
			evt.target.tagName === 'I' ||
			evt.target.tagName === 'LI' ||
			evt.target.tagName === 'DIV' ||
			evt.target.tagName === 'IMG'
		) {
			evt.preventDefault();
			const aNode = evt.target.parentNode;

			if (aNode.tagName === 'A')
				Router.navigate(aNode.getAttribute('section'));
		} else if (evt.target.tagName === 'A') {
			evt.preventDefault();
			Router.navigate(evt.target.getAttribute('section'));
		}
	}
});

const mainBlock = document.getElementById('main-block');

const setActive = linkName => {
	const active = document.getElementsByClassName('nav-link__active-js')
	if (active.length !== 0) {
		active[0].childNodes.forEach(node => {
			node.classList.add('text_color_normal')
			node.classList.remove('text_color_primary')
		})
		active[0].classList.remove('nav-link__active-js')
	}
	const new_active = document.getElementById(linkName)
	new_active.childNodes.forEach(node => {
		node.classList.remove('text_color_normal')
		node.classList.add('text_color_primary')
	})
	new_active.classList.add('nav-link__active-js')
}

//Service Worker init

if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker
			.register('../sw.js')
			.then(() => {
				console.log('[DEBUG] ServiceWorker registered');
			})
			.catch((err) => {
				console.error(err);
			});
	});
}

// TODO: Тут надо добавить обработчики всех страниц
Router.config({ mode: 'history' });

Router.add(/news/, () => {
	console.log('news');
	let news = new NewsView(mainBlock);
	setActive('link-news')
	news.render();
})
	.add(/friends/, () => {
		console.log('friends');
		let friends = new FriendsView(mainBlock);
		setActive('link-friends')
		friends.render();
	})
	.add(/logout/, () => {
		console.log('logout');
		Observer.emit('logout');
	})
	.add(/messages/, () => {
		console.log('messages');
		let messages = new MessagesView(mainBlock);
		setActive('link-messages')
		messages.render();
	})
	.add(/chat\/(.*)/, () => {
		console.log('chat');
		let chat = new DialogView(mainBlock);
		setActive('link-messages')
		chat.render();
	})
	.add(/media/, () => {
		let media = new MediaView(mainBlock);
		setActive('link-media')
		media.render();
		console.log('media');
	})
	.add(/album\/(.*)/, () => {
		console.log(Router.getFragment());
		setActive('link-media')
		let photos = new MediaPhotosView(mainBlock);
		photos.render();
	})
	.add(/settings/, () => {
		console.log('settings' + window.location.href);
		let settings = new SettingsView(mainBlock);
		setActive('link-settings')
		settings.render();
	})
	.add(/user\/(.*)/, () => {
		// console.log(Router.getFragment());
		// console.log('login:', Router.getFragment().split('/')[1]); // так можно вытащить login user

		let user = new UserView(mainBlock);
		user.render(Router.getFragment().split('/')[1]);
	})
	.add(/profile/, () => {
		// console.log(Router.getFragment());
		console.log('profile');
		setActive('link-profile')
		let userProfile = new ProfileView(mainBlock);
		userProfile.render();
	})
	.add(/post\/(.+)/, () => {
		let post = new PostView(mainBlock);
		post.render();
	})
	.add(/login/, () => {
		let login = new LoginView(mainBlock);
		login.render();
	})
	.add(/reg/, () => {
		let reg = new RegView(mainBlock);
		reg.render();
	})
	.add(/createPost\/(.*)/, () => {
		let createPost = new SendPost(mainBlock);
		createPost.render();
	})
	.add(/createAlbum/, () => {
		let createAlbum = new CreateAlbumView(mainBlock);
		setActive('link-media')
		createAlbum.render();
	})
	.add(/addPhotos\/(.*)/, () => {
		let addPhotos = new AddPhotos(mainBlock);
		setActive('link-media')
		addPhotos.render();
	})
	.add(/createDialog/, () => {
		const createDialog = new CreateDialogView(mainBlock)
		createDialog.render()
	})
	.add(/groups/, () => {
		const GroupList = new GroupView(mainBlock);
		setActive('link-groups')
		GroupList.render();
	})
	.add(/group\/(.+)/, () => {
		const singleGroup = new singleGroupView(mainBlock);
		setActive('link-groups')
		singleGroup.render();
	})
	.add(
		/(?!news$)(?!friends$)(?!messages$)(?!media$)(?!album\/(.*)$)(?!settings$)(?!user\/(.*)$)(?!profile$)(?!login$)(?!reg$)(?!logout$)/,
		() => {
			let news = new NewsView(mainBlock);
			setActive('link-news')
			news.render();
			//Router.navigate();
		},
	)
	.listen();

window.addEventListener('unload', () => {
	window.socket.close();
});

window.onbeforeunload = function() {
	window.socket.close();
};

if (navigator.onLine) {
	//Initial check to understand if user authorized and to check '/' route
	Observer.emit('start');
} else {
	Observer.emit('render:error', {
		status: 'Вы оффлайн',
		text: 'Надеемся, что вы скоро снова присоденитесь к нам ',
		backButton: false,
	});
}
