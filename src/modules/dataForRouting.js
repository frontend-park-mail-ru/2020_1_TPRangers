// eslint-disable-next-line import/prefer-default-export
export const dataForRouting = {
  login: {
    name: 'Вход',
    link: 'login',
    classes: ['logRegLink'],
  },
  reg: {
    name: 'Регистрация',
    link: 'registration',
    classes: ['logRegLink'],
  },

  dataLink: [
    {
      name: 'Профиль',
      link: 'profile',
      classes: ['mainLink'],
    },
    {
      name: 'Не мой профиль',
      link: 'user',
      classes: ['mainLink'],
    },
    {
      name: 'Новости',
      link: 'news',
      classes: ['mainLink'],
    },
    {
      name: 'Ошибка',
      link: 'err',
      classes: ['mainLink'],
    },
  ],
};
