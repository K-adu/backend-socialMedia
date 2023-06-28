import Hobbies from '../models/hobbies.models.js'

export const addHobbiesToDb = async (data, userId) => { // Access the hobby details from the request body

  const newHobbies = new Hobbies(data);

  await newHobbies.save()
}

export const getHobbiesFromDb = async (userId) => {
  const hobbies = await Hobbies.find({ owner: userId })
  return hobbies
}
