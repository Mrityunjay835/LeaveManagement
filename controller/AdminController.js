import Admin from "../models/Admin.js"
import LeaveRequest from "../models/LeaveRequest.js"
import bcrypt from "bcrypt"
import { sendCookie } from "../utils/features.js";


export const getAllAdmin  = async(req,res) =>{
    const {id} =  req.params
    const admin = await Admin.find()

    res.json({
        success:true,
        admin
    }) 
}


// export const createNewAdmin =  async(req,res)=>{
//     const {username,password} = req.body;
//     await Admin.create({
//         username,
//         password,
//     });

//     res.json({
//         success:true,
//         message:"Register new admin"
//     })
// }

export const registerAdmin = async (req, res) => {
  const { username, password} = req.body;

  let admin = await Admin.findOne({username})

  if(admin){
      return res.status(400).json({
          success: false,
          message:"This email is already used" 
      });
  }

  const hashPassword  = await bcrypt.hash(password,10)

  console.log("hashPassword",hashPassword)
  admin = await Admin.create({
      username,
      password:hashPassword
  });
  sendCookie(
      admin,res,"Register new admin",201
  );
}

export const loginAdmin =  async(req,res)=>{
  const {username,password} = req.body;

  let admin =  await Admin.findOne({username}).select("+password");

  if(!Admin) 
      return res.status(404).json({
                  success:false,
                  message: "Invalid Password"});

  const isMatchPassword =await bcrypt.compare(password,admin.password)
  console.log("password,isMatchPassword", isMatchPassword)
  if(!isMatchPassword) 


      return res.status(404).json({
                  success:false,
                  message: "Invalid Password"});
  sendCookie(admin,res,"successfully login", 201)
}

export const getAllLeaveRequest = async (req, res) => {
    try {
      const leaveRequests = await LeaveRequest.find()
      res.json(leaveRequests);
    } catch (err) {
      res.status(500).send(err);
    }
  }

// export const getLeaveApplierDetails = async (req, res) => {
//   const { id } = req.params;
//   res.
// }

export const updateLeaveRequestById =  async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
  
    if (!['APPROVED', 'REJECTED'].includes(status)) {
      return res.status(400).send({ error: 'Invalid status' });
    }
  

    try {
  
      const updatedLeaveRequest = await LeaveRequest.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );
      console.log("emp",updatedLeaveRequest)
      res.json(updatedLeaveRequest);
    } catch (err) {
      res.status(400).send(err);
    }
  }
