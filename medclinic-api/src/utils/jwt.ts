import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { StringValue } from "ms";

dotenv.config();

interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

interface DecodedToken extends JwtPayload {
  iat: number;
  exp: number;
}

export class JwtUtils {
  private static readonly secret: string = process.env.JWT_SECRET || "";

  private static readonly expiresIn: StringValue =
    (process.env.JWT_EXPIRATION as StringValue) || "8h";

  static generateToken(payload: JwtPayload): string {
    if (!this.secret) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign(payload, this.secret, {
      expiresIn: this.expiresIn,
    });

    return token;
  }

  static verifyToken(token: string): DecodedToken {
    if (!this.secret) {
      throw new Error("JWT_SECRET is not defined");
    }

    try {
      const decoded = jwt.verify(token, this.secret) as DecodedToken;
      return decoded;
    } catch (error) {
      throw new Error("Invalid or expired token");
    }
  }

  static decodeToken(token: string): DecodedToken | null {
    try {
      const decoded = jwt.decode(token) as DecodedToken;
      return decoded;
    } catch (error) {
      return null;
    }
  }
}