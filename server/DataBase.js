'use strict'

class CookieDataBase{
    constructor(){
        this.cookieSaver = new Map();
    }  

    addCookie(id){
        this.cookieSaver.set(id,1)
    }

    checkCookie(id){
        return this.cookieSaver.has(id);
    }
}


