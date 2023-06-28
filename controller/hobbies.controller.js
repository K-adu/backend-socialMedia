import { addHobbiesToDb, getHobbiesFromDb } from '../repository/hobbies.repository.js';


export const addHobbies = async (req, res) => {
    const userId = req.user._id
    try {
        const data = {
            name: req.body.name,
            description: req.body.description,
            owner: userId,
        }

        await addHobbiesToDb(data, userId)
        res.status(200).send('hobbies added success')

    } catch (e) {
        res.status(400).send('cannot add hobbies to the user')
    }

}


export const getHobbies = async (req, res) => {
    const userId = req.user._id
    try {
        const hobbies = await getHobbiesFromDb(userId)
        res.status(200).send(hobbies)
    } catch (e) {
        res.status(400).send('failed to get hobbies')
    }



}