import express from 'express';
import { registerAdmin, getAllAdmin, getAllLeaveRequest, updateLeaveRequestById, loginAdmin } from '../controller/AdminController.js';
import isAuthAdmin from '../middleware/authAdmin.js';

const router = express.Router();
//auth is nesseccery for admin 

//to create the admin using username and password
router.post("/",registerAdmin)
router.get("/",loginAdmin)

router.get("/",isAuthAdmin,getAllAdmin)


//to see all the leave request
router.get("/leaverequests",isAuthAdmin, getAllLeaveRequest);

// Route to update leave request status
router.put("/leaverequests/:id",isAuthAdmin,updateLeaveRequestById);



export default router;
