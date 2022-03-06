const router = require("express").Router();

const { signinVl, signupVl } = require("../middlewares/validator/authValidator");
const { signin, user } = require("../middlewares/auth");
const { GetTokenCtrl, signUpCtrl, getUsrCtrl } = require("../controllers/authControllers");

router.post("/login", signinVl, signin, GetTokenCtrl);
router.post("/signup", signupVl, signUpCtrl);
router.get("/getuser", user, getUsrCtrl);

module.exports = router;
