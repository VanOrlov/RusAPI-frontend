<script setup lang="ts">
import { useQuasar } from 'quasar';
import { useSessionsQuery } from 'src/entities/session/model/sessions.query';
import { useDeleteSession } from 'src/features/delete-session/model/use-delete-session';
import { useLogout } from 'src/features/logout/model/use-logout';
import { ref } from 'vue';

const $q = useQuasar()
const { data, isLoading, error } = useSessionsQuery();
const { mutate, isLoading: isLoadingDeleteSession } = useDeleteSession();
const { logout } = useLogout()

const deletingSessionId = ref<string | null>(null);

// Форматирование даты
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  };
  return new Intl.DateTimeFormat('ru-RU', options).format(new Date(dateString));
};

const terminateSession = (sessionId: string, isCurrentSession: boolean | undefined) => {
  deletingSessionId.value = sessionId;
  if (isCurrentSession) {
    console.log($q)
    $q.dialog({
      title: 'Внимание',
      message:
        'Вы действительно хотите завершить текущий сеанс? Это приведет к выходу из аккаунта на этом устройстве.',
      ok: {
        label: 'Выйти',
        color: 'negative',
        unelevated: true,
      },
      cancel: {
        label: 'Отмена',
        color: 'grey-7',
        flat: true,
      },
      persistent: true,
    }).onOk(() => {
      try {
        mutate(sessionId);
        void logout()
      } catch {
        void 0;
      }
    }).onCancel(() => {
      deletingSessionId.value = null; 
    });
  } else {
    try {
      mutate(sessionId);
    } catch {
      void 0;
    }
  }
};
</script>

<template>
  <QCard flat bordered :class="$style.widgetCard">
    <QCardSection :class="$style.section">
      <div :class="$style.header">
        <h2 :class="$style.title">Активные сеансы</h2>
        <p :class="$style.subtitle">
          Здесь отображаются устройства, с которых выполнен вход в ваш аккаунт.
        </p>
      </div>

      <div v-if="isLoading" class="text-grey-6 text-body2">
        <QSkeleton type="QToolbar"/>
      </div>

      <div v-else-if="error && data" class="text-negative text-body2">
        {{ error }}
      </div>

      <div v-else :class="$style.list">
        <div v-for="session in data" :key="session.sessionId" :class="$style.sessionItem">
          <div :class="$style.sessionInfo">
            <div :class="$style.sessionInfoTitle">
              <span :class="$style.device">{{ session.device }}</span>
              <QBadge v-if="session.isCurrent" color="positive" outline label="Текущий сеанс" :class="$style.sessionCurrent" />
            </div>
            <span :class="$style.ip">
              IP: {{ session.ip === '::1' ? '127.0.0.1 (Localhost)' : session.ip }}
            </span>
            <span :class="$style.date">Был активен: {{ formatDate(session.lastActive) }}</span>
          </div>

          <QBtn
            color="negative"
            outline
            unelevated
            no-caps
            label="Завершить"
            size="sm"
            :loading="isLoadingDeleteSession && deletingSessionId === session.sessionId"
            :disable="isLoadingDeleteSession && deletingSessionId !== session.sessionId"
            @click="terminateSession(session.sessionId, session.isCurrent)"
          />
        </div>
      </div>
    </QCardSection>
  </QCard>
</template>

<style lang="scss" module>
.widgetCard {
  border-radius: 8px;
  border-color: #eaeaea;
  background-color: #ffffff;
}

.section {
  padding: 24px;
}

.header {
  margin-bottom: 24px;
}

.title {
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 4px 0;
  line-height: 1.2;
}

.subtitle {
  font-size: 14px;
  color: #666;
  margin: 0;
}

/* --- Специфичные стили для списка сессий --- */
.list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.sessionItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #fafafa;
  }

  @media (max-width: 480px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
  }
}

.sessionInfo {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.sessionInfoTitle {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}

.sessionCurrent {
  height: fit-content;
  width: fit-content;
}

.device {
  font-weight: 600;
  font-size: 16px;
  color: #333;
}

.ip,
.date {
  font-size: 13px;
  color: #777;
}
</style>
