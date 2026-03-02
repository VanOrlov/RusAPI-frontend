<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserQuery } from 'src/entities/user/model/user.query';
import { useLogout } from 'src/features/logout/model/use-logout';
import { accessToken } from 'src/shared/api/methods/token';

const router = useRouter();

const goTo = (path: string) => {
  void router.push(path);
};

const { data: user, isLoading } = useUserQuery(() => !!accessToken.value);
const { logout } = useLogout();

const isAuthenticated = computed(() => !!user.value);

const handleLogout = () => {
  void logout();
};
</script>

<template>
  <QHeader :class="$style.header">
    <div :class="$style.headerContainer">
      <span :class="$style.headerLogo" @click="goTo('/')">RusAPI</span>

      <QToolbar :class="$style.headerToolbar">
        <template v-if="isLoading">
          <QSpinner color="secondary" size="1.5em" :class="$style.spinner" />
        </template>

        <template v-else-if="!isAuthenticated">
          <QBtn color="primary" icon="login" label="Вход" no-caps @click="goTo('/login')" />
        </template>

        <template v-else>
          <QBtnDropdown
            color="secondary"
            outline
            icon="person"
            :label="user?.name || 'Аккаунт'"
            no-caps
          >
            <QList>
              <QItem clickable v-close-popup @click="goTo('/account')">
                <QItemSection avatar><QIcon name="account_circle" /></QItemSection>
                <QItemSection><QItemLabel>Мой профиль</QItemLabel></QItemSection>
              </QItem>

              <QItem clickable v-close-popup @click="goTo('/projects')">
                <QItemSection avatar><QIcon name="list_alt" /></QItemSection>
                <QItemSection><QItemLabel>Мои проекты</QItemLabel></QItemSection>
              </QItem>

              <QSeparator />

              <QItem clickable v-close-popup @click="handleLogout">
                <QItemSection avatar><QIcon name="logout" color="negative" /></QItemSection>
                <QItemSection><QItemLabel class="text-negative">Выход</QItemLabel></QItemSection>
              </QItem>
            </QList>
          </QBtnDropdown>
        </template>
      </QToolbar>
    </div>
  </QHeader>
</template>

<style lang="scss" module>
.header {
  background-color: white;
  color: black;
  border-bottom: 1px solid #f0f0f0;
}
.headerContainer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-inline: 120px;
  height: 80px;
}
.headerLogo {
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -1px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  cursor: pointer;
}
.headerToolbar {
  width: fit-content;
  gap: 20px;
  padding-inline: 0px;
}
.spinner {
  margin-left: 10px;
  margin-right: 10px;
}

@media (max-width: 1024px) {
  .headerContainer {
    margin-inline: 60px;
  }
}
@media (max-width: 768px) {
  .headerContainer {
    margin-inline: 20px;
  }
}
</style>
