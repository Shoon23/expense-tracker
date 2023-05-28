interface iLoginCredentials {
  email: string;
  password: string;
}

interface iRegisterCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface iUser {
  email: string;
  lastName: string;
  firstName: string;
  id: number;
  accessToken: string;
}
export type { iLoginCredentials, iRegisterCredentials, iUser };
