const {check,validationResult,sanitizeBody, body} = require("express-validator");
module.exports = {
    checkInput:[
        sanitizeBody('email').normalizeEmail({all_lowercase:true,}),
        check('fname','First name is required').notEmpty(),
        check('lname','Last name is required').notEmpty(),
        check('email','Email Address is required').notEmpty(),
        check('email','Invalid Email Address').isEmail(),
    ],
    validateInputs:(req,res,next)=>{
        //dont skip the next middle ware
        req.skip = false
        const {errors} = validationResult(req);
        if (errors.length > 0) {
            //skip the next middle ware..
            req.skip = true;
            req.flash('errors',errors);
            res.locals.redirect = '/signup';
            next();
        } else {
            req.skip = false
            next();
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