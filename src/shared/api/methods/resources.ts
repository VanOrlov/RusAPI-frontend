import { API } from '../api';
import type {
  CreateResourcePayload,
  GenerateDataPayload,
  ResourceDto,
  UpdateSchemaPayload,
} from '../dto';

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
  async updateResourceSchema(payload: UpdateSchemaPayload): Promise<ResourceDto> {
    const { data } = await API.patch<ResourceDto>(`/resources/${payload.resourceId}/schema`, {
      schema: payload.schema,
    });
    return data;
  },

  async generateResourseData(payload: GenerateDataPayload): Promise<ResourceDto> {
    const params = payload.count ? { count: payload.count } : {};

    const { data } = await API.post<ResourceDto>(
      `/resources/${payload.resourceId}/generate`,
      null,
      { params },
    );
    return data;
  },
};
