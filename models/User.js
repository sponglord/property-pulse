import { Schema, model, models } from 'mongoose';

// Users are logging in via Google, so we want to store user data.
// So here we describe how that stored data will look
const UserSchema = new Schema(
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
				type: Schema.Types.ObjectId, // property _id from the DB
				// References the Property collection which is we're getting the ids from
				// Every User's bookmark should be related to a particular property
				ref: 'Property',
			},
		],
	},
	{
		timestamps: true, // will automatically create "created at" & "updated at" timestamps
	}
);

const User = models.User || model('User', UserSchema);

export default User;
