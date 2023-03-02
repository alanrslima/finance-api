// import { StatusCodes } from 'http-status-codes'
// import { ErrorGenerator } from '../../../lib/ErrorGenerator'
import { UserRepository } from '../../../repositories/user/UserRepository'

export class DeleteUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<boolean> {
    // const deleted = await this.userRepository.delete({ where: { id } })
    // if (!deleted) {
    //   throw new ErrorGenerator('User not exists', StatusCodes.BAD_REQUEST)
    // }
    // return deleted
    return true
  }
}
