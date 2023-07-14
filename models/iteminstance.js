const mongoose = require("mongoose");
const { DateTime } = require("luxon")

const Schema = mongoose.Schema;

const ItemInstanceSchema = new Schema({
  name: { type: Schema.Types.ObjectId, ref: "Item", required: true },
  lot: { type: Number },
  bestby: { type: Date }
});

// Virtual for item's URL
ItemInstanceSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/iteminstance/${this._id}`;
});

// Virtual for item's stock count:
ItemInstanceSchema.virtual("bestby_formatted").get(function () {
    return DateTime.fromJSDate(this.bestby).toLocaleString(DateTime.DATE_MED);
  });

// Export model
module.exports = mongoose.model("ItemInstance", ItemInstanceSchema);
