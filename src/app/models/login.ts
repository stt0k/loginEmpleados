export type Login = {
  userName: string;
  password: string;
};

export type LoginResponse = {
  userName: string;
  password: string;
  token?: string;
};
