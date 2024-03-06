const createError = require('http-errors');
let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
let dbConfig = require('./database/db');


//Express Route
const studentRoute = require('../backend/routes/student.route');

//Connecting MongoDB Database
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
    useNewUrlParser : true,
}).then(() => {
    console.log('Database successfully connected');
},
    error => {
        console.log('Could not connect to database: ' + error);
    }
);


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

app.use(cors());
app.use('/students', studentRoute);


//PORT
const port = 4000;
const server = app.listen(port, () => {
    console.log('Connected to port: ' + port);
});

app.use((req, res, next) => {
    next(createError(404));
});

// app.listen(port, () => {
//     console.log('Connected to port: ' + port);
// });

// Error handlers
app.use(function(err, req, res, next) {
    // console.log(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
})
