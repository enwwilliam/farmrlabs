let md5 = require("md5");
let mongoose = require("mongoose");
let User = mongoose.model("User");

let checkCredentials = async function(email, password){
    try{
        let user = await User.findOne({
            email: email
        });
        let inputPassword = md5(password);
        console.log(inputPassword === user.password);
        return inputPassword === user.password
    }
    catch(err){
        return false;
    }

}

exports.checkCredentials = checkCredentials;