const signUpValidator= require('../handlers/joi.handler')
const {findUserByEmail,createNewUser,checkExistingUser} = require('../repository/user.repository')


const signUpController = async (req,res)=>{
    const checkFields = signUpValidator(req,res)
    const checkEmailExists = await findUserByEmail(req)
    if(checkFields){
        if(checkEmailExists){
            return res.status(400).send('Email already Exist')
        }else{
            await createNewUser(req,res)
        }

    }else{
        return res.status(400).send('cannot create User')
    }
}


 
const loginController = async (req,res)=>{
    checkExistingUser(req,res)

}

module.exports = {
    signUpController,
    loginController,
}