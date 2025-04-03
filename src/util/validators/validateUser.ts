export const validateLogin = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const errors: { [key: string]: string } = {};
  if (email === "") {
    errors.email = "Email não pode estar vazio";
  }

  if (password === "") {
    errors.password = "Senha incorreta";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

export const validateCreateUser = ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  const errors: { [key: string]: string } = {};

  if (email === "") {
    errors.email = "O email pode estar vazio";
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-.\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "O endereço de email não é válido";
    }
  }

  if (name === "") {
    errors.name = "O nome não pode estar vazio";
  }

  if (
    password.length < 8 ||
    !/[A-Z]/.test(password) ||
    !/[a-z]/.test(password) ||
    !/[0-9]/.test(password)
  ) {
    errors.password =
      "A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula e um número";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

export const validateUpdateUser = (userName: string, phone: string) => {
  const errors: { [key: string]: string } = {};

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

export const validatPasswordUpdateUser = (
  password: string,
  confirmPassword: string,
  oldPassword: string,
) => {
  const errors: { [key: string]: string } = {};

  if (password === "") {
    errors.password = "A senha não pode estar vazia";
  } else if (password !== confirmPassword) {
    errors.password = "A confirmação de senha está diferente";
  } else if (!oldPassword) {
    errors.oldPassword = "Digite a senha antiga";
  } else if (oldPassword === password) {
    errors.password = "A nova senha deve ser diferente da antiga";
  }

  if (confirmPassword === "") {
    errors.confirmPassword = "Confirmação de senha não pode estar vazio";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

export const validateResetPassword = (password: string) => {
  const errors: { [key: string]: string } = {};

  if (
    password.length < 8 ||
    !/[A-Z]/.test(password) ||
    !/[a-z]/.test(password) ||
    !/[0-9]/.test(password)
  ) {
    errors.password =
      "A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula e um número";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
