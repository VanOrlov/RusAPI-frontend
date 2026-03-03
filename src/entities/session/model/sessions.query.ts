import { useQuery } from '@pinia/colada';
import { sessions } from 'src/shared/api/methods/sessions';

export function useSessionsQuery() {
  return useQuery({
    key: () => ['sessions'],
    query: () => sessions.get()
  });
}
