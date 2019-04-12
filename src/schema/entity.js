import mongoose from 'mongoose';
import autoIncrement from "mongoose-auto-increment";

const entitySchema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: true
        },
        editor: {
          type: Number, ref: 'users'
        },
        object: { type: Object },
    }
);

entitySchema.plugin(autoIncrement.plugin, 'id');

export default entitySchema;
