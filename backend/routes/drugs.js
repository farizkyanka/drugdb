const express = require("express");
const router = express.Router();
const Drug = require("../models/drugs");
const { isLoggedIn } = require("../controllers/middleware");

//Get all
router.get("/", async (req, res) => {
  try {
    const drug = await Drug.find();
    res.json({ payload: drug });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Query all categories
router.get("/list-drug-categories", async (req, res) => {
  try {
    const categories = await Drug.distinct("category");
    if (categories == null) {
      return res.status(404).json({ message: "empty category" });
    }
    res.json({ categories });
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.get("/search", async (req, res) => {
  try {
    let searchResult;
    if (req.query.category) {
      const searchQuery = req.query.category.trim().toLowerCase();
      searchResult = await Drug.find({
        category: { $regex: searchQuery },
      });
    } else {
      const searchQuery = req.query.prompt.trim().toLowerCase();
      searchResult = await Drug.find({
        $or: [
          { name: { $regex: searchQuery, $options: "i" } },
          { composition: { $regex: searchQuery } },
          { indication: { $regex: searchQuery } },
        ],
      });
    }
    const searchPayload = searchResult.slice(0, 10);
    return res.json(searchPayload);
  } catch (err) {
    return res.status(404).json([err]);
  }
});

//Get one item
router.get("/:id", getDrugsById, (req, res) => {
  res.send(res.drug);
});

//Create one item
router.post("/", isLoggedIn, async (req, res) => {
  try {
    const drug = new Drug({
      name: req.body.name,
      img: req.body.img,
      composition: req.body.composition,
      strength: req.body.strength,
      form: req.body.form,
      category: req.body.category,
      class: req.body.class,
      fornasRegistered: req.body.fornasRegistered,
      indication: req.body.indication,
      dose: req.body.dose,
      contraindication: req.body.contraindication,
      manufacturer: req.body.manufacturer,
      pregnancyCategory: req.body.pregnancyCategory,
      lactationSafety: req.body.lactationSafety,
      interactions: req.body.interactions,
      adverseEffects: req.body.adverseEffects,
      references: req.body.references,
      lastUpdated: new Date(),
    });
    try {
      const newDrug = await drug.save();
      res.status(201).json(newDrug);
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: err.message });
    }
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

//Edit one item
router.patch("/:id", isLoggedIn, getDrugsById, async (req, res) => {
  if (req.body.name != null) {
    res.drug.name = req.body.name;
  }
  if (req.body.img != null) {
    res.drug.img = req.body.img;
  }
  if (req.body.composition != null) {
    res.drug.composition = req.body.composition;
  }
  if (req.body.strength != null) {
    res.drug.strength = req.body.strength;
  }
  if (req.body.form != null) {
    res.drug.form = req.body.form;
  }
  if (req.body.category != null) {
    res.drug.category = req.body.category;
  }
  if (req.body.class != null) {
    res.drug.class = req.body.class;
  }
  if (req.body.fornasRegistered != null) {
    res.drug.fornasRegistered = req.body.fornasRegistered;
  }
  if (req.body.indication != null) {
    res.drug.indication = req.body.indication;
  }
  if (req.body.dose != null) {
    res.drug.dose = req.body.dose;
  }
  if (req.body.contraindication != null) {
    res.drug.contraindication = req.body.contraindication;
  }
  if (req.body.manufacturer != null) {
    res.drug.manufacturer = req.body.manufacturer;
  }
  if (req.body.pregnancyCategory != null) {
    res.drug.pregnancyCategory = req.body.pregnancyCategory;
  }
  if (req.body.lactationSafety != null) {
    res.drug.lactationSafety = req.body.lactationSafety;
  }
  if (req.body.interactions != null) {
    res.drug.interactions = req.body.interactions;
  }
  if (req.body.adverseEffects != null) {
    res.drug.adverseEffects = req.body.adverseEffects;
  }
  if (req.body.references != null) {
    res.drug.references = req.body.references;
  }
  res.drug.lastUpdated = new Date();
  try {
    const updatedDrug = await res.drug.save();
    res.json(updatedDrug);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ statusText: err.message });
  }
});

//Remove one item
router.delete("/:id", isLoggedIn, getDrugsById, async (req, res) => {
  try {
    await res.drug.deleteOne();
    return res.json({ message: "deleted drug" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Middlewares
//Find database by Id
async function getDrugsById(req, res, next) {
  try {
    const drug = await Drug.findById(req.params.id);
    if (drug == null) {
      return res.status(404).json({ message: "drug not found" });
    }
    res.drug = drug;
  } catch (err) {
    res.status(500).json({ err });
  }
  next();
}

//Find database by name search
async function searchDrugs(req, res, next) {
  try {
    const { q } = req.query;
    const drug = await Drug.find({ name: q });
    console.log(drug);
    if (drug == null) {
      return res.status(404).json({ message: "drug not found" });
    }
    res.drug = drug;
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  next();
}

module.exports = router;
