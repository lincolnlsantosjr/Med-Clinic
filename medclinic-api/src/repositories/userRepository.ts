import { Repository } from "typeorm";
import { AppDataSource } from "../database/data-source";
import { User, UserRole } from "../entities/user";

export class UserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async create(
    name: string,
    email: string,
    hashedPassword: string,
    role: UserRole = UserRole.ATTENDANT
  ): Promise<User> {
    const user = this.repository.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await this.repository.save(user);
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findOne({
      where: { email },
    });

    return user || null;
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.repository.findOne({
      where: { id },
    });

    return user || null;
  }

  async findAll(): Promise<User[]> {
    const users = await this.repository.find();
    return users;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== undefined && result.affected! > 0;
  }
}