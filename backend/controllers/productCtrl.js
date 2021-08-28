// [1] IMPORT SECT.
// -
const Product = require("../models/product");

// [2] middleWares Functions
// -
exports.createProduct = (req, res, next) => {
  // remove front-end Id if necessary
  delete req.body._id;
  // [1] 'new' => class instance
  // [2] the Spread operator '...' => used to make a new copy of all elements of req.body
  const product = new Product({
    ...req.body,
  });
  product
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.updateProduct = (req, res, next) => {
  // Updates existing product [*]
  // [1] _id = param Req id
  // [2] new object version = targets param Req product / _id = param Req id
  Product.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteProduct = (req, res, next) => {
  Product.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneProduct = (req, res, next) => {
  // mongoose model
  // targets _id = must be the same as the param Req
  Product.findOne({ _id: req.params.id })
    .then((product) => res.status(200).json(thing))
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllProducts = (req, res, next) => {
  Product.find()
    .then((products) => res.status(200).json(products))
    .catch((error) => res.status(400).json({ error }));
};

/*
L'utilisation du mot-clé new avec un modèle Mongoose
crée par défaut un champ _id .

Utiliser ce mot-clé générerait une erreur, car nous tenterions
de modifier un champ immuable dans un document de la base de données.

Par conséquent, nous devons utiliser le paramètre id de la
requête pour configurer notre Thing avec le même_id qu'avant.
*/
