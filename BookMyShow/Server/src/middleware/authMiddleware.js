import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized access"
            });
        }

        const token = authHeader.split(" ")[1];
        if(!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized access"
            });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if(decodedToken.exp * 1000 < Date.now()) {
            return res.status(401).json({
                success: false,
                message: "Token has expired, Login again to continue"
            });
        }
        
        if(!decodedToken) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized access"
            });
        }

        if(decodedToken) {
            req.user = decodedToken;
            next();
        } 

    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Unauthorized access"
        }); 
    }
};