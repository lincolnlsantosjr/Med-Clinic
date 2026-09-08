import { User } from "../entities/user";
import { UserService } from "./userService";
import { PasswordUtils } from "../utils/password";
import { JwtUtils } from "../utils/jwt";

interface LoginDTO {
  email: string;
  password: string;
}

interface LoginResponseDTO {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export class AuthService {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async login(data: LoginDTO): Promise<LoginResponseDTO> {
    if (!data.email || !data.password) {
      throw new Error("Email and password are required");
    }

    const user: User | null = await this.userService.getUserByEmail(
      data.email
    );

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid: boolean = await PasswordUtils.comparePassword(
      data.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const token: string = JwtUtils.generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}