import { hash } from 'bcryptjs'
import { User } from '../../../entities/User'
import { ErrorGenerator } from '../../../lib/ErrorGenerator'
import { UserRepository } from '../../../repositories/user/UserRepository'
import { StatusCode } from '../../../types/statusCode'

export class CreateUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(user: User): Promise<User> {
    const existUser = await this.userRepository.readByEmail(user.email)
    if (existUser != null) {
      throw new ErrorGenerator('User already exists', StatusCode.BadRequest)
    }
    const passwordHash = await hash(user.password, 8)
    const createdUser = await this.userRepository.create({
      ...user,
      password: passwordHash
    })
    delete createdUser.password
    return createdUser
  }
}
