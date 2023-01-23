declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SECRET_JWT: string
      DOCKER_PORT: string
      GITHUB_AUTH_TOKEN: string
      NODE_ENV: 'development' | 'production'
      PORT?: string
      PWD: string
      DB_HOST: string
      DB_USER: string
      DB_PASSWORD: string
      DB_NAME: string
      DB_PORT: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
