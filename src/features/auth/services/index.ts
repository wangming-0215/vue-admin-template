import type { Profile } from '../models';
import { http } from '@/utils';

interface SignUpRequestBody {
  nickname: string;
  email: string;
  password: string;
  confirm_password: string;
}

class AuthService {
  /**
   * 登录
   * @param email
   * @param password
   */
  async signIn(email: string, password: string) {
    const response = await http.post<Service.Response<string>>('/sign-in', {
      data: {
        email,
        password,
      },
    }).unwrap();
    return response.data;
  }

  /**
   * profile
   */
  async profile() {
    const response = await http.get<Service.Response<Profile>>('/profile').unwrap();
    return response.data;
  }

  /**
   * 注册
   * @param body
   * @returns profile
   */
  async signUp(body: SignUpRequestBody) {
    const response = await http.post<Service.Response<Profile>, SignUpRequestBody>(
      '/sign-up',
      { data: body },
    ).unwrap();
    return response.data;
  }
}

const authService = new AuthService();

export default authService;
