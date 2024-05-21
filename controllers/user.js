const services = require("../services/index")

const controllers = {}

controllers.getAll = async (req, res) => {
    try {
        const dataUsers = await services.user.getAllUsers()
        if(!dataUsers) throw { status: 400, message: "data not found"}

        res.status(200).json(dataUsers)
    } catch (error) {
        return res.status(error?.status || 500).json({
            "message": error?.message || "Internal Server Error" 
        })
    }
}

controllers.getById = async (req, res) => {
    try {
        const { id } = req.params
        const dataUsers = await services.user.getByUserId(id)
        if(!dataUsers) throw { status: 400, message: "data not found"}

        delete dataUsers.password
        res.status(200).json(dataUsers)
    } catch (error) {
        return res.status(error?.status || 500).json({
            "message": error?.message || "Internal Server Error" 
        })
    }
}

controllers.deleteById = async (req, res) => {
    try {
        const { id = null } = req?.body
        const dataUsers = await services.user.deleteByUserId(id)
        if(!dataUsers) throw { status: 400, message: "failed delete data" }
        
        res.status(200).json(dataUsers)
    } catch (error) {
        return res.status(error?.status || 500).json({
            "message": error?.message || "Internal Server Error" 
        })
    }
}

controllers.updateById = async (req, res) => {
    try {
        const { id } = req?.params
        const dataUsers = await services.user.updateByUserId(id, req?.body || null)
        if(!dataUsers) throw { status: 400, message: "failed update data"}
        
        if(dataUsers != true) throw { message: 'failed update data' }

        res.status(200).json({ message: 'Data is successfully updated'})
    } catch (error) {
        return res.status(error?.status || 500).json({
            "message": error?.message || "Internal Server Error" 
        })
    }
}

module.exports = controllers