import type { Profile } from '../models';
import { http } from '@/utils';

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
}

const authService = new AuthService();

export default authService;
