import mongoose from 'mongoose';

//create a mongoose schema for the user model
const UserSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    displayName: mongoose.Schema.Types.String,
    password: {
        type: mongoose.Schema.Types.String,
        required: true
    }
});

//create a mongoose model for the user schema and export it for use in other parts of the application
export const User = mongoose.model('User', UserSchema);