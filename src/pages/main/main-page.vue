<script setup lang="ts">
import { ref } from 'vue';

const features = ref([
  {
    title: 'Быстрая настройка',
    description:
      'Создайте свой API за считанные секунды без лишней бюрократии и сложных конфигураций.',
    icon: '🚀',
  },
  {
    title: 'Полный контроль',
    description: 'Управляйте данными, схемами и ответами сервера так, как вам удобно.',
    icon: '⚡️',
  },
  {
    title: 'Безопасность',
    description: 'Ваши данные защищены современными методами шифрования и аутентификации.',
    icon: '🔒',
  },
]);
</script>

<template>
  <div :class="$style.mainPage">
    <!-- Hero Block -->
    <section :class="$style.hero">
      <div :class="$style.heroContent">
        <h1 :class="$style.title">
          Создавай <span :class="$style.highlight">Будущее</span> Вместе с Нами
        </h1>
        <p :class="$style.subtitle">
          Идеальный инструмент для разработчиков, которые ценят время и качество. Разворачивай
          мок-серверы мгновенно.
        </p>
        <button :class="$style.ctaButton">Начать бесплатно</button>
      </div>
      <div :class="$style.heroBackground"></div>
    </section>

    <!-- Features Block -->
    <section :class="$style.features">
      <h2 :class="$style.sectionTitle">Почему это круто?</h2>
      <div :class="$style.cardsGrid">
        <div v-for="(feature, index) in features" :key="index" :class="$style.card">
          <div :class="$style.cardIcon">{{ feature.icon }}</div>
          <h3 :class="$style.cardTitle">{{ feature.title }}</h3>
          <p :class="$style.cardDescription">{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <!-- Info/Promo Block -->
    <section :class="$style.info">
      <div :class="$style.infoContent">
        <h2 :class="$style.infoTitle">Готовы ускориться?</h2>
        <p :class="$style.infoText">
          Присоединяйтесь к тысячам разработчиков, которые уже используют нашу платформу для
          тестирования и прототипирования. Не ждите бэкенд — станьте бэкендом.
        </p>
        <div :class="$style.stats">
          <div :class="$style.statItem">
            <span :class="$style.statNumber">10k+</span>
            <span :class="$style.statLabel">Пользователей</span>
          </div>
          <div :class="$style.statItem">
            <span :class="$style.statNumber">5M+</span>
            <span :class="$style.statLabel">Запросов/день</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" module>
@use "sass:color";
$primary: #26a69a;
$dark: #1a1a1a;
$light: #ffffff;
$gray: #f5f5f5;
$blue: #1b75d2;

.mainPage {
  width: 100%;
  display: flex;
  flex-direction: column;
  font-family: 'Inter', sans-serif; /* Fallback */
  color: $dark;
}

/* Hero Section */
.hero {
  position: relative;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 2rem;
  overflow: hidden;
}

.heroContent {
  z-index: 2;
  max-width: 800px;
  animation: fadeIn 1s ease-out;
}

.title {
  font-size: 4.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
}

.highlight {
  color: $primary;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 5px;
    left: 0;
    width: 100%;
    height: 10px;
    background-color: rgba($primary, 0.2);
    z-index: -1;
    transform: skewX(-15deg);
  }
}

.subtitle {
  font-size: 1.25rem;
  color: #666;
  margin-bottom: 3rem;
  line-height: 1.6;
}

.ctaButton {
  background-color: $primary;
  color: $light;
  border: none;
  padding: 1rem 3rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 10px 20px rgba($primary, 0.3);

  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 15px 30px rgba($primary, 0.4);
    background-color: color.adjust(#26a69a, $lightness: 5%);;
  }

  &:active {
    transform: translateY(-1px);
  }
}

/* Features Section */
.features {
  padding: 6rem 2rem;
}

.sectionTitle {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 4rem;
  position: relative;

  &::before {
    content: '';
    display: block;
    width: 60px;
    height: 4px;
    background-color: $primary;
    margin: 0 auto 1rem;
    border-radius: 2px;
  }
}

.cardsGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.card {
  padding: 2.5rem;
  border-radius: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  border: 1px solid transparent;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba($primary, 0.15);
    border-color: rgba($primary, 0.2);
  }
}

.cardIcon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
}

.cardTitle {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: $dark;
}

.cardDescription {
  color: #666;
  line-height: 1.6;
}

/* Info Section */
.info {
  padding: 6rem 2rem;
  color: $light;
  display: flex;
  justify-content: center;
}

.infoContent {
  max-width: 900px;
  text-align: center;
}

.infoTitle {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  background: linear-gradient(to right, $blue, $primary);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.infoText {
  font-size: 1.2rem;
  color: #aaa;
  margin-bottom: 4rem;
  line-height: 1.8;
}

.stats {
  display: flex;
  justify-content: center;
  gap: 4rem;
  flex-wrap: wrap;
}

.statItem {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.statNumber {
  font-size: 3.5rem;
  font-weight: 800;
  color: $primary;
}

.statLabel {
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #888;
  margin-top: 0.5rem;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
