class CookieDataBase {
    constructor() {
        this.cookieSaver = new Map();
    }

    addCookie(id, login) {
        this.cookieSaver.set(id, login)
    }

    checkCookie(id) {
        return this.cookieSaver.has(id);
    }

    dataByCookie(id) {
        return this.cookieSaver.get(id);
    }

}


module.exports = CookieDataBase