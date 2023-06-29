import {
    addHobbiesToDb,
    getHobbiesFromDb,
    updateHobbiesInDb
} from '../repository/hobbies.repository.js';

//adding hobbies
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
//updating hobbies for the respectiuve user
export const updateHobbiesController = async (req, res) => {
    const userId = req.user._id
    const hobbiesId = req.params.id
    const data = {
        name: req.body.name,
        userId: userId,
        hobbiesId: hobbiesId
    }
    await updateHobbiesInDb(data)
    res.status(200).send('hobbies updated success')
}