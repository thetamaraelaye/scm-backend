const databaseName = '',
  region = 'eu-north-1';

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const passwordRegex =
  /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*./,?<>:;'"{}|`~_()])[a-zA-Z0-9!@#$%^&*./,?<>;:'"{}|`~_()]{8,}$/;
//export const pageUrlPrefix = 'https://scm-backend.com';

export default {
  emailRegex,
  passwordRegex,
  //pageUrlPrefix
};
