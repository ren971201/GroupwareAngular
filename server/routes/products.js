const express = require('express');
const router = express.Router();
const Product = require('../model/product');
const NUMBER = 5;

router.get('', function(req, res){
    Product.find({}, function(err, foundProducts){
        return res.json(foundProducts);
    })
})

// router.get('/:productId', function(req, res){
//     const productId = req.params.productId;
//     Product.findById(productId, function(err, foundProduct){
//         if(err) {
//             return res.status(422).send({errors: [{title: 'Product error', detail:'Product not found!'}]})
//         }
//         return res.json(foundProduct);
//     })
// });

router.get('/:page', function(req, res){
    const index = (parseInt(req.params.page)-1);
    const skip = index * NUMBER;
    Product.find({})
    .limit(NUMBER)
    .skip(skip)
    .exec(function(err, foundProduct){
        if(err) {
            return res.status(422).send({errors: [{title: 'Product error', detail:'Product not found!'}]})
        }
        return res.json(foundProduct);
    })
});

module.exports = router;
