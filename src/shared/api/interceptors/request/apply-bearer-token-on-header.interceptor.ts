import { configuration } from 'config/configuration';
import Cookies from 'js-cookie';
import { isEmpty } from 'lodash';
export async function applyBearerTokenOnHeader(config: any) {
  const token = Cookies.get(configuration.AUTHORIZATION_KEY);
  config.headers[configuration.AUTHORIZATION_KEY] = !isEmpty(configuration.TYPE_TOKEN)
    ? `${configuration.TYPE_TOKEN} ${token}`
    : token;
  return config;
}
