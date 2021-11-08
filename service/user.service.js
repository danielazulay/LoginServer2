const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userModel = require("../model/user.model");

class userService {
  constructor(user) {
    this.name = user.name;
    this.id = user.id;
    this.email = user.email;
    this.password = user.password;
  }

  async getUserByEmail(email) {

    const resp = await userModel.findOne({email:email})
    console.log(resp)
    return resp;
  }

  isValid(value, regex) {
    if (!value || value.match(regex)) {
      return true;
    }

    return false;
  }

  async isValidUser(email) {

    const user = await this.getUserByEmail(email)

    if (user) {

      return true;
    }

    return false;
  }

hashPassword(text){

    const saltRounds = 10
    const salt = bcrypt.genSaltSync(saltRounds)
    const passwordHashed = bcrypt.hashSync(text,salt)
    return passwordHashed

}


async createUser(){
    return userModel.create({
        name:this.name,
        id:this.id,
        email:this.email,
        passwordHash:this.hashPassword(this.password)

    }).then((newInsert)=>newInsert)
}


genToken(user){

    const signSecret = process.env.TOKEN_SIGN_SECRET

    delete user.passwordHash

    const token = jwt.sign(user.toJSON(),signSecret,{expiresIn:"6h"})

    return token
}

async login(){

    const user = await this.getUserByEmail(this.email)

    if(!user){

        throw new Error("usuario nao existe")
    }

    if(bcrypt.compareSync(this.password,user.passwordHash)){

        const token = this.genToken(user)

        return {token:token,use:user}
    }


}


}

module.exports = userService
