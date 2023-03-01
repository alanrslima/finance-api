import { FindOneOptions } from 'typeorm'
import { BaseEntity } from '../../../entities/BaseEntity'
import { User } from '../../../entities/User'
import { UserRepository } from '../../../repositories/user/UserRepository'

export class GetUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    options: FindOneOptions<User & BaseEntity>
  ): Promise<User | null> {
    return await this.userRepository.read(options)
  }
}
