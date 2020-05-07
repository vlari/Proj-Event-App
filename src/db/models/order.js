import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    event: {
        name: String,
        organizer: String,
        date: Date,
        address: String,
        ticket: String
    },
    quantity: Number,
    user: {
        userId: {
            type: String,
            select: false
        },
        fullName: String,
        email: {
            type: String,
            match: [/^(\D)+(\w)*((\.(\w)+)?)+@(\D)+(\w)*((\.(\D)+(\w)*)+)?(\.)[a-z]{2,}$/,
            'Please enter a valid email']
        }
    }
},
{
    timestamps: true
});

export default orderModel = mongoose.model('Order', orderSchema);
