import mongoose, {Schema} from "mongoose";

const TimeSchema: Schema = new mongoose.Schema(
  {
      // year: { type: String, required: true},
      // month: { type: String, required: true},
      // day: { type: String, required: true},
      hour: { type: String, required: true},
      minutes: { type: String, required: true}
  }
);

const DateSchema: Schema = new mongoose.Schema({
    year: { type: String, required: true},
    month: { type: String, required: true},
    day: { type: String, required: true}
});

const AllowedReservationsSchema: Schema = new mongoose.Schema(
    {
        date: DateSchema,
        start_time: TimeSchema,
        end_time: TimeSchema,
        status: {type: String, required: true, default: "open"},
    },
    {timestamps: true}
);

const AllowedReservationsModel = mongoose.models.allowed_reservations || mongoose.model('allowed_reservations', AllowedReservationsSchema);

export default AllowedReservationsModel;
