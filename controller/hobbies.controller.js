const {addHobbiesToDb, getHobbiesFromDb} = require('../repository/hobbies.repository')

const addHobbies = async (req,res)=>{
    try{
        const userId = req.user._id
        const addUserHobbies = await addHobbiesToDb(req.body, userId)
        res.status(400).send('hobbies added success')

    }catch(e){
        res.status(400).send('cannot add hobbies to the user')
    }

}


const getHobbies = async (req,res)=>{
    const userId = req.user._id
    try{
        const hobbies =await getHobbiesFromDb(userId)
        res.status(200).send(hobbies)
    }catch(e){
        res.status(400).send('failed to get hobbies')
    }
    
    

}

module.exports = {
    addHobbies,
    getHobbies,
}