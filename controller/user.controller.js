import { findUserByEmail, createNewUser, checkExistingUser } from '../repository/user.repository.js';

import {signUpValidator} from '../handlers/joi.handler.js';


export const signUpController = async (req, res) => {
    const checkFields = signUpValidator(req, res)
    const checkEmailExists = await findUserByEmail(req)
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
    checkExistingUser(req, res)

}
