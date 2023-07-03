import {
    addHobbiesToDb,
    getHobbiesFromDb,
    getSimilarHobbiesUserRepo
} from '../repository/hobbies.repository.js';

//adding hobbies
export const addHobbies = async (req, res) => {
    try {
        const userId = req.user._id
        console.log(userId)
        const data = {
            name: req.body.name,
        }
        await addHobbiesToDb(data, userId)
        res.status(200).send('hobbies added success')
    } catch (e) {
        res.status(400).send(e)
    }

}

//getting hobbies
export const getHobbies = async (req, res) => {
    const userId = req.user._id
    try {
        const hobbies = await getHobbiesFromDb(userId)
        res.status(200).send(hobbies)
    } catch (e) {
        res.status(400).send('failed to get hobbies')
    }



}



export const getSimilarHobbiesUserController = async (req, res) => {

    const name = req.body.name
    const users = await getSimilarHobbiesUserRepo(name)
    res.send(users)
}