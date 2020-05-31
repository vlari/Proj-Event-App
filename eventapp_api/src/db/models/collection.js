import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const collectionSchema = new Schema({
    userId: String,
    events: []
},
{
    timestamps: true
});

export default mongoose.model('Collection', collectionSchema);
