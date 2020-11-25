const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const SampleDb = require('./sample-db');

const eventRoutes = require('./routes/events');
const path = require('path');

mongoose.connect(config.DB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    () => {
        if(process.env.NODE_ENV !== 'production') {
            const sampleDb = new SampleDb();
            // sampleDb.initDb();
        }
    }
)

const app = express();
const bodyParser = require('body-parser');
// urlencodedとjsonは別々に初期化する
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use('/api/v1/events', eventRoutes);

if(process.env.NODE_ENV === 'production') {
    const appPath = path.join( __dirname, '..', 'dist', 'groupware');
    app.use(express.static(appPath));
    app.get("*", function(req, res) {
        res.sendFile(path.resolve(appPath, 'index.html'));
    });
}

const PORT = process.env.PORT || '3001';

app.listen(PORT, function() {
    console.log('I am running!');
});
