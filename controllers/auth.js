const services = require("../services/index")

const controllers = {}

controllers.login = async (req, res) => {
    try {
        const { email = null ,password = null } = req?.body
        if (email === null || password === null) {
            throw {
                status: 400,
                message: 'Email dan password tidak boleh kosong!'
            }
        }

        const result = await services.auth.login(email, password)
        res.status(200).json(result)
    } catch (error) {
        return res.status(error?.status).json({
            "message": error?.message
        })
    }
}

module.exports = controllers