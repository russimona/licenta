export interface ITestData {
    email: string;
};

export interface ILoginData {
  email: string;
  password:string;

};

export interface ISignUpData {
  email: string;
  firstName : string;
  lastName: string;
  password: string
};

export interface IResetPasswordData {
  email : string
}
  