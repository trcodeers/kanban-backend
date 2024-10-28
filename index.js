
const express = require('express')
require('dotenv').config();

const mongoose = require('mongoose')
const cors = require('cors')

const taskRoute = require('./taskRoute')

const app = express()

app.use(cors({
    origin: '*'
}));

app.use(express.json());
app.use('/task', taskRoute);
mongoose.connect(
    process.env.mongoURL
    )
    .then(() => {
        console.log('Connected to MongoDB');
});

app.listen(5000, () => {
    console.log('Server is running on the port 5000')
})

