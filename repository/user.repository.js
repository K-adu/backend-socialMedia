import User from '../models/user.models.js';



export const createNewUser = async (req, res) => {
  const newUser = new User({
    fullName: req.body.fullName,
    email: req.body.email,
    password: req.body.password,
    age: req.body.age,
    address: req.body.address,
    location: req.body.location
  });



  newUser.password = await newUser.hashpassword(req.body.password);

  await User.create(newUser).then(() => {
    return res.render('login')
  });

};


export const findUserByEmail = async (req) => {
  const { email } = req.body
  const findEmail = await User.findOne({ email: email })
  return findEmail
}

export const checkExistingUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email: email })
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

