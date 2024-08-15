// src/routes/followTaskRoutes.js

const express = require('express');
const router = express.Router();
const followTaskController = require('../controllers/followTaskController');

router.post('/', followTaskController.createFollowTask);
router.get('/', followTaskController.getAllFollowTasks);
router.get('/:id', followTaskController.getFollowTask);
router.patch('/:id', followTaskController.updateFollowTask);
router.delete('/:id', followTaskController.deleteFollowTask);
router.post('/bulk-delete', followTaskController.bulkDeleteFollowTasks);

module.exports = router;