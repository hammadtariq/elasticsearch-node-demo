var express = require('express');
var router = express.Router();
var carController = require('../controllers/carController.js');

/*
 * GET
 */
router.get('/', function (req, res) {
    carController.list(req, res);
});

/*
 * GET
 */
router.get('/:id', function (req, res) {
    carController.show(req, res);
});

/*
 * POST
 */
router.post('/', function (req, res) {
    carController.create(req, res);
});

/*
 * PUT
 */
router.put('/:id', function (req, res) {
    carController.update(req, res);
});

/*
 * DELETE
 */
router.delete('/:id', function (req, res) {
    carController.remove(req, res);
});

module.exports = router;
