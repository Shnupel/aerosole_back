export const HttpMessages = {
  NOT_FOUND: "ничего не найдено",
  CAN_NOT_CREATE: "не удалось создать",
  USER_WITH_EMAIL_EXIST: "пользователь с таким email уже существует",
  LOGIN_OR_PASSWORD_IS_NOT_MATCH: "не соответсвует логин или пароль"
}

export const ValidationErrors = {
  NO_TOKEN: () => "failed authorization",
  NO_FIELD: (field: string) => "you must add " + field + " field"
}
