import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  value: { type: Number, required: true },
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
