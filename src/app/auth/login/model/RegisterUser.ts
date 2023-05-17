export interface RegisterUser {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  address: string;
  city: string;
  state: string;
  number: string;
  title: string[];
  adminApprove: boolean;
}