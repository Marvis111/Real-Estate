const cookieParser = require('cookie-parser');

const express =  require('express'),
ejs = require('ejs'),
connectFlash = require('connect-flash'),
expressSession = require('express-session'),
//layouts = require('express-ejs-layouts'),
app = express();

//set 
app.set('view engine','ejs')
app.set('port',process.env.PORT || 9000);
app.set('views','views');
//use middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'));
app.use(cookieParser('my-secret-here'));
app.use(expressSession({
        secret:"my-secret-here",
        cookie:{
                maxAge:new Date(Date.now() + 1000 * 60 * 60) ,
        },
        resave:false,saveUninitialized:false
}))
//mongodb
//use flash messages..
app.use(connectFlash());

app.use((req,res,next)=>{
        res.locals.flashMessages = req.flash();
        if (req.session.cookie.maxAge > Date.now() ) {
                req.session.userId = req.cookies.userId;
                req.session.fname = req.cookies.fname;
                req.session.lname = req.cookies.lname;
                req.session.email = req.cookies.email;
                next();
        }
        next();
        
})

app.use((req,res,next)=>{
        if (req.session !== null) {
                const {lname,fname,userId,email} = req.session
                res.locals.user = {lname,fname,userId,email}
                 next()
        }else{
                res.locals.user = null
                next()
        }
});
//

//app.use(layouts)
//ROUTES....
require('./Routers/index')(app);

app.listen(app.get('port'),()=>{
        console.log('server running on port '+app.get('port'));
})