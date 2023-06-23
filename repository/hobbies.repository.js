const Hobbies = require('../models/hobbies.models');

const addHobbiesToDb = async (req, userId) => {
  const { name, description } = req; // Access the hobby details from the request body

  const newHobbies = new Hobbies({
    name: name,
    description: description,
    owner: userId,
  });

  await newHobbies.save()
}

const getHobbiesFromDb = async (userId)=>{
    const hobbies = await Hobbies.find({owner: userId})
    return hobbies
}

module.exports = {
  addHobbiesToDb,
  getHobbiesFromDb,
}
