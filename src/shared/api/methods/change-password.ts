import { API } from '../api';
import type { ChangePasswordDto } from '../dto';

export const password = {
  async change(data: ChangePasswordDto) {
    await API.patch('/auth/update-password', data);
  },
};
