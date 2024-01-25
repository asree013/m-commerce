const authen = require('./authen.controller')
const product = require('./product.controller')
const category = require('./category.controller')
const upload = require('./upload.controller');

module.exports = [
    authen,
    product,
    category,
    upload
]