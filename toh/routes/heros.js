
// routes/heros.js
const express = require("express");
const Hero = require("../models/Hero");

const router = express.Router();

// Heros root
router
  .route("/")
  // Show all heros
  .get((req, res, next) => {
    Hero.find({})
      .then(heros => {
        res.json({heros, user:req.user});
      })
      .catch(err => next(err));
  })

  // create hero
  .post((req, res, next) => {
    Hero.create(req.body)
      .then(heros => {
        res.statusCode = 201;
        res.json(heros);
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
    Hero.deleteMany({})
      .then(reply => {
        res.json(reply);
      })
      .catch(next);
  });

// heros with id
router
  .route("/:id")
  // Show one heros
  .get((req, res, next) => {
    Hero.findById(req.params.id)
      .then(hero => {
        if (hero == null) throw new Error("hero not found!");
        res.json(hero);
      })
      .catch(next);
  })
  // add not allowed
  .post((req, res) => {
    res.statusCode = 405;
    res.json({ message: "Method not allowed" });
  })
  //update hero
  .put((req, res, next) => {
    Hero.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
      .then(reply => {
        if (reply == null) throw new Error("Hero not found!");
        res.json(reply);
      })
      .catch(next);
  })
  // delete hero
  .delete((req, res, next) => {
    Hero.findByIdAndDelete(req.params.id)
      .then(hero => {
        if (hero == null) throw new Error("hero not found!");
        res.json(hero);
      })
      .catch(next);
  });

// comment for hero

router
  .route("/:id/comments")
  // Show all comments
  .get((req, res, next) => {
    Hero.findById(req.params.id)
      .then(hero => {
        res.json(hero.comments);
      })
      .catch(next);
  })
  // post a comment
  .post((req, res, next) => {
    Hero.findById(req.params.id)
      .then(hero => {
        hero.comments.push(req.body);
        hero
          .save()
          .then(hero => {
            res.json(hero.comments);
          })
          .catch(next);
      })
      .catch(next);
  })
  // Update not alowed
  .put((req, res) => {
    res.statusCode = 405;
    res.json({ message: "Method not allowed" });
  })
  // Delete all commets
  .delete((req, res, next) => {
    Hero.findById(req.params.id)
      .then(hero => {
        hero.notes = [];
        hero
          .save()
          .then(hero => {
            res.json(hero.notes);
          })
          .catch(next);
      })
      .catch(next);
  });

// Comments with parameters
router
  .route("/:id/comments/:nid")
  .get((req, res, next) => {
    Hero.findById(req.params.id)
      .then(hero => {
        let note = hero.comments.id(req.params.nid);
        res.json(note);
      })
      .catch(next);
  })
  .post((req, res) => {
    res.statusCode = 405;
    res.json({ message: "Method not allowed" });
  })
  .put((req, res, next) => {
    Hero.findById(req.params.id)
      .then(hero => {
        let note = hero.comments.id(req.params.nid);
        hero
          .save()
          .then(hero => {
            res.json(note);
          })
          .catch(next);
      })
      .catch();
  })
  .delete((req, res, next) => {
    Hero.findById(req.params.id)
      .then(hero => {
        hero.comments.pull(req.params.nid);
        hero
          .save()
          .then(hero => {
            res.json(hero.comments);
          })
          .catch(next);
      })
      .catch(next);
  });

module.exports = router;