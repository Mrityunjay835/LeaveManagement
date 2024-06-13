import express from "express"
import { createLeaveRequest, deleteEmployess, getAllEmployees, getEmployeesByName, getEmployeeByID, getExistedProfile, getLeaveStatus, loginEmployee, logoutEmployee, registerEmployee, special, updateEmployessLeave } from "../controller/EmployeeController.js";
import isAuthenticagted from "../middleware/auth.js";

const router = express.Router();

//api for the get employe
router.post("/", registerEmployee);
router.get("/", loginEmployee);
router.get("/",isAuthenticagted, logoutEmployee);
router.get("/existProfile",isAuthenticagted, getExistedProfile);


router.get("/special", getAllEmployees)



//api for get the employe by name dynamically from url  (http://localhost:4000/employees/Ram)
router.get("/:name", getEmployeesByName)


// router.put("/:id",updateEmployessLeave)
// router.get("/:id",getEmployeeByID)
// router.delete("/:id",deleteEmployess)
router.route("/:id").get(getEmployeeByID).put(updateEmployessLeave).delete(deleteEmployess)

router.post("/requestleave",isAuthenticagted, createLeaveRequest)

router.get("/requestleave/:id", getLeaveStatus)


export default router