// [1] IMPORT SECT.
// -
const Sauce = require("../models/sauce");
// node package 'file system'
const fs = require("fs");

// [2] middleWares Functions
// -
exports.createSauce = (req, res, next) => {
  // stocking data sent from front-end, as form-data, in a variable, parsed as a JS object
  // req.body = string 'sauce' that must be parsed
  const sauceObject = JSON.parse(req.body.sauce);
  // remove Id sent from front-end.
  // the sauce's Id is created by MongoDB
  delete sauceObject._id;
  // [1] 'new' => create new instance of Sauce model
  // [2] the Spread operator '...' => used to make a new copy of all elements of req.body
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  // save sauce in data-base
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.updateSauce = (req, res, next) => {
  // Updates existing sauce [*]

  // delete old img from database if user uploads a new one
  Sauce.findOne({ _id: req.params.id }).then((sauce) => {
    const filename = sauce.imageUrl.split("/images/")[1];
    fs.unlink(`images/${filename}`, () => {
      console.log("supprimé ok !");
    });
  });

  // Ternary Operator = like if() {} else {} => condition checks ? if TRUE : if FALSE
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  // [1] _id = param Req id
  // [2] new object version = targets param Req sauce / _id = param Req id
  Sauce.updateOne(
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
  // finds object in database
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      // extract filename
      const filename = sauce.imageUrl.split("/images/")[1];
      // delete file thanks to unlink
      fs.unlink(`images/${filename}`, () => {
        // in callback: once file is deleted, deletes the object from database
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Objet supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
  // mongoose model
  // targets _id = must be the same as the param Req
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(thing))
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
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
