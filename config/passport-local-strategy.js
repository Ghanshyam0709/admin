// const passport = require('passport');
// const Admin = require('../model/model');
// const bcrypt = require('bcrypt');

// const passportLocal = require('passport-local').Strategy;

// passport.use(new passportLocal({
//     usernameField : 'email'
// }, async function(email,password,done){
//     let adminData = await Admin.findOne({email : email});
//     if(adminData){
//         let passchek = await bcrypt.compare(password,adminData.password);
//         if(passchek){
//             return done(null,adminData);
//         }
//         else{
//             return done(null,false);
//         }
//     }
//     else{
//         return done(null,false)
//     }
// }))

// passport.serializeUser( async function(user,done){
//     return done(null,user.id);
// })
// passport.deserializeUser( async function(id,done){
//     let data = await Admin.findById(id);
//     if(data){
//         return done(null,data);
//     }
//     else{
//         return done(null,false);
//     }
// })

// // passport.checkAuthenticateduser = (req,res,next)=>{
// //     if(req.isAuthenticated()){
// //         next();
// //     }
// //     else{
// //         return res.redirect('/');
// //     }
// // }

// // passport.setAuthenticteduser = (req,res,next)=>{
// //     if(req.isAuthenticated()){
// //         res.locals.admins = req.user;
// //     }
// //     next();
// // }

// module.exports = passport;

const passport = require('passport');
const passportLocal = require('passport-local').Strategy
const admin = require('../model/model')

passport.use(new passportLocal({
    usernameField: "email"
}, async function(email, password, done) {
    let admindata = await admin.findOne({ email: email });
    if (admindata) {
        console.log(admindata);
        if (admindata.password === password) {
            return done(null, admindata)
        } else {
            return done(null, false)
        }
    } else {
        return done(null, false)
    }
}));

passport.serializeUser(async function(user, done) {
    console.log("ser");
    return done(null, user.id);
})

passport.deserializeUser(async function(id, done) {
    let AD = await admin.findById(id);
    console.log(AD);
    if (AD) {
        return done(null, AD)
    } else {
        return done(null, false)
    }
})

passport.chaeckAuthenticatedUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        return res.redirect('/')
    }
}

passport.setAuthenticatedUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        console.log(req.user);
        res.locals.admins = req.user;
    }
    next();
}

module.exports = passport;                              