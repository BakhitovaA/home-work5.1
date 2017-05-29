const fs = require('fs');
const User = require('./model');
class userProcessing {

    constructor() {
        this.array = this._initArray();
    }

    userCreate(data) {
        let newId = 0;
        if (this.array[0] !== undefined){
            newId = this.array[this.array.length - 1].id + 1;} else {
        }
        let user = new User(newId, data.name, data.score);
        this.array.push(user);
        this._save();
        return user;
    }

    userUpdate(data) {
        this.array[index].name = data.name;
        this.array[index].score = data.score;
        this._save();
        return this.array[realIndex+1];
    }

    userDelete(data) {
        let check = 0;
        this.array.find((elem, index)=>{
            if (elem.id == data.id) {
                return true;
            } else {
                check++;
            }
        });
        if (check == 0 || check == this.array.length) {
            return 0;
        }
        let tmp = this.array[check];
        this.array.splice(check, 1);
        this._save();
        return (check);
    }

    userList() {
        return this.array;
    }

    userID(data) {
        let realIndex = -1;
        this.array.find((elem, index)=>{if(elem.id == data.id) {return true;} else {realIndex++;}});
        if (realIndex === -1) {return new User();}
        return this.array[realIndex+1];
    }

    _initArray() {
        try{
            return JSON.parse(fs.readFileSync('users.json'));
        } catch (err) {
            return new Array();
        }
    }

    _save() {
        fs.writeFile('users.json', JSON.stringify(this.array));
    }

}

module.exports = userProcessing;