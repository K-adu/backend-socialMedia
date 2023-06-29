import {
    findUserByEmail,
    createNewUser,
    checkMatchingEmailPassword,
    removeTokenFromDb,
    getUserDetailsDb
} from '../repository/user.repository.js'

import { signUpValidator } from '../handlers/joi.handler.js'


export const signUpController = async (req, res) => {
    const data = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age,
        address: req.body.address,
        location: req.body.location
    }
    console.log(data.password)
    const checkFields = signUpValidator(req, res)

    const checkEmailExists = await findUserByEmail(data.email)
    if (checkFields) {
        if (checkEmailExists) {
            return res.status(400).send('Email already Exist')
        } else {
            const userCreated = await createNewUser(data)
            res.status(200).send(userCreated)
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
    const loginStatus = await checkMatchingEmailPassword(data)
    if (loginStatus) {
        res.status(200).send('loggin success')
    } else {
        res.status(400).send('login failed')
    }

}


export const logoutController = async (req, res) => {
    const userId = req.user.id
    await removeTokenFromDb(userId).then(() => {
        res.status(200).send('logout success')
    }).catch((e) => {
        res.status(400).send('loffingout failed')
    })
}

export const authUserDetailsController = async (req, res) => {
    const userId = req.user.id
    const userDetails =  await getUserDetailsDb(userId)
    res.status(200).send(userDetails)
}