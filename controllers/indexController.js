
module.exports = {
    home:(req,res)=>{
        if(req.session.user){
            req.flash('success',
            {message:`Welcome ${req.session.user.fname}, you are ready to make Purchase`});
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