import mongoose from 'mongoose';
import userModel from '@modules/users/schema';
import { IUser } from '@modules/users/model';

export const getUserDetailsById = async (id: string): Promise<IUser | null> => {
  const condition = {
    _id: mongoose.Types.ObjectId(id),
  };
  const selection = {
    _id: 1,
    name: 1,
    email: 1,
  };
  const userDetails = await userModel.findOne(condition, selection);
  return userDetails;
};
