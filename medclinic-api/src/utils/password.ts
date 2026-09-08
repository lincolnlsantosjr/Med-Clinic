import bcrypt from "bcrypt";

const SALT_ROUNDS: number = 10;

export class PasswordUtils {
  static async hashPassword(password: string): Promise<string> {
    const hashedPassword: string = await bcrypt.hash(password, SALT_ROUNDS);
    return hashedPassword;
  }

  static async comparePassword(
    password: string,
    hash: string
  ): Promise<boolean> {
    const isPasswordValid: boolean = await bcrypt.compare(password, hash);
    return isPasswordValid;
  }
}