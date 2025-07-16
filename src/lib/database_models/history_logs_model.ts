import mongoose, {Schema} from "mongoose";


const HistoryLogsSchema: Schema = new mongoose.Schema(
    {
        message: { type: String, required: true},
    },
    {timestamps: true}
);


const HistoryLogsModel = mongoose.models.history_logs || mongoose.model('history_logs', HistoryLogsSchema);

export default HistoryLogsModel;