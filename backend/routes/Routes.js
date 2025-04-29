const express = require("express");
const router = express.Router();

const {
  getAllCharacters,
  getCharById,
} = require("../controllers/getCharacter");
const { createCharacter } = require("../controllers/createCharacter");
const upload = require("../middlewares/upload");

router.post("/createchar", upload.single("image"), createCharacter);
router.get("/characters/:id", getCharById);
router.get("/characters/univres/:univers", getAllCharacters);

module.exports = router;
