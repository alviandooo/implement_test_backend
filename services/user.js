const Role = require("../models/role");
const User = require("../models/user")
const bcrypt = require('bcrypt');

const services = {}

services.getAllUsers = async () => {
    try {
        const data = await User.findAll({
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: Role,
                    as: 'role',
                },
            ],
        });
        return data
    } catch (error) {
        throw error
    }
}

services.getByUserId = async (userId) => {
    try {
        const data = await User.findOne({
            include: [
                {
                    model: Role,
                    as: 'role',
                },
            ],
            where: {
                id: userId
            },
            raw: true,
            nest: true
        });

        return data
    } catch (error) {
        throw error
    }
}

services.deleteByUserId = async (userId) => {
    try {
        const data = await User.destroy({
            where: { id: userId },
            raw: true
        });

        return data
    } catch (error) {
        throw error
    }
}

services.updateByUserId = async (userId, data) => {
    try {
        const oldData = await User.findOne({
            where: { id: userId },
            raw: true,
        })
        if(!oldData) throw { message: 'data not found' }

        let password = data?.password ? await bcrypt.hashSync(data.password, 10) : oldData.password
        let fullName = data?.fullName ? data?.fullName : oldData.fullName

        const result = await User.update(
            { fullName, password },
            { where: { id: userId },}
        );

        return result
    } catch (error) {
        throw error
    }
}

module.exports = services