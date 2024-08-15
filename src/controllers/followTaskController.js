// src/controllers/followTaskController.js

const FollowTask = require('../models/FollowTask');

exports.createFollowTask = async (req, res) => {
    const { title, description, reward, platform, accountLink } = req.body;

    try {
        const followTask = new FollowTask({ title, description, reward, platform, accountLink });
        await followTask.save();
        res.status(201).json({ message: 'Follow Task created successfully', task: followTask });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllFollowTasks = async (req, res) => {
    try {
        const followTasks = await FollowTask.find();
        res.json(followTasks);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getFollowTask = async (req, res) => {
    const { id } = req.params;

    try {
        const followTask = await FollowTask.findById(id);
        if (!followTask) {
            return res.status(404).json({ error: 'Follow Task not found' });
        }
        res.json(followTask);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateFollowTask = async (req, res) => {
    try {
        const updatedFollowTask = await FollowTask.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedFollowTask) {
            return res.status(404).json({ message: 'Follow Task not found' });
        }
        res.json(updatedFollowTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteFollowTask = async (req, res) => {
    const { id } = req.params;

    try {
        const followTask = await FollowTask.findByIdAndDelete(id);

        if (!followTask) {
            return res.status(404).json({ error: 'Follow Task not found' });
        }

        res.json({ message: 'Follow Task deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.bulkDeleteFollowTasks = async (req, res) => {
    const { taskIds } = req.body;

    try {
        const deletedFollowTasks = await FollowTask.deleteMany({ _id: { $in: taskIds } });

        if (deletedFollowTasks.deletedCount === 0) {
            return res.status(404).json({ error: 'No Follow Tasks found to delete' });
        }

        res.json({ message: 'Follow Tasks deleted successfully', deletedCount: deletedFollowTasks.deletedCount });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};