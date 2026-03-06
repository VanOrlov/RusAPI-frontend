<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserQuery } from 'src/entities/user/model/user.query';
import { useLogout } from 'src/features/logout/model/use-logout';
import { accessToken } from 'src/shared/api/methods/token';
import { ThemeSwitcher } from './components';

const router = useRouter();

const goTo = (path: string) => {
  void router.push(path);
};

const { data: user, isLoading } = useUserQuery(() => !!accessToken.value);
const { logout } = useLogout();

const isAuthenticated = computed(() => !!user.value);

const userInitials = computed(() => {
  if (!user.value?.name) return 'U';
  return user.value.name.charAt(0).toUpperCase();
});

const handleLogout = () => {
  void logout();
};
</script>

<template>
  <QHeader :class="$style.header" class="bg-transparent">
    <div :class="$style.headerContainer">
      <div :class="$style.logoWrapper" @click="goTo('/')">
        <div :class="$style.logoIcon">
          <QIcon name="hub" color="white" size="xs" />
        </div>
        <span :class="$style.headerLogo"> Rus<span :class="$style.highlight">API</span> </span>
      </div>

      <div :class="$style.actions">
        <ThemeSwitcher />
        <template v-if="isLoading">
          <QSpinner color="secondary" size="1.5em" />
        </template>

        <template v-else-if="!isAuthenticated">
          <QBtn flat label="Войти" no-caps :class="$style.ghostBtn" @click="goTo('/login')" />
          <QBtn
            unelevated
            color="secondary"
            label="Регистрация"
            no-caps
            :class="$style.primaryBtn"
            @click="goTo('/signup')"
          />
        </template>

        <template v-else>
          <div :class="$style.userProfile" class="cursor-pointer">
            <QAvatar
              size="40px"
              font-size="16px"
              color="secondary"
              text-color="white"
              :class="$style.avatar"
            >
              {{ userInitials }}
            </QAvatar>

            <QMenu
              auto-close
              transition-show="jump-down"
              transition-hide="jump-up"
              :offset="[0, 10]"
            >
              <QList style="min-width: 220px" class="q-py-sm">
                <QItem>
                  <QItemSection>
                    <QItemLabel class="text-weight-bold">{{
                      user?.name || 'Пользователь'
                    }}</QItemLabel>
                    <QItemLabel caption>{{ user?.email || 'email@hidden.com' }}</QItemLabel>
                  </QItemSection>
                </QItem>

                <QSeparator class="q-my-sm" />

                <QItem clickable @click="goTo('/account')" :class="$style.menuItem">
                  <QItemSection avatar style="min-width: 36px">
                    <QIcon name="manage_accounts" color="grey-7" size="sm" />
                  </QItemSection>
                  <QItemSection>Мой профиль</QItemSection>
                </QItem>

                <QItem clickable @click="goTo('/projects')" :class="$style.menuItem">
                  <QItemSection avatar style="min-width: 36px">
                    <QIcon name="folder_open" color="grey-7" size="sm" />
                  </QItemSection>
                  <QItemSection>Мои проекты</QItemSection>
                </QItem>

                <QSeparator class="q-my-sm" />

                <QItem
                  clickable
                  @click="handleLogout"
                  :class="[$style.menuItem, $style.logoutItem]"
                >
                  <QItemSection avatar style="min-width: 36px">
                    <QIcon name="logout" color="negative" size="sm" />
                  </QItemSection>
                  <QItemSection class="text-negative text-weight-medium">Выйти</QItemSection>
                </QItem>
              </QList>
            </QMenu>
          </div>
        </template>
      </div>
    </div>
  </QHeader>
</template>

<style lang="scss" module>
.header {
  background-color: var(--bg-header-glass) !important;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--header-border);
}

.headerContainer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-inline: 120px;
  height: 72px;
}

.logoWrapper {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
}

.logoIcon {
  background: linear-gradient(135deg, #26a69a, #1b75d2);
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(38, 166, 154, 0.3);
  @media (max-width: 768px) {
    width: 26px;
    height: 26px;
    i {
      font-size: 14px !important;
    }
  }
}

.headerLogo {
  font-size: 24px;
  font-weight: 800;
  letter-spacing: -0.5px;
  font-family: 'Inter', 'Segoe UI', sans-serif;
  color: var(--text-main);
  @media (max-width: 768px) {
    font-size: 18px;
  }
}

.highlight {
  color: var(--text-secondary);
}

.actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.ghostBtn {
  font-weight: 600;
  border-radius: 8px;
  padding: 8px 16px;
  transition: background 0.2s;
  color: var(--text-main);

  &:hover {
    background: rgba(0, 0, 0, 0.04);
  }
}

.primaryBtn {
  font-weight: 600;
  border-radius: 8px;
  padding: 8px 20px;
  box-shadow: 0 4px 12px rgba(38, 166, 154, 0.2);
  transition:
    transform 0.2s,
    box-shadow 0.2s;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(38, 166, 154, 0.3);
  }
}

.userProfile {
  border-radius: 50%;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 0 4px rgba(38, 166, 154, 0.1);
  }
}

.avatar {
  font-weight: 600;
  letter-spacing: 0.5px;
}

.menuItem {
  border-radius: 6px;
  margin: 2px 8px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--hover-bg);
  }
}

.logoutItem {
  &:hover {
    background-color: var(--danger-bg);
  }
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

  .ghostBtn {
    display: none;
  }
}
</style>
