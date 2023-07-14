#! /usr/bin/env node

console.log(
    'This script populates the database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
  );
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  
  const Category = require("./models/category");
  const Item = require("./models/item");
  const ItemInstance = require("./models/iteminstance");
  
  const categories = [];
  const items = [];
  const iteminstances = [];
  
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false); // Prepare for Mongoose 7
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createCategories();
    await createItems();
    await createItemInstances();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  
  async function categoryCreate(name, description) {
    const category = new Category({ name: name, description: description });
    await category.save();
    categories.push(category);
    console.log(`Added category: ${name}`);
  }
  
  async function itemCreate(name, size, description, category, price){
    const itemdetail = {name: name, size: size, description, description, category: category, price: price}
    const item = new Item(itemdetail);

    await item.save();
    items.push(item);
    console.log(`Added item: ${name}`);

}
  async function itemInstanceCreate(item, lot, bestby) {
    const details = {item: item, lot: lot, bestby: bestby}
    const instance = new ItemInstance(details);
    await instance.save()
    iteminstances.push(instance)
    console.log(`Added iteminstance with lot#: ${lot}`);
  }
  
  async function createCategories() {
    console.log("Adding categories");
    await Promise.all([
        categoryCreate("Retail", "Direct to consumer"),
        categoryCreate("Wholesale", "Bulk quantity for wholesale accounts"),
    ]);
  }
  

  async function createItems() {
    console.log("Adding items");
    await Promise.all([
        itemCreate("Micro Mix", 4, "A blend of micro beet, dill, radish, mustard, cabbage, and cress.", categories[1], 8.50),
        itemCreate("Micro Mix", 2.5, "A blend of micro beet, dill, radish, mustard, cabbage, and cress.", categories[0], 5.99),
        itemCreate("Wellness Mix", 4, "A blend of micro broccoli, cabbage, and kale.", categories[1], 8.50),
        itemCreate("Wellness Mix", 2.5, "A blend of micro broccoli, cabbage, and kale.", categories[0], 5.99),
        itemCreate("Micro Salad", 8, "A salad mix with sunflower tops, petite pea greens, micro radish, and micro cilantro.", categories[1], 12.50),
        itemCreate("Micro Salad", 4, "A salad mix with sunflower tops, petite pea greens, micro radish, and micro cilantro.", categories[0], 8.99),
    ])
  }


  async function createItemInstances(){
    console.log("Adding instances");
    await Promise.all([
        itemInstanceCreate(items[0], 714, "2023-07-23"),
        itemInstanceCreate(items[0], 714, "2023-07-23"),
        itemInstanceCreate(items[0], 714, "2023-07-23"),
        itemInstanceCreate(items[0], 714, "2023-07-23"),
        itemInstanceCreate(items[1], 715, "2023-07-24"),
        itemInstanceCreate(items[1], 715, "2023-07-24"),
        itemInstanceCreate(items[2], 716, "2023-07-25"),
        itemInstanceCreate(items[3], 718, "2023-07-27"),
        itemInstanceCreate(items[3], 718, "2023-07-27"),
        itemInstanceCreate(items[3], 718, "2023-07-27"),
        itemInstanceCreate(items[4], 714, "2023-07-23"),
        itemInstanceCreate(items[4], 714, "2023-07-23"),
        itemInstanceCreate(items[4], 714, "2023-07-23"),
        itemInstanceCreate(items[4], 714, "2023-07-23"),
        itemInstanceCreate(items[5], 714, "2023-07-23"),
        itemInstanceCreate(items[5], 714, "2023-07-23"),
        itemInstanceCreate(items[5], 714, "2023-07-23"),
        itemInstanceCreate(items[5], 714, "2023-07-23"),
    ])
  }
  
  async function createBookInstances() {
    console.log("Adding authors");
    await Promise.all([
      bookInstanceCreate(books[0], "London Gollancz, 2014.", false, "Available"),
      bookInstanceCreate(books[1], " Gollancz, 2011.", false, "Loaned"),
      bookInstanceCreate(books[2], " Gollancz, 2015.", false, false),
      bookInstanceCreate(
        books[3],
        "New York Tom Doherty Associates, 2016.",
        false,
        "Available"
      ),
      bookInstanceCreate(
        books[3],
        "New York Tom Doherty Associates, 2016.",
        false,
        "Available"
      ),
      bookInstanceCreate(
        books[3],
        "New York Tom Doherty Associates, 2016.",
        false,
        "Available"
      ),
      bookInstanceCreate(
        books[4],
        "New York, NY Tom Doherty Associates, LLC, 2015.",
        false,
        "Available"
      ),
      bookInstanceCreate(
        books[4],
        "New York, NY Tom Doherty Associates, LLC, 2015.",
        false,
        "Maintenance"
      ),
      bookInstanceCreate(
        books[4],
        "New York, NY Tom Doherty Associates, LLC, 2015.",
        false,
        "Loaned"
      ),
      bookInstanceCreate(books[0], "Imprint XXX2", false, false),
      bookInstanceCreate(books[1], "Imprint XXX3", false, false),
    ]);
  }