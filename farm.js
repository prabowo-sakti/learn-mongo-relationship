const mongoose = require("mongoose");
const uri =
  "mongodb://sakti26:Benggala123@127.0.0.1:27017/relation_db?authSource=admin";

mongoose
  .connect(uri)
  .then((result) => {
    console.log("Connected to mongodb");

    const productSchema = new mongoose.Schema({
      name: String,
      price: Number,
      season: {
        type: String,
        enum: ["spring", "summer", "fall", "winter"],
      },
    });

    const farmSchema = new mongoose.Schema({
      name: String,
      city: String,
      products: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      ],
    });

    const Product = mongoose.model("Product", productSchema);

    const Farm = mongoose.model("Farm", farmSchema);

    // Product.insertMany([
    //   {
    //     name: "Mellon",
    //     price: 9,
    //     season: "summer",
    //   },
    //   {
    //     name: "Watermelon",
    //     price: 11,
    //     season: "summer",
    //   },
    //   {
    //     name: "Durian",
    //     price: 12,
    //     season: "summer",
    //   },
    // ]);

    const makeFarm = async () => {
      const farm = new Farm({
        name: "Farm",
        city: "Anytown",
      });

      const melon = await Product.findOne({ name: "Mellon" });
      farm.products.push(melon);
      console.log(farm);
    };
  })
  .catch((err) => {
    console.log(err);
  });
