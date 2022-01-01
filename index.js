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
                maxAge:3600,
        },
        resave:false,saveUninitialized:false
}))
//use flash messages..
app.use(connectFlash());
app.use((req,res,next)=>{
        res.locals.flashMessages = req.flash();
        next();
})
//app.use(layouts)
//ROUTES....
require('./Routers/index')(app);

app.listen(app.get('port'),()=>{
        console.log('server running on port '+app.get('port'));
})