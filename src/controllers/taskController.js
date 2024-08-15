// controllers/taskController.js
const Task = require('../models/Task');
const FollowTask = require('../models/FollowTask');

exports.createTask = async (req, res) => {
    const { title, description, reward, category, platform, accountLink } = req.body;

    try {
        if (category === 'Follow Task') {
            const followTask = new FollowTask({ title, description, reward, platform, accountLink });
            await followTask.save();
            res.status(201).json({ message: 'Follow Task created successfully', task: followTask });
        } else {
            const task = new Task({ title, description, reward, category });
            await task.save();
            res.status(201).json({ message: 'Task created successfully', task });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        const followTasks = await FollowTask.find();
        res.json([...tasks, ...followTasks]);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getTask = async (req, res) => {
    const { id } = req.params;

    try {
        let task = await Task.findById(id);
        if (!task) {
            task = await FollowTask.findById(id);
        }
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateTask = async (req, res) => {
    try {
        let updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTask) {
            updatedTask = await FollowTask.findByIdAndUpdate(req.params.id, req.body, { new: true });
        }
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        let task = await Task.findByIdAndDelete(id);
        if (!task) {
            task = await FollowTask.findByIdAndDelete(id);
        }
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.bulkDeleteTasks = async (req, res) => {
    const { taskIds } = req.body;

    try {
        const deletedTasks = await Task.deleteMany({ _id: { $in: taskIds } });
        const deletedFollowTasks = await FollowTask.deleteMany({ _id: { $in: taskIds } });

        if (deletedTasks.deletedCount === 0 && deletedFollowTasks.deletedCount === 0) {
            return res.status(404).json({ error: 'No tasks found to delete' });
        }

        res.json({ message: 'Tasks deleted successfully', deletedCount: deletedTasks.deletedCount + deletedFollowTasks.deletedCount });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};