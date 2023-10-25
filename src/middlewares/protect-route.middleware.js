const protectedRoute = (req, res, next) => {
    const token = req.cookies['authToken']
    if (!token) {
        res.redirect('/login');
    } else {
        next();
    };
}

module.exports = protectedRoute;