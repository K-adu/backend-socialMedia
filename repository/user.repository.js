import User from '../models/user.models.js';
import { conn } from '.././dbconn.js'
import { dummyEmail } from '../handlers/email.handler.js'


//creating new user and hasigin password before inserting it to the db
export const createNewUser = async (data) => {
  const session = await conn.startSession();
  try {
    await session.startTransaction();

    const newUser = new User(data);
    newUser.password = await newUser.hashpassword(data.password);

    const userCreated = await User.create(newUser, { session });

    const emailSuccess =  dummyEmail();

    if (emailSuccess) {
      await session.commitTransaction();
    } else {
      await session.abortTransaction();
    }

    return userCreated;
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
  } finally {
    session.endSession();
  }
};



//finding checking if the email exists or not
export const findUserByEmail = async (data) => {
  const findEmail = await User.findOne({ email: data })
  return findEmail
}


//checking password if the email exists and generating token
export const checkMatchingEmailPassword = async (data) => {
  const userFound = await findUserByEmail(data.email)
  if (userFound) {
    const isMatch = await userFound.matchPassword(data.password)
    if (isMatch) {
      await userFound.generateAuthToken()
      return true
    } else {
      return false
    }
  }

}

//removing all tokens from the database causing the user to logout
export const removeTokenFromDb = async (userId) => {
  await User.findOneAndUpdate({ _id: userId }, {
    $set: {
      tokens: []
    }
  })
}

//getting details of the loggedin user
export const getUserDetailsDb = async (userId) => {
  try {
    const userDetails = await User.find({ _id: userId },
      {
        password: 0,
        tokens: 0,
        _id: 0,
        posts: 0,

      })
    return userDetails
  } catch (e) {
    console.log(e)
    throw e
  }
}

// getting nearest users to the provided location the 1/smth is radius value is  radian 
export const getNearestUserRepository = async (locationData) => {
  const userDetails = User.aggregate([{
    $match: {
      $and: [
        {
          location: {
            $geoWithin: {
              $centerSphere: [
                [
                  locationData.longitude,
                  locationData.latitude
                ],
                1 / 3963.2,
              ],
            },
          },
        },

      ],
    },
  }])
  return userDetails
}