import { StatusCodes } from 'http-status-codes'
import { ErrorGenerator } from '../../../lib/ErrorGenerator'
import { InMemoryUserRepository } from '../../../repositories/user/InMemoryUserRepository'
import { DeleteUserService } from './DeleteUserService'

describe('Delete user service', () => {
  it('Should throw an error if user dont exists', async () => {
    const userRepository = new InMemoryUserRepository()
    const deleteUserService = new DeleteUserService(userRepository)
    const userId = '1234'
    try {
      await deleteUserService.execute(userId)
    } catch (error) {
      expect(error).toBeInstanceOf(ErrorGenerator)
      expect(error).toHaveProperty('message', 'User not exists')
      expect(error).toHaveProperty('statusCode', StatusCodes.BAD_REQUEST)
    }
  })
  // it('Should make logic delete on delete user', async () => {
  //   const userRepository = new InMemoryUserRepository()
  //   const deleteUserService = new DeleteUserService(userRepository)
  //   const user = new User()
  //   user.email = 'johndoe@email.com'
  //   user.firstName = 'John Doe'
  //   user.password = '12345678'
  //   const createdUser = await userRepository.create(user)
  //   await deleteUserService.execute(createdUser.id)
  //   const userDeleted = await userRepository.read(createdUser.id)
  //   expect(userDeleted).toHaveProperty('deletedAt')
  //   expect(userDeleted.deletedAt).toBeInstanceOf(Date)
  // })
})
