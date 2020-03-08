/**
 * модуль хранящий в себе роутинг проекта
 * @module routes
 */

/**
 * @description Настройка роутов для проекта, вызов различных функций для разных рутов
 * @const {
 *   routes — хранит список зарегистрированных точек
 *   mode — может принимать значение hash или history в зависимости от поддержки History API
 *   root — корневая точка приложения, необходима только при использовании pushState
 * }
 */
// eslint-disable-next-line import/prefer-default-export
export const Router = {
  routes: [],
  mode: null,
  root: '/',

  /**
   * @description Метод для первичной настройки принимает
   * два параметра, можно передать их в одном объекте.
   * @param options  Режим ‘history’ будет включен только в том случае если передать
   * необходимый параметр и при условии что браузер поддерживает pushState.
   */
  config(options) {
    this.mode =
      options && options.mode && options.mode == 'history' && !!history.pushState
        ? 'history'
        : 'hash';
    this.root = options && options.root ? `/${this.clearSlashes(options.root)}/` : '/';
    return this;
  },

  /**
   * @description Метод отвечает за определение текущего адреса.
   * Так как роутер работает в одном из двух режимов, то и обрабатывать url будем по разному.
   */
  getFragment() {
    let fragment = '';
    if (this.mode === 'history') {
      fragment = this.clearSlashes(decodeURI(location.pathname + location.search));
      fragment = fragment.replace(/\?(.*)$/, '');
      fragment = this.root !== '/' ? fragment.replace(this.root, '') : fragment;
    } else {
      const match = window.location.href.match(/#(.*)$/);
      fragment = match ? match[1] : '';
    }
    return this.clearSlashes(fragment);
  },

  /**
   * @description удаляет слэши в начале и конце, для того чтобы унифицировать адрес
   */
  clearSlashes(path) {
    return path
      .toString()
      .replace(/\/$/, '')
      .replace(/^\//, '');
  },

  /**
   * @description Метод add наполняет массив маршрутов, путём передачи параметров: путь, обработчик
   *  то считать эту функцию (колбэк) обработчиком корневого маршрута.
   * @param re - путь
   * @param handler - обработчик
   *  В случае если на вход add дан только один параметр и этот параметр функция,
   *  то считать эту функцию (колбэк) обработчиком корневого маршрута.
   */
  add(re, handler) {
    if (typeof re === 'function') {
      handler = re;
      re = '';
    }
    this.routes.push({ re, handler });
    console.log(this.routes);
    return this;
  },

  /**
   * @description Удаление маршрута произойдёт только в том случае, если передать
   * точно такое же регулярное выражение или функцию обрабочик.
   */
  remove(param) {
    for (let i = 0, r; i < this.routes.length, (r = this.routes[i]); i++) {
      if (r.handler === param || r.re.toString() === param.toString()) {
        this.routes.splice(i, 1);
        return this;
      }
    }
    return this;
  },

  /**
   * @description сбрасывает список маршрутов и режим работы.
   */
  flush() {
    this.routes = [];
    this.mode = null;
    this.root = '/';
    return this;
  },

  /**
   * @description  метод для сравнения текущего адреса и зарегистрированных маршрутов.
   * @param f - в качестве параметра получает url, если параметр пуст, то при помощи getFragment
   */
  check(f) {
    const fragment = f || this.getFragment();
    for (let i = 0; i < this.routes.length; i++) {
      const match = fragment.match(this.routes[i].re) || [];
      if (match.length !== 0 && match[0].startsWith(fragment[0])) {
        match.shift();
        this.routes[i].handler.apply({}, match);
        return this;
      }
    }
    return this;
  },

  /**
   * @description триггер изменений в адресной строке.
   * Храним последний активный url, чтобы сравнить с новым.
   */
  listen() {
    const self = this;
    let current = self.getFragment();
    const fn = function() {
      if (current !== self.getFragment()) {
        current = self.getFragment();
        self.check(current);
      }
    };
    clearInterval(this.interval);
    this.interval = setInterval(fn, 50);
    return this;
  },

  /**
   * @description возможности самостоятельно менять адрес
   */
  navigate(path) {
    path = path || '';
    if (this.mode == 'history') {
      history.pushState(null, null, this.root + this.clearSlashes(path));
    } else {
      window.location.href = `${window.location.href.replace(/#(.*)$/, '')}#${path}`;
    }
    return this;
  },
};
