const express = require('express');

const optionService = require('./option.service');

const router = express.Router();


router.get('/read/:name', read);
router.patch('/update-value', updateValue);


module.exports = router;


function read(req, res, next) {
  optionService.read(req, res);
}

function updateValue(req, res, next) {
  optionService.updateValue(req, res);
}
