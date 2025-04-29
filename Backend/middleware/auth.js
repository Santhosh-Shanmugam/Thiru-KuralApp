import jwt from 'jsonwebtoken';
import config from '../config/server.js';

const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ 
            status: 'error',
            message: "Access Denied: No token provided" 
        });
    }

    try {
        const verified = jwt.verify(
            token.replace("Bearer ", ""), 
            config.jwtSecret
        );
        req.user = verified;
        next();
    } catch (err) {
        return res.status(401).json({ 
            status: 'error',
            message: "Invalid or expired token",
            error: err.name
        });
    }
};

export default verifyToken;