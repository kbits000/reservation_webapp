import mongoose, {Schema} from "mongoose";


const ReservationConfirmationInformation = new Schema ({
    confirmed_by: {type: Schema.Types.ObjectId, ref: "users"},
    confirmed_at: {type: Date},
    confirmation_notes: {type: String}
});

const ReservationsSchema = new Schema(
    {
        customer: {type: Schema.Types.ObjectId, ref: "user", required: true},
        date: {type: Date, required: true},
        start_time: {type: Date, required: true},
        end_time: {type: Date, required: true},
        reason: {type: String, trim: true, required: true},
        status: {type: String, required: true, default: 'pending', enum:['pending', 'rejected', 'cancelled', 'confirmed']},
        additional_information: {type: String},
        confirmation: ReservationConfirmationInformation,
        notes: {type: String},
    },
    {timestamps: true}
);

const ReservationsModel = mongoose.models.reservations || mongoose.model('reservations', ReservationsSchema);

export default ReservationsModel;