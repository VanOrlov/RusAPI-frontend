import { API } from '../api';
import type { CreateProjectPayload, ProjectDto } from '../dto';

export const projects = {
  async get(): Promise<ProjectDto[]> {
    const { data } = await API.get<ProjectDto[]>('/projects');
    return data;
  },

  async create(payload: CreateProjectPayload): Promise<ProjectDto> {
    const { data } = await API.post<ProjectDto>('/projects', payload);
    return data;
  },

  async getById(id: string): Promise<ProjectDto> {
    const { data } = await API.get<ProjectDto>(`/projects/${id}`);
    return data;
  },
};
