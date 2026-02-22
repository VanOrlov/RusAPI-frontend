export interface LoginStore {
  loginData: {
    email: string;
    password: string;
  };
  btnLoading: boolean;
}
