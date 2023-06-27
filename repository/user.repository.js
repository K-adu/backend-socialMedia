import User from '../models/user.models.js';


//creating new user and hasigin password before inserting it to the db
export const createNewUser = async (data) => {
  const newUser = new User(date);
  newUser.password = await newUser.hashpassword(data.password);
  await User.create(newUser).then(() => {
    return res.render('login')
  });

};



export const findUserByEmail = async (data) => {
  const findEmail = await User.findOne({ email: data })
  return findEmail
}

export const checkMatchingEmailPassword = async (data) => {
  
  try {
    const userFound = await User.findOne({ email: data.email })
    console.log(password)
    if (userFound) {
      const isMatch = await userFound.matchPassword(password);
      console.log(isMatch)
      if (isMatch) {
        const token = await userFound.generateAuthToken()
        res.render('home', { token: token })
      } else {
        res.send({ message: 'Invalid login details' });
      }
    } else {
      res.send({ message: 'User not found' });
    }
  } catch (e) {
    console.log(e)
  }
};

