import type { HttpResponseResolver } from 'msw';
import { HttpResponse, http } from 'msw';
import {
  type ResponseBody,
  SECRET,
  createResponseBody,
  predicate,
  withDelay,
} from '../utils';
import db from '../database';

interface LoginRequestBody {
  email: string;
  password: string;
}

type LoginResponseBody = ResponseBody<string | null>;

/**
 * 登录
 */
function signIn(): HttpResponseResolver<never, LoginRequestBody, LoginResponseBody> {
  return async ({ request }) => {
    const { email, password } = await request.json();
    const user = db.users.findFirst({
      where: {
        email: {
          equals: email,
        },
      },
    });

    if (!user || user.password !== password) {
      const response = createResponseBody(null, 'ERR_EMAIL_OR_PASSWORD_INCORRECT', '邮箱或密码不正确');
      return HttpResponse.json(response, { status: 401 });
    }

    const payload = window.btoa(JSON.stringify({
      id: user.id,
      email: user.email,
      expiredIn: ~~(Date.now() / 1000),
    })).replace(/==$/g, '');
    const verify = window.btoa(SECRET).replace(/==$/g, '');
    const token = `${payload}.${verify}`;

    const response = createResponseBody(token, 'SUCCESS_SIGN_IN', '登录成功');
    return HttpResponse.json(response);
  };
}

export const handlers = [
  http.post<never, LoginRequestBody, LoginResponseBody>(
    predicate('/sign-in'),
    withDelay(signIn()),
  ),
];
