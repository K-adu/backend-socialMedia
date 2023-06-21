const User = require('../models/user.models')


const createNewUser = async (req, res) => {
    const newUser = new User({
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
      age: req.body.age,
      address: req.body.address,
      location: req.body.location
    });

    await User.create(newUser).then(()=>{
        return res.status(400).send('user created successfully')
    });
  };
  

const findUserByEmail = async (email)=>{
    const findEmail = await User.findOne({email: email})
    return findEmail
}

const checkExistingUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({email: email})

    if (userFound) {
      const isMatch = await userFound.matchPassword(password);
      if (isMatch) {
        // token = await userFound.generateAuthToken()
        // return token
        res.send({message: 'login working properly'});
      } else {
        res.send({message: 'Invalid login details'});
      }
    } else {
      res.send({message: 'User not found'});
    }
  } catch (e) {
    console.log(e)
  }
};




module.exports = {
    findUserByEmail,
    createNewUser,
    checkExistingUser
}