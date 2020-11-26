const express = require('express');
const router = express.Router();
const Event = require('../model/events');

router.get('/', function(req, res){
    Event.find({})
    .sort({"schedule":1, "start":1, "end":1 })
    .limit(parseInt(req.query.limit))
    .skip(parseInt(req.query.offset))
    .exec(function(err, foundEvent){
        if(err) {
            return res.status(422).send({errors: [{title: 'Event error', detail:'Event not found!'}]})
        }
        return res.json(foundEvent);
    })
})

router.post('/',function(req, res){
    res.send('perfect');

    const newEvent = new Event(req.body);

    newEvent.save();
})

router.get('/size', function(req, res){
    Event.countDocuments({})
    .exec(function(err, size){
        if(err) {
            return res.status(422).send({errors: [{title: 'Event error', detail:'Event not found!'}]})
        }
        return res.json(size);
    })
})

module.exports = router;
