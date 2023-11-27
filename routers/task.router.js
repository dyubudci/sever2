const router = require('express').Router();
const controller = require('../controllers/task.controller.js')

router.get("/tasks", controller.readTask)
router.get("/tasks/role", controller.readTaskByRole)
router.put("/update/task/:id", controller.updateTask)
router.delete("/delete/task/:id", controller.deleteTask)

module.exports = router