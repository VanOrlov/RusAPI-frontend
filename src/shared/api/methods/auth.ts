import { API } from '../api';
import type {
  AuthMeRequstDto,
  LoginRequestDto,
  LoginResponseDto,
  RegisterRequestDto,
  RegisterResponseDto,
} from '../dto';

export const auth = {
  async signup(data: RegisterRequestDto): Promise<RegisterResponseDto> {
    const { data: response } = await API.post('/auth/register', data);
    return response;
  },

  async login(data: LoginRequestDto): Promise<LoginResponseDto> {
    const { data: response } = await API.post('/auth/login', data);
    return response;
  },

  async me(): Promise<AuthMeRequstDto> {
    const { data: response } = await API.get('/auth/me');
    return response;
  },

  async logout(): Promise<void> {
    await API.post('/auth/logout');
  },
};
