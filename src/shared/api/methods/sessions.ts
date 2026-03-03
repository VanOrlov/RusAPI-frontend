import { API } from '../api';
import type { Session } from '../dto';

export const sessions = {
  async get(): Promise<Session[]> {
    const { data } = await API.get('/auth/sessions');
    return data;
  },
  async delete(sessionId: string): Promise<{ message: string }> {
    const { data } = await API.delete(`/auth/sessions/${sessionId}`);
    return data;
  },
};
