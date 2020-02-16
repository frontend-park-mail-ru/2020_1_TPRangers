class DataBase {

    constructor() {
        this.loginId = new Map();
        this.idData = new Map();
        this._id = 0;
    }
    add(data){
        this.loginId[data.email] = this._id;

        this.idData[this._id] = { 
            login : data.email,
            password : data.password,
            age : data.age,


        }
        this._id++;


    }

    getById(id) {
        if (typeof this.idData[id] === undefined) {
            return -1;
        }
        return this.idData[id];
    }
    getByLogin(login) {
        if (typeof this.loginId[login] === undefined) {
            return -1;
        }

        return this.idData[this.loginId[login]];
    }

}





module.exports = DataBase