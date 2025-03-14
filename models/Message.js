import { Schema, model, models } from 'mongoose';

const MessageSchema = new Schema(
	// object id fields related to other tables
	{
		// the sender of the message
		sender: {
			type: Schema.Types.ObjectId,
			ref: 'User', // ref to another type of Model
			required: true,
		},
		// the recipient of the message, the property owner
		recipient: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		// the property that the message is about
		property: {
			type: Schema.Types.ObjectId,
			ref: 'Property', // ref to another type of Model
			required: true,
		},
		// Match to the fields inside the PropertyContactForm
		name: {
			type: String, // could pre-populate with the name from the sender, but we want to offer freedom to send a message using any name
			required: [true, 'Name is required'],
		},
		email: {
			type: String,
			required: [true, 'Email is required'],
		},
		phone: {
			type: String,
		},
		body: {
			type: String,
		},
		// Add this to allow us to mark/unmark messages as read
		read: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true, // will automatically creat "created at" & "updated at" timestamps
	}
);

const Message = models.Message || model('Message', MessageSchema);

export default Message;
