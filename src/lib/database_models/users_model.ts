import mongoose, {Schema} from "mongoose";


const UserAccountSchema: Schema = new mongoose.Schema(
    {
        accountType: {type: String},
        provider: {type: String},
        providerAccountId: {type: String},
        refreshToken: {type: String},
        accessToken: {type: String},
        expires_at: {type: Number},
        token_type: {type: String},
        scope: {type: String},
        idToken: {type: String},
        session_state: {type: String}
    }
);

const UserSchema: Schema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        // lastName: { type: String },
        // username: { type: String, required: true, unique: true },
        email: {type: String, required: true, unique: true},
        emailVerifiedAt: {type: Date},   //
        isEmailVerified: {type: Boolean},
        // password: { type: String, required: true },
        profile_picture: {picture: Buffer, content_type: String},
        sex: {type: String, enum: ["male", "female"], required: true},
        phone_number: {type: String, required: true},
        role: {type: String, default: "user"},
        authProviderId: {type: String},         // TODO I think it is authProviderId
        provider: {type: String},
        providerAccountId: {type: String},
        accounts: [UserAccountSchema]
        // sessions: []
    },
    {timestamps: true}
);

const UsersModel = mongoose.models.users || mongoose.model('users', UserSchema);

export default UsersModel;
