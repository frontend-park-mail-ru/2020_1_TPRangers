/**
 * модуль для хранения статических ссылок и данных для их отрисовки
 * @module dataForRouting
 */
/**
 * @description Содержит в себе объекты для отрисовки ссылок бокового меню и шапки
 * @const {
 *   linkName: {
 *     name: Текст ссылки
 *     link: Значение которое принимает href и section у ссылки
 *     classes: Классы, которое будут у ссылки
 *   }
 * }
 */
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
