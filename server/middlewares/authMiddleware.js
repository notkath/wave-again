const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1];

        if(!token){
            return res.status(401).json({ message: 'No token provided, authorization denied' });
        }
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode; // Attach user info to request object
            console.log("The decoded token is: ", decode);
            next();
        }catch(err){
            res.status(401).json({ message: 'Token is not valid' });
        }
    }else{
        return res.status(401).json({ message: 'Authorization header is missing or malformed' });
    }
};

module.exports = verifyToken;