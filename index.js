const cookieParser = require('cookie-parser');
const express =  require('express'),
ejs = require('ejs'),
connectFlash = require('connect-flash'),
expressSession = require('express-session'),
//layouts = require('express-ejs-layouts'),
app = express();
//set 
app.set('views','views');
app.set('view engine','ejs')
app.set('port',process.env.PORT || 9000);

//use middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'));
app.use(cookieParser('my-secret-here'));
app.use(expressSession({
        secret:"my-secret-here",
        cookie:{
                maxAge: 1000 * 60 * 2,
        },
        resave:false,saveUninitialized:false
}) )
// connect
app.use(connectFlash());
app.use((req,res,next)=>{
        if(req.session){

        }
})
app.use((req,res,next)=>{
        res.locals.flashMessages = req.flash();
        if (req.session.user != undefined) {
                res.locals.user = req.session.user
        }else{
                res.locals.user = null;
        }
        next();
});
//2022-01-17T11:05:56.518Z
//ROUTES....

require('./Routers/index')(app);


app.listen(app.get('port'),()=>{
        console.log('server running on port '+ app.get('port'));
})