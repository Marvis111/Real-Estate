
module.exports = {
    home:(req,res)=>{
        if(req.session.user != undefined || req.session.user != null){
            req.flash('success',
            `Welcome ${req.session.user.fname}, you are ready to make Purchase`);
        }
         res.status(200).render('index');
    },
    categories:(req,res)=>{
        res.render('categories')
    },
    signUp:(req,res) =>{

        res.render('signup');
    },
}