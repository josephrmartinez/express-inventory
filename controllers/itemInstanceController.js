const ItemInstance = require("../models/iteminstance");
const Item = require("../models/item")

const asyncHandler = require("express-async-handler");


// Display list of all iteminstances.
exports.iteminstance_list = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: iteminstance list");
  });
  
  // Display detail page for a specific iteminstance.
  exports.iteminstance_detail = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: iteminstance detail: ${req.params.id}`);
  });
  
  // Display iteminstance create form on GET.
  exports.iteminstance_create_get = asyncHandler(async (req, res, next) => {
    const allItems = await Item.find({}, "name size category")
    .populate("category")
    .exec();

    res.render("iteminstance_form", {
      item_list: allItems
    })
  });



  
  // Handle iteminstance create on POST.
  exports.iteminstance_create_post = async (req, res, next) => {
    try {
      console.log(req.body);
  
      // Create multiple Item instances
      const instances = [];
      for (let i = 0; i < req.body.quantity; i++) {
        const instance = new ItemInstance({
          item: req.body.item,
          lot: req.body.lot,
          bestby: req.body.bestby
        });
        instances.push(instance);
      }
  
      await ItemInstance.insertMany(instances); // Save all instances at once
  
      res.redirect("/admin");
      
    } catch (err) {
      console.error(err);
      
    }
  };
  
  // Display iteminstance delete form on GET.
  exports.iteminstance_delete_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: iteminstance delete GET");
  });
  
  // Handle iteminstance delete on POST.
  exports.iteminstance_delete_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: iteminstance delete POST");
  });
  
  // Display iteminstance update form on GET.
  exports.iteminstance_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: iteminstance update GET");
  });
  
  // Handle iteminstance update on POST.
  exports.iteminstance_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: iteminstance update POST");
  });