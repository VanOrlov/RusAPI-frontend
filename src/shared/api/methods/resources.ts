import { API } from '../api';
import type { CreateResourcePayload, ResourceDto } from '../dto';

export const resources = {
  /** Получить все ресурсы конкретного проекта */
  async getByProject(projectNanoId: string): Promise<ResourceDto[]> {
    const { data } = await API.get<ResourceDto[]>(`/resources/project/${projectNanoId}`);
    return data;
  },
  /** Создать новый ресурс */
  async create(payload: CreateResourcePayload): Promise<ResourceDto> {
    const { data } = await API.post<ResourceDto>('/resources', payload);
    return data;
  },
};
