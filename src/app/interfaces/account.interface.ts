import { Languages } from "../enums/language.enum";
import { Entity } from './entity.interface';


export interface UserCredentials {
  email: string;
  password: string;
}


export interface AccountRegister extends UserCredentials {
  lang?: Languages;
}


export interface AccountActivation {
  code: number;
  email: string;
}


export interface Role {
  id?: number;
  name?: string;
}


export interface User extends Entity {
  email: string;
  username: string;
  fullName?: string;
  lang: Languages;
  logo?: string;
  roles: Role[];
}
