import { ErrorGenerator } from '../../../lib/ErrorGenerator'
import { UserRepository } from '../../../repositories/user/UserRepository'
import { StatusCode } from '../../../types/statusCode'

export class DeleteUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string) {
    const deleted = await this.userRepository.delete(id)
    if (!deleted) {
      throw new ErrorGenerator('User not exists', StatusCode.BadRequest)
    }
    return deleted
  }
}
