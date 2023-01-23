import { User } from '../../../entities/User'
import { UserRepository } from '../../../repositories/user/UserRepository'

export class GetUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(params: { id?: string; email?: string }): Promise<User | null> {
    if (params.id !== null || params.id !== undefined) {
      return await this.userRepository.read({ where: { id: params.id } })
    }
    return await this.userRepository.read({ where: { email: params.email } })
  }
}
