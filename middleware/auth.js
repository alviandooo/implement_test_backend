const jwt = require('jsonwebtoken');
const Role = require('../models/role');
const User = require('../models/user');
const middleware = {}

middleware.authentication = (req, res, next) => {
    try {
        const { authorization = null } = req.headers
        if(authorization === null) throw { message: 'Token is required' }
        
        const dataToken = _checkToken(authorization)
        const dataUser = User.findOne({
            where: {
                id: dataToken.id,
                email: dataToken.email,
                roleId: dataToken.roleId
            }
        })

        if(!dataUser) throw { message: "invalid token provided" }

        req.userData = dataToken
        next()
    } catch (error) {
        res.status(401).json({
            message: error?.message
        })
    }
    
}

middleware.isSuperAdmin = async (req, res, next) => {
    try {
        const dataRole = await Role.findOne({
            where: { 
                id: req.userData.roleId,
                roleName: 'super_admin'
            },
            raw:true
        })

        if(!dataRole) throw { message: "access forbiden" }

        next()
    } catch (error) {
        res.status(403).json({ message: error?.message })
    }
    
}

const _checkToken = (token) => {
    return jwt.verify(token, process.env.JWT_KEY, function(err, decoded) {
        if(err) throw { 
            message: err?.message.includes('expired') ? 'token expired' : 'invalid token provided'
        }
        return decoded.data
    })
}

module.exports = middleware