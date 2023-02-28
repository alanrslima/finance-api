import { sign } from 'jsonwebtoken'
import { constants } from '../config/constants'

interface GenerateTokenProviderProps {
  userId: string
}

class GenerateTokenProvider {
  execute({ userId }: GenerateTokenProviderProps): string {
    const token = sign({}, constants.SECRET_JWT, {
      subject: userId,
      expiresIn: constants.JWT_EXPIRES_IN
    })

    return token
  }
}

export { GenerateTokenProvider }
