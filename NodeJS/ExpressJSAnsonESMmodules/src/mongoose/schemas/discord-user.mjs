import mongoose from 'mongoose';

//create a mongoose schema for the user model
const DiscordUserSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    discordId: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    }
});

//create a mongoose model for the user schema and export it for use in other parts of the application
export const DiscordUser = mongoose.model('DiscordUser', DiscordUserSchema);