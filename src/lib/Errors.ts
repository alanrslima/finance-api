import { ErrorDetail } from "../types/ErrorDetail";
import { ErrorKey } from "../types/ErrorKey";

export const Errors: { [K in ErrorKey]: ErrorDetail } = {
  "user.exists": {
    code: 1,
    message: "Usuário já foi cadastrado",
    description:
      "Um usuário que já está cadastrado não pode ser cadastrado novamente.",
  },
  "user.invalid": {
    code: 2,
    message: "Usuário inválido",
    description: "O usuário está inválido ou não existe",
  },
  "user.unauthorized": {
    code: 3,
    message: "Usuário não autorizado",
    description: "As credências do usuário estão inválidas ou expiradas.",
  },
  "resource.unauthorized": {
    code: 4,
    message: "Recurso sem permissão de acesso",
    description:
      "O recurso não existe ou o usuário logado não possui permissão para acessá-lo.",
  },
  "token.missing": {
    code: 5,
    message: "Dados de autenticação não fornecidos",
    description:
      "O recurso acessado requer autenticação, porém o método de autenticação não foi enviado.",
  },
};
