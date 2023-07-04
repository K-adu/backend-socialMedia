import User from '../models/user.models.js';
import bcrypt from 'bcrypt';


export const signUpJunks = async (request, response, next) => {
  try {
    const users = [];
    for (let i = 1; i < 500; i++) {
      const randomLocations = locations[randomNumbers(0, 2)];
      const dummyPassword = await bcrypt.hash(`password`, 8);
      const user = {
        fullName: `dummyUser-${i}`,
        email: `dummyUser-${i}@ebpearls.com`,
        password: dummyPassword,
        age: randomNumbers(10, 100),
        status: i % 2 === 0,
        location: randomLocations.location,
        address: randomLocations.address,
      };
      users.push(user);
    }
    await User.insertMany(users);
    response.status(200).send('success');
  } catch (error) {
    console.log(error);
    response.status(422).send(error);
  }
};

const randomNumbers = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const locations = [
    {
      address: [
        {
          city: 'Ebpearls',
          state: null,
          country: null,
        },
      ],
      location: {
        coordinates: [85.31515719841762, 27.68717858656056],
      },
    },
    {
      address: [
        {
          city: 'Balkumari',
          state: null,
          country: null,
        },
      ],
      location: {
        coordinates: [85.3421, 27.6734],
      },
    },
    {
      address: [
        {
          city: 'Thimi',
          state: null,
          country: null,
        },
      ],
      location: {
        coordinates: [85.38011, 27.67363],
      },
    },
    {
      address: [
        {
          city: 'Bajra yogini',
          state: null,
          country: null,
        },
      ],
      location: {
        coordinates: [85.46759190426204, 27.74444155165114],
      },
    },
  ];
  