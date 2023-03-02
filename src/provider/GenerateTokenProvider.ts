import { sign } from 'jsonwebtoken'

interface GenerateTokenProviderProps {
  userId: string
}

class GenerateTokenProvider {
  execute({ userId }: GenerateTokenProviderProps): string {
    const token = sign({}, process.env.SECRET_JWT ?? '', {
      subject: userId,
      expiresIn: process.env.JWT_EXPIRES_IN ?? ''
    })

    return token
  }
}

export { GenerateTokenProvider }
