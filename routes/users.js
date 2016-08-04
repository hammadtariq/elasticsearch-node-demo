'use strict';

var express = require('express');
var router = express.Router();
var elastic = require('./../controllers/elasticsearch.js')
/* GET users listing. */
router.get('/', function(req, res) {

  elastic.indexExists()
  .then(function (exists) {  
      if (exists) { 
        return elastic.deleteIndex(); 
      } 
    })
    .then(elastic.initIndex)
    .then(elastic.initMapping)
    .then((d) => res.json(d))
    .catch((err) => console.trace(err.message));

});

/* GET users listing. */
router.get('/:id', function(req, res) {

  elastic.search(req.params.id)
    .then((d) => res.json(d))
    .catch((err) => console.trace(err.message));

});

router.put('/:id', function(req, res) {

  elastic.update(req.params.id)
    .then((d) => res.json(d))
    .catch((err) => console.trace(err.message));

});

router.post('/', function(req, res) {

  elastic.addDocument(req.body)
  .then((result) => res.json(result))
  .catch((err) => console.trace(err.message));

});

module.exports = router;
