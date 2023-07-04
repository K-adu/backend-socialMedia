import Hobbies from '../models/hobbies.models.js'
import User from '../models/user.models.js'



const findHobbiesExist = async (hobbiesName) => {
  console.log(hobbiesName)
  const hobbies = await Hobbies.findOne({ name: hobbiesName })
  if (hobbies === undefined) {
    return false
  } else {
    return hobbies
  }
}


export const addHobbiesToDb = async (data, userId) => {
  const findHobbies = await findHobbiesExist(data.name)
  if (findHobbies) {
    console.log('reached till here')
    await User.findOneAndUpdate({ _id: userId }, {
      $push: { hobbies: findHobbies._id }
    })
  } else {

    const newHobbies = new Hobbies(data)
    await newHobbies.save()
    await User.findOneAndUpdate({ _id: userId }, {
      $push: { hobbies: newHobbies._id }
    })
  }
}


export const getHobbiesFromDb = async (userId) => {
  const hobbies = await User.aggregate([
    {
      $match: {
        _id: userId,
      }
    },
    {
      $lookup: {
        from: 'hobbies',
        localField: 'hobbies',
        foreignField: '_id',
        as: 'userHobbies',
      },
    },
    // {
    //   $unwind: '$userHobbies'
    // },
    {
      $project: {
        // fullName: 1,
        'userHobbies.name': 1,
        // email: 1,

      }
    },

  ])
  return hobbies
}


export const getSimilarHobbiesUserRepo = async (hobbiesId) => {
  console.log(hobbiesId)
  const hobbies = await Hobbies.find({ _id: hobbiesId }).select('_id');
  console.log(hobbies)
  const hobbyIds = hobbies.map(hobby => hobby._id);
  const users = await User.aggregate([
    {
      $match: {
        hobbies: { $in: hobbyIds }
      }
    },
    {
      $project: {
        fullName: 1,
        email: 1
      }
    }
  ]);

  // console.log(users);
  return users

}


export const getUserandHobbiesRepository = async (age) => {
  const ageValue = age
  console.log(age)
  const userDetails = await User.aggregate([
    {
      $match: {
        age: { $lt: 50 },
        status: false,
        hobbies: { $exists: true, $ne: [] }
      }
    },
    {
      $lookup: {
        from: 'hobbies',
        localField: 'hobbies',
        foreignField: '_id',
        as: 'hobbiesDetails'
      }
    },
    {
      $project: {
        _id: 0,
        fullName: 1,
        email: 1,
        posts: 1,
        address: 1,
        name: 1,
        age: 1,
        hobbies: '$hobbiesDetails',
      }
    }
  ])
  return userDetails
  

}