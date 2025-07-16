import mongoose, {Schema} from "mongoose";


const DisallowedReservationsDatesSchema: Schema = new mongoose.Schema(
    {
        title: { type: String },
        date: { type: Date },
        start_time: {type: Date},
        end_time: {type: Date},
        is_full_day: { type: Boolean, default: true },
        reason: {type: String},
        created_by: {type: Schema.Types.ObjectId, ref : "user"}
    },
    {timestamps: true}
);

const DisallowedReservationsDatesModel = mongoose.models.disallowed_reservations_dates || mongoose.model('disallowed_reservations_dates', DisallowedReservationsDatesSchema);

export default DisallowedReservationsDatesModel;
