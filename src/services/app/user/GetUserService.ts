import { User } from '../../../entities/User'
import { UserRepository } from '../../../repositories/user/UserRepository'

export class GetUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<User | null> {
    return await this.userRepository.readById(id)
  }
}
