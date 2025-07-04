const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next)=>{
    const authHeader = req.headers["authorization"];

    const token = authHeader && authHeader.split(" ")[1];

    if(!token){
        
        return res.status(401).json({
            success: false,
            message: 'Access denied! Please login to continue'
        })
    }

    //decode token
    try {
        const decodedTokenInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userInfo = decodedTokenInfo;
        return next();


    } catch (e) {
        return res.status(500).json({
            success: false,
            message: 'Access denied! Please login to continue'
        })
    }

    return next();
};

module.exports = authMiddleware;