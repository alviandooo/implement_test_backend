const bcrypt = require('bcrypt');
const Role = require("../models/role");
const User = require("../models/user");
const generateToken = require('../helpers/generateToken');

const services = {}

services.login = async (email = null, password = null) => {
    try {
        const user = await User.findOne({ 
            include: [
                {
                    model: Role,
                    as: 'role',
                },
            ],
            where: { email },
            raw:true,
            nest:true
        });

        const checkPassword = await bcrypt.compareSync(password, user.password);
        if(!user || !checkPassword) throw { status: 400, message: 'email atau password salah, silahkan coba lagi!'}
        
        delete user.password

        const dataToken = {
            id: user.id,
            roleId: user.roleId,
            fullName: user.fullName,
            email: user.email,
        }

        const token = generateToken(dataToken)

        return {
            data: token,
            message: 'Berhasil login.'
        }
    } catch (error) {
        throw error
    }
}

module.exports = services