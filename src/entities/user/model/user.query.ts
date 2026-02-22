import { useQuery } from '@pinia/colada';
import { auth } from 'src/shared/api/methods/auth';
import { accessToken } from 'src/shared/api/methods/token';
import { computed } from 'vue';

export function useUserQuery(isRouteProtected: () => boolean = () => true) {
  return useQuery({
    key: ['user', 'me'],
    query: async () => {
      const response = await auth.me();
      return response;
    },
    staleTime: 0.2 * 60 * 1000,
    enabled: computed(() => !!accessToken.value && isRouteProtected()),
  });
}
