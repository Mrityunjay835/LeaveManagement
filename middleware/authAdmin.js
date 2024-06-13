import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

const isAuthAdmin= async (req, res, next) => {
    // const token = req.header('Authorization').replace('Bearer ', '');
    const {token} =  req.cookies;
    if(!token){
        return res.status(404).json({
            success: false,
            message:"Login First"
        })
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET_CODE);
    const admin = await Admin.findById(decoded._id);
    if (!admin) {
      throw new Error();
    }
    req.admin = admin;
    next();

};

export default isAuthAdmin;