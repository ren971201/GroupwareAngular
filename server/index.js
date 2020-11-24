const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/dev');
const SampleDb = require('./sample-db');

const productRoutes = require('./routes/events')

mongoose.connect(config.DB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    () => {
        const fakeDb = new SampleDb();
        fakeDb.initDb();
    }
)

const app = express();
const bodyParser = require('body-parser');
// urlencodedとjsonは別々に初期化する
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use('/api/v1/events', productRoutes);

const PORT = process.env.PORT || '3001';

app.listen(PORT, function() {
    console.log('I am running!');
});
