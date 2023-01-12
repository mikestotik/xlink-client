import { environment } from '../../environments/environment';

const CORE_API_URL = environment.api.core;

export const ApiConfig = {
  ACCOUNT_REGISTER: `${ CORE_API_URL }/account/register`,
  ACCOUNT_ACTIVATE: `${ CORE_API_URL }/account/activate`,
  ACCOUNT: `${ CORE_API_URL }/account`,
  AUTH_LOGIN: `${ CORE_API_URL }/auth/login`,
  AUTH_LOGOUT: `${ CORE_API_URL }/auth/logout`,
  AUTH_REFRESH: `${ CORE_API_URL }/auth/refresh`,

  GREENHOUSE: `${ CORE_API_URL }/greenhouse`,
  DEVICE: `${ CORE_API_URL }/device`,
  RECIPE: `${ CORE_API_URL }/recipe`,
  ASSET: `${ CORE_API_URL }/asset`,
  PROGRAM: `${ CORE_API_URL }/program`,
  RULE: `${ CORE_API_URL }/rule`,
};
