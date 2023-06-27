import { findUserByEmail, createNewUser, checkMatchingEmailPassword } from '../repository/user.repository.js';

import {signUpValidator} from '../handlers/joi.handler.js';


export const signUpController = async (req, res) => {
    data ={
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age,
        address: req.body.address,
        location: req.body.location
    }
    const checkFields = signUpValidator(req, res)

    const checkEmailExists = await findUserByEmail(data.email)
    if (checkFields) {
        if (checkEmailExists) {
            return res.status(400).send('Email already Exist')
        } else {
            await createNewUser(req, res)
        }

    } else {
        return res.status(400).send('cannot create User')
    }
}



export const loginController = async (req, res) => {
    const data = {
        email: req.body.email,
        password: req.body.password
    }
    checkMatchingEmailPassword(data)

}
