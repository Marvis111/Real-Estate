const {check,validationResult,sanitizeBody, body} = require("express-validator"),
{User} = require('../model/database'),
bcrypt = require('bcrypt')
//jwt = require('jsonwebtoken')

module.exports = {
    checkInput:[
        sanitizeBody('email').normalizeEmail({all_lowercase:true,}),
        check('fname','First name is required').notEmpty(),
        check('lname','Last name is required').notEmpty(),
        check('email','Email Address is required').isEmail(),
        check('password','Password is required').notEmpty(),
    ],
    validateInputs:async(req,res,next)=>{
        //dont skip the next middle ware
        req.skip = false
        const {errors} = validationResult(req);
        console.log(errors)
        if (errors.length > 0) {
            req.skip = true;
            req.statusCode = 400;
             req.flash('errors',errors);
             res.locals.redirect = '/signup';
             next();
        } else {
            if (req.body.password === req.body.comf_password ) {
               try {
                const hashedPasword = await bcrypt.hash(req.body.password,10);
                const newUser = await User.create({...req.body,password:hashedPasword});
                //set up cookie...
                res.cookie('userId',newUser._id,{
                    //expire.. in one hour
                    expires:new Date(Date.now() + 1000 * 60 * 60 )
                });
                res.cookie('fname',newUser.fname,{
                    //expire.. in one hour
                    expires:new Date(Date.now() + 1000 * 60 * 60 ),
                    signed:true
                });
                res.cookie('lname',newUser.lname,{
                    //expire.. in one hour
                    expires:new Date(Date.now() + 1000 * 60 * 60 )
                });
                res.cookie('email',newUser.email,{
                    //expire.. in one hour
                    expires:new Date(Date.now() + 1000 * 60 * 60 )
                });
                //session
                req.session.userId = newUser._id;
                req.session.fname = newUser.fname;
                req.session.lname = newUser.lname;
                req.session.email = newUser.email;
                //
                const {lname,_id , email,fname} = newUser
                req.flash('success',{message:`Welcome ${fname}, you are ready to make Purchase`});
                req.statusCode = 200;
                res.locals.user = {lname,userId:_id,fname,email}
                res.locals.redirect = '/';
                next();
               } catch (error) {
                   console.log(error)
                   req.skip = true;
                   if (error.code === 11000) {
                    req.flash('errors',[{msg:"Email Address Already Exist."}]);
                   }else{
                    req.flash('errors',[{msg:error.message}]);
                   }
                   res.locals.redirect = '/signup';
                   next();
               }
            } else {
                 //skip the next middle ware..
                 req.skip = true;
                 req.flash('errors',[{msg:"Password mismatched"}]);
                 res.locals.redirect = '/signup';
                 next();
            }
        }

    },
    saveValidUser:async (req,res,next) =>{
       if(req.skip){
            next();
       }else{
//
       }
    },
    redirectView: (req,res,next)=>{
        let redirectView = res.locals.redirect;
        if(redirectView){
            res.redirect(redirectView);
        }
        next();
    }
    
}