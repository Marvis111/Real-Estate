const indexRoutes = require('./indexRoutes'),
catRoutes = require('./catRoutes');

const Routers = app =>{
    app.use('/',indexRoutes);
    app.use('/categories',catRoutes);
}
module.exports = Routers