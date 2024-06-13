import Employee from "../models/Employee.js"
import LeaveRequest from "../models/LeaveRequest.js";
import bcrypt from "bcrypt"
import { sendCookie } from "../utils/features.js";


//api for get all employees
export const getAllEmployees  = async(req,res)=>{
    try {
        const employees = await Employee.find();
        res.json(
            {
                success:"true",
                employees
            }
        );
    } catch (err) {
        res.status(500).json({ message: err.message });
    } 
}

export const getEmployeesByName  = async(req,res)=>{
    const {name} = req.params;

    const employees = await Employee.findOne({name})

    res.json({
        success:true,
        employees
    })
}

// register or create new employee
export const registerEmployee = async (req, res) => {
    const { name, email, password, earnedLeave } = req.body;

    let employee = await Employee.findOne({email})
// checking the duplication 
    if(employee){
        return res.status(400).json({
            success: false,
            message:"This email is already used"
        });
    }

    const hashPassword  = await bcrypt.hash(password,10)
    console.log("hashPassword",hashPassword)

    //here we are saveing the encrypted password in database
    employee = await Employee.create({
        name,
        email,
        password:hashPassword,
        earnedLeave
    });

    //saving to the cookies
    sendCookie(
        employee,res,"Register new employee",201
    );
}

//for login
export const loginEmployee =  async(req,res)=>{
    const {email,password} = req.body;

    let employee =  await Employee.findOne({email}).select("+password");

    if(!employee) 
        return res.status(404).json({
                    success:false,
                    message: "Invalid Password"});

    const isMatchPassword =await bcrypt.compare(password,employee.password)
    console.log("password,isMatchPassword", isMatchPassword)
    if(!isMatchPassword) 


        return res.status(404).json({
                    success:false,
                    message: "Invalid Password"});
    sendCookie(employee,res,"successfully login", 201)
}

//logout
export const logoutEmployee = async(req, res)=>{
    res.status(202).cookie("token","",expirescookie("token","", {
        expries: new DataTransfer(Date.now())
    })).json({
        success:true,
        employee:""
    })
}



export const getExistedProfile = async (req, res) =>{
    res.status(200).json({
        success : true,
        employee:req.employee
    });
}


//here we will update the employe noofleave Days
export const updateEmployessLeave  = async(req,res) =>{
    const {id} =  req.params
    const employee = await Employee.findById(id)

    res.json({
        success:true,
        employee
    })
}

export const getEmployeeByID  = async(req,res) =>{
    const {id} =  req.params
    const employee = await Employee.findById(id)

    res.json({
        success:true,
        employee
    })
}

export const deleteEmployess  = async(req,res) =>{
    const {id} =  req.params
    const employee = await Employee.findById(id)
    res.json({
        success:true,
        employee
    })
}

//api for requesting the leave from the urn leave
export const createLeaveRequest = async (req, res) => {
    const {id} =  req.employee
    const { noOfDays, reason } = req.body;
    const employee = await Employee.findById(id)
  
    if (!employee) {
        return res.status(404).json({ success: false, message: 'Employee not found' });
      }


      await LeaveRequest.create({
        employee:id,
        noOfDays, 
        reason
    });
    //create new leave request and save the request to the server
    try {
      res.status(201).json(
        {
            success: true,
            message: "leave applied"
        }
      );
    } catch (err) {
      res.status(400).send(err);
    }
  };

export const getLeaveStatus = async(req,res) =>{
    const {id} =  req.params
    const leaveRequest = await LeaveRequest.findById(id)

    res.json({
        success:true,
        leaveRequest
    })
}

export const special =  (req,res)=>{
    res.json({
        success:true,
        message:"hi it is static, so it should be in top of dynamic so it will br not recons as /:name"
    })
}

    
