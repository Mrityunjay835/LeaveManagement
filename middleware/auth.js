import jwt from 'jsonwebtoken';
import Employee from '../models/Employee.js';

const isAuthenticagted = async (req, res, next) => {
    // const token = req.header('Authorization').replace('Bearer ', '');
    const {token} =  req.cookies;
    if(!token){
        return res.status(404).json({
            success: false,
            message:"Login First"
        })
    }

    //decode the password to the orignal using secret code
    const decoded = jwt.verify(token,process.env.JWT_SECRET_CODE);
    const employee = await Employee.findById(decoded._id);
    if (!employee) {
      throw new Error();
    }
    req.employee = employee;
    next();

};

export default isAuthenticagted;