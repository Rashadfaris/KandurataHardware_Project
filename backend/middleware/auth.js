import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer token"

    if (!token) {
        return res.status(401).json({ success: false, message: "Not Authorized, please log in again" });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = decodedToken.id;
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        res.status(403).json({ success: false, message: "Invalid token" });
    }
};

export default authMiddleware;
