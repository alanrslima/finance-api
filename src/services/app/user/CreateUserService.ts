import { hash } from 'bcryptjs'
import { StatusCodes } from 'http-status-codes'
import { User } from '../../../entities/User'
import { ErrorGenerator } from '../../../lib/ErrorGenerator'
import { UserRepository } from '../../../repositories/user/UserRepository'

export class CreateUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(user: User): Promise<User> {
    const existUser = await this.userRepository.read({
      where: { email: user.email }
    })
    if (existUser != null) {
      throw new ErrorGenerator('User already exists', StatusCodes.BAD_REQUEST)
    }
    const passwordHash = await hash(user.password, 8)
    const createdUser = await this.userRepository.create({
      ...user,
      password: passwordHash
    })
    return createdUser as User
  }
}
