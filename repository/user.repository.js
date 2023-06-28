import User from '../models/user.models.js';


//creating new user and hasigin password before inserting it to the db
export const createNewUser = async (data) => {
  const newUser = new User(data);

  newUser.password = await newUser.hashpassword(data.password);
  const userCreated = await User.create(newUser)
  return userCreated
};



export const findUserByEmail = async (data) => {
  const findEmail = await User.findOne({ email: data })
  return findEmail
}

export const checkMatchingEmailPassword = async (data) => {
  const userFound = await findUserByEmail(data.email)
  if (userFound) {
    const isMatch = await userFound.matchPassword(data.password);
    if (isMatch) {
      const token = await userFound.generateAuthToken()
      return true
    } else {
      return false
    }
  }

}

