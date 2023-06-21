const signUpValidator= require('../handlers/joi.handler')
const {findUserByEmail,createNewUser} = require('../repository/user.repository')


const signUpController = async (req,res)=>{
    const checkFields = signUpValidator(req,res)
    const {email} = req.body.email
    const checkEmailExists = await findUserByEmail(email)
    if(checkFields){
        if(!checkEmailExists){
            await createNewUser(req,res)
        }

    }else{
        return res.status(400).send('cannot create User')
    }
}

module.exports = signUpController