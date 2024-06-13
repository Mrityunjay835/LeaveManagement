import mongoose from 'mongoose';

const { Schema,model } = mongoose;

const LeaveRequestSchema = new Schema({
  employee: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  noOfDays: {
    type: Number,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['PENDING', 'APPROVED', 'REJECTED'],
    default: 'PENDING'
  }
});

const LeaveRequest = mongoose.model('LeaveRequest', LeaveRequestSchema);
export default LeaveRequest;