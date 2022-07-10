import { sign } from "jsonwebtoken";

type GenerateTokenProviderProps = {
  userId: string;
};

class GenerateTokenProvider {
  async execute({ userId }: GenerateTokenProviderProps) {
    const token = sign({}, process.env.SECRET_JWT, {
      subject: userId,
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return token;
  }
}

export { GenerateTokenProvider };
