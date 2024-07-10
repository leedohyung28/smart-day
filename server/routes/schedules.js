const express = require("express");
const router = express.Router();

const {
  getSchedules,
  getMonthlyArray,
  getScheduleById,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} = require("../controller/schedulesController");

router.use(express.json());

router.get("/", getSchedules);
router.get("/calendar", getMonthlyArray);
router.get("/detail/:id", getScheduleById);
router.post("/", createSchedule);
router.put("/:id", updateSchedule);
router.delete("/:id", deleteSchedule);

module.exports = router;
