const mongoose = require("mongoose");
const ItemInstance = require("../models/iteminstance");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true },
  size: { type: Number },
  description: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  price: { type: Number },
});

// Virtual for item's URL
ItemSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/item/${this._id}`;
});

// Virtual for item's stock count:
ItemSchema.virtual("stock").get( async function(){
  const Item = mongoose.model("Item");
  const count = await Item.countDocuments({});
  return count;
});


ItemSchema.virtual("lotCounts").get(async function() {
  const itemInstances = await ItemInstance.find({ item: this._id }, "lot").exec();
  
  const counts = itemInstances.reduce((acc, instance) => {
    const lot = instance.lot;
    acc[lot] = (acc[lot] || 0) + 1;
    return acc;
  }, {});
  
  return counts;
});


// ItemSchema.virtual("lotCounts").get(async function() {
//   const itemInstances = await ItemInstance.find({ item: this._id }, "lot").exec();
//   const counts = {};

//   itemInstances.forEach((instance) => {
//     const lot = instance.lot;
//     counts[lot] = (counts[lot] || 0) + 1;
//   });

//   return counts;
// });

// Export model
module.exports = mongoose.model("Item", ItemSchema);
