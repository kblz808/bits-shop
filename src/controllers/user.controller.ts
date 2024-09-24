import { Context } from 'hono';
import { UserModel, IUser  } from '../models/user.model';
import { generateToken, generateHash, compareHash} from '../utils/jwt.utils';

export const createUser = async (c: Context) => {
  try {
    const userData: IUser = await c.req.json() as IUser;

    const {username, email, password} = userData;

    const existingUser = await UserModel.findOne({ $or: [{username}, {email}]});
    if (existingUser) {
      return c.json({error: 'username or email already exists'})
    }

    const hashedPassword = await generateHash(password);
    
    const user = new UserModel({
      ...userData,
      password: hashedPassword
    });

    await user.save();

    const token = generateToken(user._id!.toString());

    return c.json({user, token}, 201);
    
  } catch (error) {
    console.log(error)
    return c.json({error: 'Failed to create user'}, 500);
  }
};

export const loginUser = async (c: Context) => {
  try {
    const {username, password} = await c.req.json();

    const user = await UserModel.findOne({username});

    if(!user){
      return c.json({error: 'invalid credentials'}, 401)
    }

    const isValidPassword = compareHash(password, user.password);
    if (!isValidPassword) {
      return c.json({error: 'invalid credentials'}, 401);
    }

    const token = generateToken(user._id!.toString());

    return c.json({user, token})
  } catch (error) {
    console.log(error)
    return c.json({error: 'Failed to login'}, 500)
  }
}
