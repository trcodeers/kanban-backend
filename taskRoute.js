
const express = require("express");
const Tasks = require("./taskModel.js");

const router = express.Router();

// Get all tasks
router.get('/', async (req, res) => {
    console.log('From task router...');

    try {
        const result = await Tasks.find(); // Retrieve all tasks from the database
        return res.status(200).send({ status: 'Success', result }); // Send a success response with the tasks
    } catch (error) {
        console.error('Error retrieving tasks:', error);
        return res.status(500).json({ status: 'Error', message: 'Internal server error.' }); // Handle errors
    }
});


// Create a new task
router.post('/', async (req, res) => {
    console.log('From task router...');

    const { title, description, status } = req.body; // Extract title and description from request body

    // Validate the input
    if (!title || !description && !status) {
        return res.status(400).json({ message: 'Title and description are required.' });
    }

    try {
        const newTask = new Tasks({ title, description, status }); // Create a new task instance
        await newTask.save(); // Save the task to the database
        return res.status(201).json({ message: 'Task created successfully.', task: newTask });
    } catch (error) {
        console.error('Error creating task:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});

// Delete a task by ID
router.delete('/:id', async (req, res) => {
    console.log('From task router...');

    const taskId = req.params.id; // Get the task ID from the URL parameters

    try {
        const deletedTask = await Tasks.findByIdAndDelete(taskId); // Delete the task from the database

        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found.' }); // Handle case where task is not found
        }

        return res.status(200).json({ message: 'Task deleted successfully.', task: deletedTask });
    } catch (error) {
        console.error('Error deleting task:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});

// Update a task by ID
router.put('/:id', async (req, res) => {
    console.log('From task router...');

    const taskId = req.params.id; // Get the task ID from the URL parameters
    const { title, description, status } = req.body; // Extract title and description from request body

    // Validate the input
    if (!title && !description && !status) {
        return res.status(400).json({ message: 'At least one field (title or description) is required for update.' });
    }

    try {
        const updatedTask = await Tasks.findByIdAndUpdate(taskId, { title, description, status }, { new: true, runValidators: true });

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found.' }); // Handle case where task is not found
        }

        return res.status(200).json({ message: 'Task updated successfully.', task: updatedTask });
    } catch (error) {
        console.error('Error updating task:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});





module.exports = router;