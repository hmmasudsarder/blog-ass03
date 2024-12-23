/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { TUser, UserModel } from './user.interface';
import config from '../../config';

const userSchema = new Schema<TUser, UserModel>(
    {

        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true },
        password: { type: String, required: true },
        role: { type: String, enum: ['admin', 'user'], default: 'user' },
        isBlocked: { type: Boolean, default: false },
        isDeleted: { type: Boolean, default: false },
        passwordChangedAt: { type: Date },
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    const user = this; 
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds),
    );
    next();
});

// set '' after saving password
userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});

userSchema.statics.isUserExistsById = async function (_id: string) {
    return await User.findOne({ _id }).select('+password');
};

userSchema.statics.isPasswordMatched = async function (
    plainTextPassword,
    hashedPassword,
) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
};



export const User = model<TUser, UserModel>('User', userSchema);