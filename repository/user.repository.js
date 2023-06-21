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


module.exports = {
    findUserByEmail,
    createNewUser,
}