
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

export interface ILoggedUserData {
  uid: string;
  email : string;
  firstName: string;
  lastName : string;
  firstTimeEntering : boolean;
}
  