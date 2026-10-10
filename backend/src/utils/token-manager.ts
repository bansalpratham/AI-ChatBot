import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";

export const createToken = (
    id: string,
    email: string,
    expiresIn: string
) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is missing in .env");
    }

    return jwt.sign(
        { id, email },
        process.env.JWT_SECRET,
        { expiresIn } as jwt.SignOptions
    );
};

export const verifyToToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.signedCookies?.[COOKIE_NAME];

    if (typeof token !== "string" || !token.trim()) {
        return res.status(401).json({
            message: "Authentication token not received",
        });
    }

    if (!process.env.JWT_SECRET) {
        return res.status(500).json({
            message: "JWT_SECRET is missing",
        });
    }

    jwt.verify(
        token,
        process.env.JWT_SECRET,
        (error, decoded) => {
            if (error) {
                return res.status(401).json({
                    message: "Invalid or expired authentication token",
                });
            }

            if (
                !decoded ||
                typeof decoded === "string" ||
                typeof decoded.id !== "string"
            ) {
                return res.status(401).json({
                    message: "Invalid token payload",
                });
            }

            res.locals.jwtData = decoded;
            next();
        }
    );
};
