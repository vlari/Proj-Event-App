import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const eventCategorySchema = new Schema({
  name: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Category', eventCategorySchema);
