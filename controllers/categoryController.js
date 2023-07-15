const Category = require("../models/category");
const Item = require("../models/item");

// const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

// Display list of all Categories.
exports.category_list = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find().sort({ name: 1 }).exec();
  res.render("category_list", {
    title: "Category List",
    category_list: allCategories
  })
});


// Display detail page for a specific Category.
exports.category_detail = asyncHandler(async (req, res, next) => {
  // Get details of genre and all associated books (in parallel)
  const [category, itemsInCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }, "name size description price").exec(),
  ]);

  res.render("category_detail", {
    title: category,
    items: itemsInCategory,
  });
});


// Display Author create form on GET.
exports.category_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: category create GET");
  });
  
  // Handle Author create on POST.
  exports.category_create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: category create POST");
  });
  
  // Display Author delete form on GET.
  exports.category_delete_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: category delete GET");
  });
  
  // Handle Author delete on POST.
  exports.category_delete_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: category delete POST");
  });
  
  // Display Author update form on GET.
  exports.category_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: category update GET");
  });
  
  // Handle Author update on POST.
  exports.category_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: category update POST");
  });