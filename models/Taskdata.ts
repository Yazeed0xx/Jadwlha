import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  address: { type: String, required: true },
  deadline: { type: Date, required: true },
  position: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  routeDetails: {
    bestTime: { type: Date },
    bestRoute: { type: String },
    distance: { type: String },
    duration: { type: String },
    day: { type: String },
  },
  departureTime: { type: Date },
  arrivalTime: { type: Date },
});

export default mongoose.models.Task || mongoose.model('Task', TaskSchema);
