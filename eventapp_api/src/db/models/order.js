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
    user: {
        userId: {
            type: String,
            select: false
        },
        name: String,
        email: {
            type: String,
            match: [/^(\D)+(\w)*((\.(\w)+)?)+@(\D)+(\w)*((\.(\D)+(\w)*)+)?(\.)[a-z]{2,}$/,
            'Please enter a valid email']
        }
    },
    quantity: Number,
    price: mongoose.SchemaTypes.Decimal128
},
{
    timestamps: true
});

export default mongoose.model('Order', orderSchema);
