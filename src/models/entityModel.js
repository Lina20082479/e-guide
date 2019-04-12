import mongoose from 'mongoose';
import entitySchema from './../schema/entity';

const entityModel = mongoose.model('entity', entitySchema);

export default entityModel;