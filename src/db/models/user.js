import mongoose, { mongo } from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'Please add a date']
    },
    phone: String,
    address: {
        type: String,
        required: [true, 'Please enter a valid address']
    },
    email: {
        type: String,
        match: [/^(\D)+(\w)*((\.(\w)+)?)+@(\D)+(\w)*((\.(\D)+(\w)*)+)?(\.)[a-z]{2,}$/, 
        'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: 8,
        select: false
    },
},
{
    timestamps: true
});

export default userModel = mongoose.model('User', userSchema);
