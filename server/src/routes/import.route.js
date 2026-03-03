const express = require("express");
const router = express.Router();
const importController = require("../controller/import.controller");

router.get("/import", importController.triggerImport);
router.get("/import-logs", importController.getImportLogs);

module.exports = router;