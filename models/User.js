import { Schema, model, models } from 'mongoose';

// Users are logging in via Google, so we want to store user data.
// So here we describe how that stored data will look
const UserSchem = new Schema(
    {
        email: {
            type: String,
            unique: [true, 'Email already exists'],
            required: [true, 'Email is required'],
        },
        username: {
            type: String,
            required: [true, 'Username is required'],
        },
        image: {
            type: String,
        },
        bookmarks: [
            {
                type: Schema.Types.ObjectId, // property _id's from the DB
                ref: 'Property', // the collection we're getting the ids from
            },
        ],
    },
    {
        timestamps: true, // will automatically creat "created at" & "updated at" timestamps
    }
);

const User = models.user || model('User', UserSchema);

export default User;
