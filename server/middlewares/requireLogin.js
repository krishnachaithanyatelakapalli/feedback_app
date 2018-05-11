module.exports = (req, res, next) => {
    if (!req.user) {
        console.log('[Login Error]');
        return res.status(401).send({error: 'You must log in'});
    }
    next();
};