import Joi from 'joi'

export const signUpValidator = async (req, res) => {

    try {
        const { name, email, password } = req.body
        const schema = Joi.object({
            email: Joi.string().email().required(),
            name: Joi.string().required(),
            password: Joi.string().min(6).required(),
        });

        await schema.validate(data);
        return true

    } catch (e) {
        return false
    }

};

