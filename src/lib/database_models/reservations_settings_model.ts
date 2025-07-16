import mongoose, {Schema} from "mongoose";


const DayReservationsSettings: Schema = new Schema({
    start_time: {
        type: String,
        required: true,
        validate: {
            validator: function(v: string): boolean {
                return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v);
            },
            message: 'يجب أن يكون الوقت بصيغة HH:MM'
        }
    },
    end_time: {
        type: String,
        required: true,
        validate: {
            validator: function(v: string): boolean {
                return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v);
            },
            message: 'يجب أن يكون الوقت بصيغة HH:MM'
        }
    },
    shifts: [{
        start_time: {
            type: String,
            required: true,
            validate: {
                validator: function(v: string): boolean {
                    return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v);
                },
                message: 'يجب أن يكون الوقت بصيغة HH:MM'
            }
        },
        end_time: {
            type: String,
            required: true,
            validate: {
                validator: function(v: string): boolean {
                    return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v);
                },
                message: 'يجب أن يكون الوقت بصيغة HH:MM'
            }
        }
    }],
    all_day: {type: Boolean, default: false, required: true}
});

const ReservationsSettingsSchema: Schema = new Schema(
    {
        max_reservations_per_day_per_user: {type: Number, default: 1, min: 1, required: true},
        advance_reservations_days: {type: Number, default: 7, min: 0, required: true},
        sunday_reservations_settings: DayReservationsSettings,
        monday_reservations_settings: DayReservationsSettings,
        tuesday_reservations_settings: DayReservationsSettings,
        wednesday_reservations_settings: DayReservationsSettings,
        thursday_reservations_settings: DayReservationsSettings,
        friday_reservations_settings: DayReservationsSettings,
        saturday_reservations_settings: DayReservationsSettings,
        shifts: DayReservationsSettings
    },
    {timestamps: true}
);

const ReservationsSettingsModel = mongoose.models.reservations_settings || mongoose.model('reservations_settings', ReservationsSettingsSchema);

export default ReservationsSettingsModel;