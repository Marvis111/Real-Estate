const express =  require('express'),
ejs = require('ejs'),
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
//app.use(layouts)
//ROUTES....
require('./Routers/index')(app);

app.listen(app.get('port'),()=>{
        console.log('server running on port '+app.get('port'));
})