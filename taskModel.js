
const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        require: true,
        trim: true
    },
    status: {
        type: String,
        require: true
    }
})


const Tasks = mongoose.model('Tasks', taskSchema);

module.exports = Tasks;