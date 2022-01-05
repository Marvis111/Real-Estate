const mongoose = require('mongoose');

mongoose.connect(process.env.dbURL ||'mongodb://localhost:27017/realestate' ,{
    useUnifiedTopology:true,
    useNewUrlParser:true,

});
const db = mongoose.connection;
db.once('open',()=>{
    console.log('successfully conneted to MongoDB');
})

//new user
const userSchema = mongoose.Schema({
    fname:{required:true,type:String},
    lname:{required:true,type:String},
    email:{required:true,type:String,unique:true},
    password:{required:true,type:String},
})

const User = mongoose.model('user',userSchema);

module.exports = {
    User
}