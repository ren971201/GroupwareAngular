const express = require('express');
const router = express.Router();
const Product = require('../model/product');
const NUMBER = 5;

router.get('', function(req, res){
    Product.find({})
    .sort({"schedule":1})
    .exec(function(err, foundProducts){
        return res.json(foundProducts);
    })
})

router.get('/:page', function(req, res){
    const index = (parseInt(req.params.page)-1);
    const skip = index * NUMBER;
    Product.find({})
    .sort({"schedule":1})
    .limit(NUMBER)
    .skip(skip)
    .exec(function(err, foundProduct){
        if(err) {
            return res.status(422).send({errors: [{title: 'Product error', detail:'Product not found!'}]})
        }
        return res.json(foundProduct);
    })
});

router.post('/comit',function(req, res){
    res.send('perfect');

    const newProduct = new Product(req.body);

    newProduct.save();
})

module.exports = router;
