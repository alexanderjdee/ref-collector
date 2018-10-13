const router = require("express").Router();
const refsController = require("../../controllers/refsController");

// Matches with "/api/refs"
router.route("/")
  .get(refsController.findAll)
  .post(refsController.create);

// Matches with "/api/refs/:id"
router.route("/:id")
  .get(refsController.findById)
  .put(refsController.update)
  .delete(refsController.remove);

module.exports = router;
