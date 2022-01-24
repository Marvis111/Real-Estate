const {check,validationResult,sanitizeBody, body} = require("express-validator"),
{User} = require('../model/database'),
bcrypt = require('bcrypt')
//jwt = require('jsonwebtoken')
module.exports = {
    checkInputs:[
        sanitizeBody('email').normalizeEmail({all_lowercase:true,}),
        check('fname','First name is required').notEmpty(),
        check('lname','Last name is required').notEmpty(),
        check('email','Email Address is required').isEmail(),
        check('password','Password is required').notEmpty(),
    ],
    validateInputs:async(req,res,next)=>{
        //dont skip the next middle war
        req.skip = false
        res.data = null
        const {errors} = validationResult(req);
        if(errors.length > 0){
            req.skip = true
            res.data = errors
            res.statusCode = 401
            next();
        }else{
            if (req.body.password == req.body.comf_password ) {
                try {
                    req.skip = false
                 const hashedPasword = await bcrypt.hash(req.body.password,10);
                 const newUser = await User.create({...req.body,password:hashedPasword});
                 //session
                    const user = {}
                 user.userId = newUser._id;
                 user.fname = newUser.fname;
                 user.lname = newUser.lname;
                 user.email = newUser.email;
                 //
                 req.session.user = user;
                 req.statusCode = 200;
                 next();
                } catch (error) {
                    req.skip = true;
                    if (error.code === 11000) {
                    res.statusCode = 400
                   res.data = [{msg:"Email Address Already Exist.",param:"email"}];
                    }else{
                     res.data = [{msg:error.message,param:"password"}];
                    }
                    next();
                }
             } else {
                  //skip the next middle ware..
                  req.skip = true;
                  res.statusCode= 400;
                  res.data = [{msg:"Password mismatched",param:'password'}];
                  next();
             }
        }
    },
    ValidatedUser:async (req,res,next) =>{
       if (req.skip) {
           next();
       } else {
           try {
            const {lname,fname,email,userId} = req.session.user
            let user;
               user = {lname,fname,email,userId}
               res.cookie('user',user,{maxAge:1000 * 60 * 20,signed:true})
               //userdetails
               res.locals.user = req.session.user
               res.data = {success:true};
              next();
           } catch (error) {
            res.data = [{msg:"Error in creating Cookies",param:'password'}];
                 next(error)
           }
       }
    },
    redirectView: (req,res)=>{
        if(res.data){
            res.json(res.data);
        }

    }
    
}


