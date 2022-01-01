
module.exports = {
    home:(req,res)=>{
        res.render('index');
    },
    categories:(req,res)=>{
        res.render('categories')
    },
    signUp:(req,res) =>{
        res.render('signup');
    },
}