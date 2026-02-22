import { API } from '../api';
import type { ChangeProfileDto } from '../dto';

export const profile = {
  async change(data: ChangeProfileDto) {
    return API.patch('/users/update', data);
  },
};
