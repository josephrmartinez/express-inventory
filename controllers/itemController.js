const Item = require("../models/item");
const ItemInstance = require("../models/iteminstance")

const asyncHandler = require("express-async-handler");


// Display list of all items.
exports.item_list = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: item list");
  });
  
  // Display detail page for a specific item.
  exports.item_detail = asyncHandler(async (req, res, next) => {
  const [item, itemInstances] = await Promise.all([
    Item.findById(req.params.id)
    .populate("category")
    .exec(),
    ItemInstance.find({ item: req.params.id }, "lot bestby").exec(),
    
  ]);
  console.log(item.category)
  const lotCounts = await item.lotCounts
  console.log(lotCounts)

  
  
  res.render("item_detail", {
    title: item.category.name,
    description: item.description,
    item: item,
    items: itemInstances,
  });
});
  
  // Display item create form on GET.
  exports.item_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: item create GET");
  });
  
  // Handle item create on POST.
  exports.item_create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: item create POST");
  });
  
  // Display item delete form on GET.
  exports.item_delete_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: item delete GET");
  });
  
  // Handle item delete on POST.
  exports.item_delete_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: item delete POST");
  });
  
  // Display item update form on GET.
  exports.item_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: item update GET");
  });
  
  // Handle item update on POST.
  exports.item_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: item update POST");
  });