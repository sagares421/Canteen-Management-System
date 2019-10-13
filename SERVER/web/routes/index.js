module.exports = (app) => {

    app.use('/api/employee', require('./employee.route'));

    app.use('/api/order', require('./order.route'));
    
    app.use('/api/item', require('./item.route'));
}