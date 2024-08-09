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
import type { ApiPath, ResponseBody } from '../typings';

interface LoginRequestBody {
  email: string;
  password: string;
}
type LoginResponseBody = ResponseBody<string>;
type LoginResolver = HttpResponseResolver<never, LoginRequestBody, LoginResponseBody>;

/**
 * 登录
 */
const login: LoginResolver = async ({ request }) => {
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

type ProfileResponseBody = ResponseBody<Omit<ReturnType<typeof db.users.findFirst>, 'password'>>;
type ProfileResolver = HttpResponseResolver<never, never, ProfileResponseBody>;

/**
 * 获取登录用户
 */
const profile: ProfileResolver = async ({ request }) => {
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
        code: 'ERR_PROFILE',
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

interface RegisterRequestBody {
  nickname: string;
  email: string;
  password: string;
  confirm_password: string;
}

type RegisterResponseBody = ResponseBody<ReturnType<typeof db.users.create>>;
type RegisterResolver = HttpResponseResolver<
  never,
  RegisterRequestBody,
  RegisterResponseBody
>;

/**
 * 注册
 */
const registerResolver: RegisterResolver = async ({ request }) => {
  const body = await request.json();
  const user = db.users.findFirst({
    where: {
      email: {
        equals: body.email,
      },
    },
  });

  if (user) {
    return HttpResponse.json(
      {
        code: 'ERR_INVALID_EMAIL',
        message: '邮箱已注册',
        data: null,
      },
      { status: 403 },
    );
  }

  const newUser = db.users.create(body);

  return HttpResponse.json({
    code: 'SUCCESS_RESISTER',
    message: '注册成功',
    data: newUser,
  });
};

export const handlers = [
  http.post<never, LoginRequestBody, LoginResponseBody, ApiPath<'/sign-in'>>(
    predicate('/sign-in'),
    withDelay(login),
  ),
  http.get<never, never, ProfileResponseBody, ApiPath<'/profile'>>(
    predicate('/profile'),
    chain(withDelay, withAuth)(profile),
  ),
  http.post<never, RegisterRequestBody, RegisterResponseBody, ApiPath<'/sign-up'>>(
    predicate('/sign-up'),
    withDelay(registerResolver),
  ),
];
