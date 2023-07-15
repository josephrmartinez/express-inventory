const express = require("express");
const router = express.Router();

// Require controller modules.
const item_controller = require("../controllers/itemController");
const iteminstance_controller = require("../controllers/itemInstanceController")
const category_controller = require("../controllers/categoryController")

router.get('/', (req, res) => {
    res.send('catalogue')
})
/// ROUTES ///
const entities = [
    { name: 'item', controller: item_controller },
    { name: 'category', controller: category_controller },
    { name: 'iteminstance', controller: iteminstance_controller }
  ];
  
  entities.forEach(entity => {
    const entityName = entity.name;
    const entityController = entity.controller;
  
    // GET request for creating an entity.
    router.get(`/${entityName}/create`, entityController[`${entityName}_create_get`]);
  
    // POST request for creating an entity.
    router.post(`/${entityName}/create`, entityController[`${entityName}_create_post`]);
  
    // GET request to delete an entity.
    router.get(`/${entityName}/:id/delete`, entityController[`${entityName}_delete_get`]);
  
    // POST request to delete an entity.
    router.post(`/${entityName}/:id/delete`, entityController[`${entityName}_delete_post`]);
  
    // GET request to update an entity.
    router.get(`/${entityName}/:id/update`, entityController[`${entityName}_update_get`]);
  
    // POST request to update an entity.
    router.post(`/${entityName}/:id/update`, entityController[`${entityName}_update_post`]);
  
    // GET request for one entity.
    router.get(`/${entityName}/:id`, entityController[`${entityName}_detail`]);
  
    // GET request for list of all entities.
    router.get(`/${entityName}s`, entityController[`${entityName}_list`]);
  });
  
  module.exports = router;