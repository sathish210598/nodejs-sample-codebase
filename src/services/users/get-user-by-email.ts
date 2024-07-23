import userModel from '@modules/users/schema';
import { IUser } from '@modules/users/model';

export const getUserDetailsByEmail = async (email: string): Promise<IUser | null> => {
  const condition = {
    email: {
      // eslint-disable-next-line no-useless-escape
      $regex: new RegExp('^' + email.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + '$', 'i'),
    },
  };
  const selection = {
    __v: 0,
  };
  const userDetails = await userModel.findOne(condition, selection);
  return userDetails;
};
