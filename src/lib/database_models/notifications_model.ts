import mongoose, {Schema} from "mongoose";

const NotificationsSchema = new Schema(
    {
        user: {type : Schema.Types.ObjectId, ref : "user"},
        level: {type: String, required: true},
        message: {type: String, required: true},
        is_read: {type: Boolean, default: false},
        read_time: {type: Date},
    },
    {timestamps: true}
);

const NotificationsModel = mongoose.models.notifications || mongoose.model('notifications', NotificationsSchema);

export default NotificationsModel;