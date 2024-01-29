const authen = require('./authen.controller')
const product = require('./product.controller')
const category = require('./category.controller')
const upload = require('./upload.controller');
const store = require('./store.controller')
const order = require('./order.controller');

module.exports = [
    authen,
    product,
    category,
    upload,
    store,
    order
]