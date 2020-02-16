class DataBase{

    constructor(){
        this.loginId = new Map();
        this.idData = new Map();
        this._id = 0;
    }
    add(data){
        this.loginId[data.login] = this._id;

        this.idData[this._id] = { 
            login : data.login,
            password : data.password,
            age : data.age,
        }
        this._id++;
        }

    getById(id){
        if(typeof this.idData[id] === undefined){
            return -1;
        }
        return this.idData[id];
    }
    getByLogin(login){
        if(typeof this.loginId[login] === undefined){
            return -1;
        }
        return this.idData[this.loginId[login]];
    }

}


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


module.exports = DataBase , CookieDataBase