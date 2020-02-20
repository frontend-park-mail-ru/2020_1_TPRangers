import {createPost} from './createPost.js';
import createLinks from "./createLinks.js";

export function createProfile(parent, user = {
  name: 'UserName',
  dateOfB: '00',
  monthOfB: '00',
  yearOfB: '0000',
  avatar: 'https://picsum.photos/200/300'
}) {
  parent.innerHTML = '';

  const leftBlock = document.createElement('div');
  leftBlock.classList.add('leftBlock');

  const rightBlock = document.createElement('div');
  rightBlock.classList.add('rightBlock');

  const avatar = document.createElement('img');
  avatar.classList.add('userAvatar');
  avatar.src = user.avatar;

  const topDataForUserProfile = document.createElement('div');
  topDataForUserProfile.classList.add('topDataForUserProfile');

  const nameAndDateForUserProfile = document.createElement('div');
  nameAndDateForUserProfile.classList.add('nameAndDateForUserProfile');

  const name = document.createElement('span');
  name.classList.add('userName');
  name.textContent = user.name;

  const dateOfBLabel = document.createElement('span');
  dateOfBLabel.classList.add('dateOfBLabel');
  dateOfBLabel.textContent = 'Date of birth: ';

  const dateOfB = document.createElement('span');
  dateOfB.classList.add('dateOfBUser');
  dateOfB.textContent = `${user.dateOfB}.${user.monthOfB}.${user.yearOfB}`;

  nameAndDateForUserProfile.appendChild(name);
  nameAndDateForUserProfile.appendChild(dateOfBLabel);
  nameAndDateForUserProfile.appendChild(dateOfB);
  topDataForUserProfile.appendChild(nameAndDateForUserProfile);

  topDataForUserProfile.innerHTML += createLinks({
    name: 'Редактировать профиль',
    link: 'settings',
    cl: 'userSettings'
  });

  rightBlock.appendChild(topDataForUserProfile);

  for (let i = 0; i < 10; ++i) {
    createPost(rightBlock);
  }

  leftBlock.appendChild(avatar);

  parent.appendChild(leftBlock);
  parent.appendChild(rightBlock);
}