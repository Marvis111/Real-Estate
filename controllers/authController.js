module.exports = {
    isAuthUserPermitted:(req,res,next) =>{
        if(req.session.user == null){
            res.status(401).redirect('/signup')
        }else{
            next();
        }
    },
    isAuthUserNotPermitted:(req,res,next)=>{
        console.log(req.headers.referer)
        if (req.session.user != null) {
            res.status(401).redirect('..');
        }else{
            next();
        }
    }
}