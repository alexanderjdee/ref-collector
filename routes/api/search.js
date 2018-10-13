const router = require("express").Router();
const refsController = require("../../controllers/refsController");

//Matches with "/api/refs/:search"
router.route("/:search")
  .get(refsController.findBySearch);

  module.exports = router;