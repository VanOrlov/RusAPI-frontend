<script setup lang="ts">
import { useUserQuery } from 'src/entities/user/model/user.query';
import { useRouter } from 'vue-router';
import { computed } from 'vue';
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
  <QLayout view="lHh Lpr lff" :class="$style.layout">
    <QHeader :class="$style.header">
      <div :class="$style.headerContainer">
        <span :class="$style.headerLogo" @click="goTo('/')">RusAPI</span>

        <QToolbar :class="$style.headerToolbar">
          <!--QBtn color="secondary" outline label="Документация" no-caps @click="goTo('/docs')" /-->

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
                  <QItemSection avatar>
                    <QIcon name="account_circle" />
                  </QItemSection>
                  <QItemSection>
                    <QItemLabel>Мой профиль</QItemLabel>
                  </QItemSection>
                </QItem>

                <QItem clickable v-close-popup @click="goTo('/projects')">
                  <QItemSection avatar>
                    <QIcon name="list_alt" />
                  </QItemSection>
                  <QItemSection>
                    <QItemLabel>Мои проекты</QItemLabel>
                  </QItemSection>
                </QItem>

                <QSeparator />

                <QItem clickable v-close-popup @click="handleLogout">
                  <QItemSection avatar>
                    <QIcon name="logout" color="negative" />
                  </QItemSection>
                  <QItemSection>
                    <QItemLabel class="text-negative">Выход</QItemLabel>
                  </QItemSection>
                </QItem>
              </QList>
            </QBtnDropdown>
          </template>
        </QToolbar>
      </div>
    </QHeader>

    <QPageContainer :class="$style.pageContainer">
      <RouterView />
    </QPageContainer>

    <QFooter bordered :class="$style.footer">
      <div :class="$style.footerContainer">
        <div :class="$style.footerLeft">
          <span :class="$style.footerLogo">RusAPI</span>
          <span :class="$style.copyright">© 2026 Все права защищены.</span>
        </div>

        <div :class="$style.footerRight">
          <a :class="$style.footerLink" @click.prevent="goTo('/docs')">Документация</a>
          <a :class="$style.footerLink" @click.prevent="goTo('/terms')">Условия использования</a>
          <a href="https://github.com/твоя-ссылка" target="_blank" :class="$style.footerLink"
            >GitHub</a
          >
        </div>
      </div>
    </QFooter>
  </QLayout>
</template>

<style lang="scss" module>
/* ... твои текущие стили оставляем как есть ... */
.layout {
  padding: 20px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  background-color: #ffffff;
  background-image: radial-gradient(rgba(38, 166, 154, 0.1) 2px, #ffffff 2px);
  background-size: 40px 40px;
}
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
.pageContainer {
  height: 100%;
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

/* ... твои предыдущие стили шапки и лейаута ... */

/* === СТИЛИ ФУТЕРА === */
.footer {
  background-color: white; /* Делаем белым, как шапку */
  color: #666; /* Мягкий серый цвет текста */
  border-top: 1px solid #f0f0f0;
}

.footerContainer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-inline: 120px; /* Выравниваем по ширине шапки */
  height: 64px; /* Чуть уже, чем шапка */
}

.footerLeft {
  display: flex;
  align-items: center;
  gap: 16px;
}

.footerLogo {
  font-size: 18px;
  font-weight: 700;
  color: #111;
  letter-spacing: -0.5px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.copyright {
  font-size: 14px;
  color: #888;
}

.footerRight {
  display: flex;
  gap: 24px;
}

.footerLink {
  color: #666;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s ease;
  cursor: pointer;

  &:hover {
    color: #26a69a; /* Твой secondary (зеленый) цвет при наведении */
  }
}

/* Адаптив футера (синхронизируем с шапкой) */
@media (max-width: 1024px) {
  .footerContainer {
    margin-inline: 60px;
  }
}

@media (max-width: 768px) {
  .footerContainer {
    margin-inline: 20px;
    flex-direction: column;
    justify-content: center;
    gap: 12px;
    height: auto;
    padding-block: 16px;
  }

  .footerRight {
    gap: 16px;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
