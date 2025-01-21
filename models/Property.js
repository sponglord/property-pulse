import { Schema, model, models } from 'mongoose';

// The property schema reflects the property objects in properties.json
// (which reflects the objects in the propertypulse.properties collection in our data base)
const PropertySchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            // References the User collection.
            // Every property listing has to be connected to an owner.
            // We only want allowed people to be able to add, remove, edit properties,
            // so in order to have that authorisation we need this relationship with a User
            ref: 'User',
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        description: {
            type: String, // N.B. optional
        },
        location: {
            street: {
                type: String,
            },
            city: {
                type: String,
            },
            state: {
                type: String,
            },
            zipcode: {
                type: String,
            },
        },
        beds: {
            type: Number,
            required: true,
        },
        baths: {
            type: Number,
            required: true,
        },
        square_feet: {
            type: Number,
            required: true,
        },
        // N.B. an array of strings
        amenities: [
            {
                type: String,
            },
        ],
        rates: {
            nightly: {
                type: Number,
            },
            weekly: {
                type: Number,
            },
            monthly: {
                type: Number,
            },
        },
        seller_info: {
            name: {
                type: String,
            },
            email: {
                type: String,
            },
            phone: {
                type: String,
            },
        },
        // N.B. an array of strings
        images: [
            {
                type: String,
            },
        ],
        is_featured: {
            type: Boolean,
            default: false, // N.B. setting a default value
        },
    },
    {
        timestamps: true, // will automatically creat "created at" & "updated at" timestamps
    }
);

const Property = models.Property || model('Property', PropertySchema);

export default Property;
