import { User, UserRole } from "../entities/user";
import { UserRepository } from "../repositories/userRepository";
import { PasswordUtils } from "../utils/password";

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

interface UserResponseDTO {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  created_at: Date;
}

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(data: CreateUserDTO): Promise<UserResponseDTO> {
    if (!data.name || !data.email || !data.password) {
      throw new Error("Name, email and password are required");
    }

    if (!this.isValidEmail(data.email)) {
      throw new Error("Invalid email format");
    }

    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error("Email already registered");
    }

    if (data.password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }

    const hashedPassword = await PasswordUtils.hashPassword(data.password);

    const user = await this.userRepository.create(
      data.name,
      data.email,
      hashedPassword,
      data.role || UserRole.ATTENDANT,
    );

    return this.mapToDTO(user);
  }

  async getUserById(id: string): Promise<UserResponseDTO> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return this.mapToDTO(user);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findByEmail(email);
  }

  async getAllUsers(): Promise<UserResponseDTO[]> {
    const users = await this.userRepository.findAll();
    return users.map((user) => this.mapToDTO(user));
  }

  async deleteUser(id: string): Promise<boolean> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return await this.userRepository.delete(id);
  }

  private mapToDTO(user: User): UserResponseDTO {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      created_at: user.created_at,
    };
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
