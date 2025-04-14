const authorizationRole = (...allowroles) => {
    return (req, res, next) => {
        if (!allowroles.includes(req.user.adminRole)) {
            return res.status(403).json({ message: "You are not authorized to access this route" });
        }
        next();
    };
};

export default authorizationRole;
