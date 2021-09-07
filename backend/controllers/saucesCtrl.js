// [1] IMPORT SECT.
// -
// mongoose modelSchema
const Sauce = require("../models/sauce");
// node package 'file system'
// https://practicalprogramming.fr/how-to-use-node-fs
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
  // [2] the Spread operator '...' => creates a new copy of all elements of req.body
  // https://geeklecode.com/loperateur-spread-en-javascript-va-vous-simplifier-la-vie/
  const sauce = new Sauce({
    ...sauceObject,
    // (a) ${req.protocol} = http or https
    // (b) ${req.get("host")} = target host server
    // (c) ${req.file.filename} = filename
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
  });

  // Express Validator = validate model from inputs
  const validatedModel = sauce.validateSync();

  if (!!validatedModel) {
    res
      .status(400)
      .json({ message: "Le champ n'a pas été rempli correctement !" });
  } else {
    // save sauce in data-base
    sauce
      .save()
      .then(() => res.status(201).json({ message: "Objet enregistré !" }))
      .catch((error) => res.status(400).json({ error }));
  }
};

exports.updateSauce = (req, res, next) => {
  // Updates existing sauce [*]

  // // delete old img from database if user uploads a new one
  // Sauce.findOne({ _id: req.params.id }).then((sauce) => {
  //   const filename = sauce.imageUrl.split("/images/")[1];
  //   fs.unlink(`images/${filename}`, () => {
  //     console.log("old picture deleted !");
  //   });
  // });

  // if update has to process a new image
  // Ternary Operator | if req.file exists ?
  // => like if() {} else {} => condition checks ? if TRUE : if FALSE
  const sauceObject = req.file
    ? {
        // if exists =>
        // (a) targets all infos from req object
        ...JSON.parse(req.body.sauce),
        // (b) generates new img
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : // if doesn't exist => simply copy req.body
      { ...req.body };

  // [=>] UPDATE / save object
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
        // in callback: once file is deleted => deletes object from database
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Objet supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
  // mongoose model
  // targets _id = must be the same as the req param
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};

exports.manageLike = (req, res, next) => {
  // grabs user id
  let userId = req.body.userId;
  // grabs sauce id
  let sauceId = req.params.id;
  // grabs 'like' in request body
  let like = req.body.like;

  if (like === 1) {
    // if user smashes the like button
    // => updates the sauce given its id
    Sauce.updateOne(
      { _id: sauceId },
      {
        // [ mongoDB push operator ]
        // pushes userId to usersLiked: [array]
        $push: { usersLiked: userId },
        // [ mongoDB increment operator ]
        // increments likes [array]
        $inc: { likes: +1 },
      }
    )
      .then(() =>
        res.status(200).json({ message: "Like ajouté par l'utilisateur !" })
      )
      .catch((error) => res.status(400).json({ error }));
  }

  if (like === -1) {
    // if user smashes the dislike button
    // => updates the sauce given its id
    Sauce.updateOne(
      { _id: sauceId },
      {
        // [ mongoDB push operator ]
        // pushes userId to usersDisliked: [array]
        $push: { usersDisliked: userId },
        // [ mongoDB increment operator ]
        // increments dislikes [array]
        $inc: { dislikes: +1 },
      }
    )
      .then(() =>
        res.status(200).json({ message: "Dislike ajouté par l'utilisateur !" })
      )
      .catch((error) => res.status(400).json({ error }));
  }

  // Remove like / dislike
  if (like === 0) {
    Sauce.findOne({
      _id: sauceId,
    })
      .then((sauce) => {
        // remove like
        // if user has already liked
        if (sauce.usersLiked.includes(userId)) {
          Sauce.updateOne(
            { _id: sauceId },
            { $pull: { usersLiked: userId }, $inc: { likes: -1 } }
          )
            .then(() =>
              res
                .status(200)
                .json({ message: "Like retiré par l'utilisateur !" })
            )
            .catch((error) => res.status(400).json({ error }));
        }
        // remove dislike
        // if user has already disliked
        if (sauce.usersDisliked.includes(userId)) {
          Sauce.updateOne(
            { _id: sauceId },
            { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 } }
          )
            .then(() =>
              res
                .status(200)
                .json({ message: "Dislike retiré par l'utilisateur !" })
            )
            .catch((error) => res.status(400).json({ error }));
        }
      })
      .catch((error) => res.status(400).json({ error }));
  }
};

/*
L'utilisation du mot-clé new avec un modèle Mongoose
crée par défaut un champ _id .

Utiliser ce mot-clé générerait une erreur, car nous tenterions
de modifier un champ immuable dans un document de la base de données.

Par conséquent, nous devons utiliser le paramètre id de la
requête pour configurer notre Thing avec le même_id qu'avant.

end*/
