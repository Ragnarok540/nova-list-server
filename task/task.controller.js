const express = require('express');

const taskService = require('./task.service');

const router = express.Router();

router.post('/create', create);
router.get('/read/:code', read);
router.get('/read-state/:state', readState);
router.put('/update', update);
router.patch('/update-state', updateState);
router.delete('/delete/:code', deleteTask);

module.exports = router;

function create(req, res, next) {
  taskService.create(req, res);
}

function read(req, res, next) {
  taskService.read(req, res);
}

function readState(req, res, next) {
  taskService.readState(req, res);
}

function update(req, res, next) {
  taskService.update(req, res);
}

function updateState(req, res, next) {
  taskService.updateState(req, res);
}

function deleteTask(req, res, next) {
  taskService.deleteTask(req, res);
}
