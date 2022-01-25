const { roles } = require('./roles')
exports.grantAccess = function(action, resource) {
    return async (req, res, next) => {
        try {
            const permission = roles.can(req.user.user.role)[action](resource);
            if (!permission.granted) {
                return res.status(401).json({message:"error", data: "You don't have enough permission to perform this action"});
            }
            next()
        } catch (error) {
            next(error)
        }
    }
}