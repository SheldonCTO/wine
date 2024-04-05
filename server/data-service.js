const mongoose = require("mongoose");

const mongoDBConnectionString =
"mongodb+srv://ccto:rUisVwZ2L2tuITbV@cluster0.3rmouip.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const Schema = mongoose.Schema;

const productSchema = new Schema({
  id: Number,
  Title: String,
  distrillery:String,
  image: String,
  category: String,
  desc: String,
  capacity:String,
  alc:Number

});
let Product;

module.exports.connect = function () {
  return new Promise(function (resolve, reject) {
    let db = mongoose.createConnection(
      mongoDBConnectionString,
      { useNewUrlParser: true },
      { ssl: true, tls: true }
    );

    db.on("error", (err) => {
      reject(err); // reject the promise with the provided error
    });

    db.once("open", () => {
      Product = db.model("spirits", productSchema);
      console.log(Product);
      resolve();
    });
  });
};
module.exports.getAllProducts = function () {
    return new Promise(function (resolve, reject) {
        if (!Product) {
            reject(new Error('Product model not initialized.'));
        } else {
            Product.find({}).lean().exec()
            .then(products => resolve(products))
            .catch(error => reject(error));
        }
    });
};