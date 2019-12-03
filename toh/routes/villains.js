
// routes/villain.js
const express = require("express");
const Villain = require("../models/Villain");

const router = express.Router();

router
  .route("/")
  .get((req, res, next) => {
    Villain.find({})
      .then(villain => {
        res.json(villain);
      })
      .catch(next);
  })

  // create Villain
  .post((req, res, next) => {
    Villain.create(req.body)
      .then(villain => {
        res.statusCode = 201;
        res.json(villain);
      })
      .catch(next);
  })

  //Dont allow
  .put((req, res) => {
    res.statusCode = 405;
    res.json({ message: "Method not supported" });
  })

  // delete all
  .delete((req, res, next) => {
    Villain.deleteMany({})
      .then(reply => {
        res.json(reply);
      })
      .catch(next);
  });

// Villain with id
router
  .route("/:id")
  // Show one Villain
  .get((req, res, next) => {
    Villain.findById(req.params.id)
      .then(villain => {
        if (villain == null) throw new Error("villain not found!");
        res.json(villain);
      })
      .catch(next);
  })
  // add not allowed
  .post((req, res) => {
    res.statusCode = 405;
    res.json({ message: "Method not allowed" });
  })
  //update villain
  .put((req, res, next) => {
    Villain.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
      .then(reply => {
        if (reply == null) throw new Error("Villain not found!");
        res.json(reply);
      })
      .catch(next);
  })
  // delete villain
  .delete((req, res, next) => {
    Villain.findByIdAndDelete(req.params.id)
      .then(villain => {
        if (villain == null) throw new Error("villain not found!");
        res.json(villain);
      })
      .catch(next);
  });

module.exports = router;
