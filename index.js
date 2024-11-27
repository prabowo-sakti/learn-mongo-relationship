const mongoose = require("mongoose");
const uri =
  "mongodb://sakti26:Benggala123@127.0.0.1:27017/relation_db?authSource=admin";

mongoose
  .connect(uri)
  .then((result) => {
    console.log("Conn  ected to mongodb");

    const userSchema = new mongoose.Schema({
      name: String,
      adresses: [
        {
          _id: false,
          street: String,
          city: String,
          country: String,
        },
      ],
    });

    const User = mongoose.model("User", userSchema);

    const addAdresses = async (id) => {
      const user = await User.findById(id);
      user.adresses.push({
        street: "Ranau Estate Tahap 2 Blok B No.3",
        city: "Serang",
        country: "ID",
      });
      const res = await user.save();
      console.log(res);
    };

    addAdresses("6746f36c86a5dbd1addbb18a");

    // const makeUser = async () => {
    //   const user = new User({
    //     name: "John Doe",
    //   });

    //   user.adresses.push({
    //     street: "JL.KM.IDRIS",
    //     city: "Anytown",
    //     country: "USA",
    //   });
    //   const res = await user.save();
    //   console.log(res);
    // };
    // makeUser();
  })
  .catch((err) => {
    console.log(err);
  });
