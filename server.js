const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const usersRouter = require('./router');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const uri = process.env.ATLAS_URI;
const connection = mongoose.connection;


mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

connection.once('open', (err) => {
    if (err) {
        console.log(err + 'err')
    } else {
        console.log("MongoDB database connection established successfully");
    }
})


app.use(cors());
app.use(express.json());
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});