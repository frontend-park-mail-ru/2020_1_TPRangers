let database = class DataBase{
    _id

    constructor(){
        this.loginId = new Map();
        this.idData = new Map();
        _id = 0;
    }
    add(data){
        this.loginId[data.login] = count;

        this.idData[count] = { 
            login : data.login,
            password : data.password,
            age : data.age,
        }
        _id++;
        }

    getById(id){
        if(idData[id] === undefined){
            return -1;
        }
        return this.idData[id];
    }
    getByLogin(login){
        if(loginId[login] === undefined){
            return -1;
        }
        return idData[loginId[login]];
    }

}


