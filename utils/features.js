import jwt from "jsonwebtoken"


export const sendCookie = (user, res, message, statusCode = 200) => {

    
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_CODE)

    res.status(statusCode).cookie("token", token, {
        httpOnly: true,
        maxAge: 5 * 60 * 1000
    }).json({
        success: true,
        message
    });
};

