import {
  HttpResponse,
  type HttpResponseResolver,
  http,
} from 'msw';
import { chain } from 'radash';
import {
  SECRET,
  predicate,
  withAuth,
  withDelay,
} from '../utils';
import db from '../database';
import { sign } from '../jwt';
import type { ResponseBody } from '../typings';

interface LoginRequestBody {
  email: string;
  password: string;
}

type LoginResponseBody = ResponseBody<string>;

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
      return HttpResponse.json({
        data: null,
        code: 'ERR_EMAIL_OR_PASSWORD_INCORRECT',
        message: '邮箱或密码不正确',
      }, { status: 403 });
    }

    // const payload = window.btoa(JSON.stringify({
    //   id: user.id,
    //   email: user.email,
    //   expiredIn: ~~(Date.now() / 1000),
    // })).replace(/==$/g, '');
    // const verify = window.btoa(SECRET).replace(/==$/g, '');
    // const token = `${payload}.${verify}`;

    // console.log(sign({ sub: 2 }, SECRET, { expiredIn: Math.floor(Date.now() / 1000) + 1 }));
    // console.log(verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTcyMTgzMjg3MCwiZXhwIjoxNzIxODMyODcxfQ.r2Ys2I92mY3_-js8NmIKJcg6gMeDKHVEXJw4sTqycis', SECRET));

    const token = sign(
      { userId: user.id },
      SECRET,
      { expiredIn: Math.floor(Date.now() / 1000) + 5 },
    );

    return HttpResponse.json({
      code: 'SUCCESS_SIGN_IN',
      message: '登录成功',
      data: token,
    });
  };
}

/**
 * user profile
 */
function profile(): HttpResponseResolver<never, any, any> {
  return async ({ request }) => {
    const userId = request.headers.get('userId')!;
    const user = db.users.findFirst({
      where: {
        id: {
          equals: Number(userId),
        },
      },
    });
    if (!user) {
      return HttpResponse.json(
        {
          code: 'ERROR_PROFILE',
          message: '用户不存在',
          data: null,
        },
        { status: 404 },
      );
    }

    return HttpResponse.json({
      code: 'SUCCESS_PROFILE',
      message: '获取成功',
      data: Object.assign({}, user, { password: undefined }),
    });
  };
}

export const handlers = [
  http.post<never, LoginRequestBody, LoginResponseBody>(
    predicate('/sign-in'),
    withDelay(signIn()),
  ),
  http.get<never, any, any>(
    predicate('/profile'),
    chain(withDelay, withAuth)(profile()),
  ),
];
