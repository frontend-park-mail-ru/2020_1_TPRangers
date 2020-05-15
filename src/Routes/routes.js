
const historyStr = 'history';

export const Router = {
  routes: [],
  mode: null,
  root: '/',

  config(options) {
    // Режим ‘history’ будет включен только если передать необходимый параметр
    // и если браузер поддерживает pushState.

    this.mode = options && options.mode && options.mode == historyStr
                    && !!(history.pushState) ? historyStr : 'hash';
    this.root = options && options.root ? '/' + this.clearSlashes(options.root) + '/' : '/';
    return this;
  },

  getFragment() {
    let fragment = '';
    if (this.mode === historyStr) {
      fragment = this.clearSlashes(
        decodeURI(location.pathname + location.search)
      );
      fragment = fragment.replace(/\?(.*)$/, '');
      fragment = this.root !== '/' ? fragment.replace(this.root, '') : fragment;
    } else {
      const match = window.location.href.match(/#(.*)$/);
      fragment = match ? match[1] : '';
    }
    return this.clearSlashes(fragment);
  },

  clearSlashes(path) {
    return path
      .toString()
      .replace(/\/$/, '')
      .replace(/^\//, '');
  },

  add(re, handler) {
    if (typeof re === 'function') {
      handler = re;
      re = '/';
    }
    this.routes.push({ re, handler });
    return this;
  },

  remove(param) {
    for (let i = 0, r; i < this.routes.length, (r = this.routes[i]); i++) {
      if (r.handler === param || r.re.toString() === param.toString()) {
        this.routes.splice(i, 1);
        return this;
      }
    }
    return this;
  },

  flush() {
    this.routes = [];
    this.mode = null;
    this.root = '/';
    return this;
  },

  goPrev() {
    history.back()
    return this
  },

  check(f) {
    const fragment = f || this.getFragment();
    for (let i = 0; i < this.routes.length; i++) {
      const match = fragment.match(this.routes[i].re);
      if (match) {
        match.shift();
        this.routes[i].handler.apply({}, match);
        return this;
      }
    }
    return this;
  },

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

  navigate(path) {
    const bg = document.getElementById('blur-background-js');
    if (!bg.classList.contains("hidden")) {
      bg.classList.add('hidden');
    }
    path = path || '';
    if (this.mode === historyStr) {
      history.pushState(null, null, this.root + this.clearSlashes(path));
    } else {
      window.location.href = `${window.location.href.replace(
        /#(.*)$/,
        ''
      )}#${path}`;
    }
    return this;
  },

  callCurrent() {
    const fragment = this.getFragment();
    console.log(fragment);
    const result = this.routes.find((item, index) => {
      if (fragment.match(item.re)) {
        console.log(item.re);
        return true;
      }
      return false;
    });
    if (result) {
      result.handler();
      return true;
    }
    return false;
  }
};
