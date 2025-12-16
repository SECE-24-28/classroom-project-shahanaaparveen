import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  phone: { type: String, required: true },
  operator: { type: String, required: true },
  amount: { type: Number, required: true },
  planId: { type: String, required: true },
  status: { type: String, default: 'success' },
  transactionId: { type: String, required: true, unique: true }
}, { timestamps: true });

export default mongoose.model('Transaction', transactionSchema);