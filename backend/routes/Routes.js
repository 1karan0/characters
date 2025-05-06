const express = require("express");
const router = express.Router();

const {
  getAllCharacters,
  getCharById,
} = require("../controllers/getCharacter");
const { createCharacter } = require("../controllers/createCharacter");
const {deleteCharacter} = require("../controllers/deleteCharacter");
const {signUp,login} = require("../controllers/userController")
const upload = require("../middlewares/upload");
const { auth } = require("../middlewares/auth");
const { UpdateCharacter } = require("../controllers/UpdateCharacter");
const { CreateUnivers, getUnivers } = require("../controllers/UniversController");

router.post("/createchar",auth, createCharacter);
router.get("/characters/:id", getCharById);
router.get("/characters", getAllCharacters);
router.delete("/characters/:id", deleteCharacter);
router.post('/signup',signUp);
router.post('/login',login);
router.put('/updatecharacter/:id',UpdateCharacter);
router.post('/createunivers',auth,CreateUnivers)
router.get('/getunivers',getUnivers);

module.exports = router;
