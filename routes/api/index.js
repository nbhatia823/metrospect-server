const router = require("express").Router();

router.use("/issues", require("./issues"));

module.exports = router;
