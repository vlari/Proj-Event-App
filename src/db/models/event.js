import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please add an event name']
    },
    organizer: {
        name: {
            type: String,
            required: [true, 'Please add the name of the organizer']
        },
        website: String
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        minlength: 50,
        maxlength: 100
    },
    date: {
        type: Date,
        required: [true, 'Please add a date']
    },
    address: {
        type: String,
        required: [true, 'Please add an address'],
        maxlength: 50
    },
    location: {
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        },
        fullAddress: String,
        street: String,
        city: String,
        zipCode: String,
        country: String
    },
    tickets: [],
    tags: [String],
    imageUrl: {
        type: String,
        required: [true, 'Please add image url']
    }
},
{
    timestamps: true
});

export default mongoose.model('Event', eventSchema);
