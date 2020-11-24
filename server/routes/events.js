const express = require('express');
const router = express.Router();
const Product = require('../model/events');

router.get('/', function(req, res){
    Product.find({})
    .sort({"schedule":1, "start":1, "end":1 })
    .limit(parseInt(req.query.limit))
    .skip(parseInt(req.query.offset))
    .exec(function(err, foundProduct){
        if(err) {
            return res.status(422).send({errors: [{title: 'Product error', detail:'Product not found!'}]})
        }
        return res.json(foundProduct);
    })
})

router.post('/',function(req, res){
    res.send('perfect');

    const newProduct = new Product(req.body);

    newProduct.save();
})

module.exports = router;
