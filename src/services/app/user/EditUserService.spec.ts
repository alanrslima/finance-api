import { StatusCodes } from 'http-status-codes'
import { User } from '../../../entities/User'
import { ErrorGenerator } from '../../../lib/ErrorGenerator'
import { InMemoryUserRepository } from '../../../repositories/user/InMemoryUserRepository'
import { EditUserService } from './EditUserService'

describe('Edit user service', () => {
  it('Should throw an error if user dont exists', async () => {
    const userRepository = new InMemoryUserRepository()
    const editUserService = new EditUserService(userRepository)
    const userId = '1234'
    const user = new User()
    user.email = 'johndoe@email.com'
    user.firstName = 'John Doe'
    try {
      await editUserService.execute(userId, user)
    } catch (error) {
      expect(error).toBeInstanceOf(ErrorGenerator)
      expect(error).toHaveProperty('message', 'User not exists')
      expect(error).toHaveProperty('statusCode', StatusCodes.BAD_REQUEST)
    }
  })
  it('Should edit user if user exists', async () => {
    const userRepository = new InMemoryUserRepository()
    const editUserService = new EditUserService(userRepository)
    const user = new User()
    user.email = 'johndoe@email.com'
    user.firstName = 'John Doe'
    user.password = '12345678'
    const createdUser = await userRepository.create(user)
    const editUser = new User()
    editUser.email = 'test@email.com'
    editUser.firstName = 'Test'
    const response = await editUserService.execute(createdUser.id, editUser)
    expect(response).toHaveProperty('email', 'test@email.com')
    expect(response).toHaveProperty('firstName', 'Test')
  })
  it('Should return an error if dont send required attributes', async () => {
    const userRepository = new InMemoryUserRepository()
    const editUserService = new EditUserService(userRepository)
    const user = new User()
    user.email = 'johndoe@email.com'
    user.firstName = 'John Doe'
    user.password = '12345678'
    const createdUser = await userRepository.create(user)
    const editUser = new User()
    editUser.firstName = 'Test'
    editUser.id = '123'
    try {
      await editUserService.execute(createdUser.id, editUser)
    } catch (error) {
      expect(error).toBeInstanceOf(ErrorGenerator)
    }
  })
})
