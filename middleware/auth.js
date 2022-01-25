// let passport = require('passport');
// let BasicStrategy = require('passport-http').BasicStrategy;

let check = require(__dirname + "/../controllers/checkCredential");

// passport.use(new BasicStrategy(function(email, password, done){
//     let validated = check.checkCredentials(email, password);

//     if(validated){
//         return done(null, true);
//     }
//     else{
//         return done(null, false)
//     }
// })); 

// let auth = passport.authenticate('basic', {session:false});

exports.auth = async function (req, res, next){
    // console.log(req.headers.email, req.headers.password)
    try{
        let validated = await check.checkCredentials(req.headers.email, req.headers.password);
        if(validated){
            console.log("validated")
            next();
        }
        else{
            console.log("not validated")
            res.status(401).json({message: "Not Authenticated"});
        }
    }   
    catch(err){
        res.status(401).json({message: "Fail to authenticate"});

    }

}