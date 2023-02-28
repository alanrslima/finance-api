import { StatusCodes } from 'http-status-codes'
import { User } from '../../../entities/User'
import { ErrorGenerator } from '../../../lib/ErrorGenerator'
import { UserRepository } from '../../../repositories/user/UserRepository'
import { GetUserService } from './GetUserService'

export class EditUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    id: string,
    { email, firstName, lastName, phone, profile }: User
  ): Promise<User> {
    const getUserService = new GetUserService(this.userRepository)
    const existUser = await getUserService.execute({ id })
    if (existUser == null) {
      throw new ErrorGenerator('User not exists', StatusCodes.BAD_REQUEST)
    }
    return await this.userRepository.update({
      ...existUser,
      email,
      firstName,
      lastName,
      phone,
      profile
    })
  }
}
