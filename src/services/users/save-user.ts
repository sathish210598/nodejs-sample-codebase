import userModel from '@modules/users/schema';
import { ICreateUserRequest, IUser } from '@modules/users/model';
/**
 * Save new user into db
 * @param userDetails
 */
export const saveUser = async (userDetails: ICreateUserRequest): Promise<IUser> => {
  const newUser: IUser = new userModel({
    name: {
      first: userDetails.firstName,
      last: userDetails.lastName,
    },
    email: userDetails.email,
    password: userDetails.password,
  });

  await newUser.save();
  return newUser;
};
