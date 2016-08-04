'use strict';

var elasticsearch = require('elasticsearch');

var elasticClient = new elasticsearch.Client({  
    host: 'localhost:9200',
    log: 'trace'
});

elasticClient.ping({
  // ping usually has a 3000ms timeout
  requestTimeout: Infinity, //30000

  // undocumented params are appended to the query string
  hello: "elasticsearch!"
}, function (error) {
  if (error) {
    console.trace('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});

let indexName = "workindex";
let indexType = "list";

/**
* Delete an existing index
*/
function deleteIndex() {  
    return elasticClient.indices.delete({
        index: indexName
    });
}
exports.deleteIndex = deleteIndex;

/**
* create the index
*/
function initIndex() {  
    return elasticClient.indices.create({
        index: indexName
    });
}
exports.initIndex = initIndex;

/**
* check if the index exists
*/
function indexExists() {  
    return elasticClient.indices.exists({
        index: indexName
    });
}
exports.indexExists = indexExists;  


function initMapping() {  
    return elasticClient.indices.putMapping({
        index: indexName,
        type: indexType,
        body: {
            properties: {
                age: { type: "integer" },
                name: { type: "string" },
                id: { type: "string", index : "not_analyzed" } //match with exact value
            }
        }
    });
}
exports.initMapping = initMapping;


function addDocument(document) {  
    return elasticClient.index({
        index: indexName,
        type: indexType,
        body: {
            name: document.name,
            age: document.age,
            suggest: {
                input: document.name.split(" "),
                output: document.name,
                payload: document.metadata || {}
            }
        }
    });
}
exports.addDocument = addDocument;


function search(input) {  
    return elasticClient.search({
        index: indexName,
        type: indexType,
        body: {
            query: {
                match: {
                    _id: 'AVZUXhrxpjWSKb_qiSiJ'
                }
            }
        }
    });
}

exports.search = search;


function update(id) {  
    return elasticClient.update({
        index: indexName,
        type: indexType,
        id: id,
        body: {
            "script" : "ctx._source.subject=new_tag",
            "params" : {
                "new_tag" : "Electronics"
            }
            // put the partial document under the `doc` key
            // doc : {
            //     "education" : [ "BS" ],
            //     "subject": "CS"
            // }
        }
    });
}
exports.update = update;
