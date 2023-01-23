import { StatusCodes } from 'http-status-codes'
import { User } from '../../../entities/User'
import { ErrorGenerator } from '../../../lib/ErrorGenerator'
import { InMemoryUserRepository } from '../../../repositories/user/InMemoryUserRepository'
import { CreateUserService } from './CreateUserService'

describe('Create user service', () => {
  it('Should throw an error if exists the same user email', async () => {
    const userRepository = new InMemoryUserRepository()
    const createUserService = new CreateUserService(userRepository)

    const user = new User()
    user.email = 'johndoe@email.com'
    user.password = '12345678'
    user.firstName = 'John'
    user.lastName = 'Doe'

    await createUserService.execute(user)

    const user2 = new User()
    user2.email = 'johndoe@email.com'
    user2.password = '12345678'
    user2.firstName = 'John'
    user2.lastName = 'Doe'

    try {
      await createUserService.execute(user2)
    } catch (error) {
      expect(error).toBeInstanceOf(ErrorGenerator)
      expect(error).toHaveProperty('message', 'User already exists')
      expect(error).toHaveProperty('statusCode', StatusCodes.BAD_REQUEST)
    }
  })

  it('Should create a new user', async () => {
    const userRepository = new InMemoryUserRepository()
    const createUserService = new CreateUserService(userRepository)

    const user = new User()
    user.email = 'johndoe@email.com'
    user.password = '12345678'
    user.firstName = 'John'
    user.lastName = 'Doe'

    const createdUser = await createUserService.execute(user)
    expect(createdUser).toHaveProperty('email', 'johndoe@email.com')
    expect(createdUser).toHaveProperty('firstName', 'John')
  })
})
