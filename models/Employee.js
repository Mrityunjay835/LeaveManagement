import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        select: false
    },
    earnedLeave: Number
});

const Employee = mongoose.model('Employee', EmployeeSchema);
export default Employee;