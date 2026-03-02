<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const steps = [
  {
    number: '01',
    title: 'Создайте эндпоинт',
    desc: 'Задайте имя пути, например /users или /products. Никаких серверов и баз данных.',
  },
  {
    number: '02',
    title: 'Настройте схему',
    desc: 'Выберите, какие данные вам нужны: имена, email, аватарки или цены. Мы используем под капотом мощный Faker.js.',
  },
  {
    number: '03',
    title: 'Делайте fetch()',
    desc: 'Ваш мок-сервер готов! Отправляйте GET-запросы по публичной ссылке и получайте реалистичный JSON.',
  },
];
</script>

<template>
  <div :class="$style.landing">
    
    <div :class="$style.bgWrapper">
      <div :class="$style.glow" style="top: -20%; left: -10%; background: radial-gradient(circle, rgba(38, 166, 154, 0.15) 0%, transparent 70%);"></div>
      <div :class="$style.glow" style="bottom: 10%; right: -10%; background: radial-gradient(circle, rgba(38, 166, 154, 0.1) 0%, transparent 70%);"></div>
    </div>

    <section :class="$style.hero">
      <div :class="$style.heroText">
        <div :class="$style.badge" v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }">
          🚀 RusAPI Beta 0.1
        </div>
        <h1 :class="$style.title" v-motion :initial="{ opacity: 0, y: 30 }" :enter="{ opacity: 1, y: 0, transition: { delay: 100 } }">
          Ваш фронтенд больше <br/>
          не ждет <span :class="$style.highlight">бэкенд</span>
        </h1>
        <p :class="$style.subtitle" v-motion :initial="{ opacity: 0, y: 30 }" :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }">
          Генерируйте реалистичные мок-данные по кастомным схемам за пару кликов.
          Идеально для пет-проектов, прототипирования и тестирования интерфейсов.
        </p>
        <div :class="$style.actions" v-motion :initial="{ opacity: 0, y: 30 }" :enter="{ opacity: 1, y: 0, transition: { delay: 300 } }">
          <button :class="$style.btnPrimary" @click="router.push('/signup')">Создать API бесплатно</button>
          <button :class="$style.btnSecondary" @click="router.push('/docs')">Читать документацию</button>
        </div>
      </div>
    </section>

    <section :class="$style.stepsSection">
      <h2 :class="$style.sectionTitle" v-motion-slide-visible-once-bottom>Всё просто как 1-2-3</h2>
      <div :class="$style.stepsGrid">
        <div 
          v-for="(step, i) in steps" 
          :key="step.number" 
          :class="$style.stepCard"
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :visible-once="{ opacity: 1, y: 0, transition: { delay: i * 150 } }"
        >
          <div :class="$style.stepNumber">{{ step.number }}</div>
          <h3 :class="$style.stepTitle">{{ step.title }}</h3>
          <p :class="$style.stepDesc">{{ step.desc }}</p>
        </div>
      </div>
    </section>

    <section :class="$style.showcaseSection">
      <div :class="$style.showcaseContainer" v-motion-slide-visible-once-bottom>
        <div :class="$style.showcaseText">
          <h2>Настоящий JSON,<br/>готовый к работе</h2>
          <p>Вам не нужно хардкодить данные прямо в компонентах. Обращайтесь к RusAPI так же, как вы бы обращались к реальному серверу.</p>
          <ul :class="$style.checkList">
            <li><QIcon name="check_circle" color="secondary" /> Поддержка CORS</li>
            <li><QIcon name="check_circle" color="secondary" /> Работает из браузера и Node.js</li>
            <li><QIcon name="check_circle" color="secondary" /> Мгновенный ответ сервера</li>
          </ul>
        </div>
        
        <div :class="$style.codeWindow">
          <div :class="$style.codeHeader">
            <span :class="$style.dot" style="background: #ff5f56"></span>
            <span :class="$style.dot" style="background: #ffbd2e"></span>
            <span :class="$style.dot" style="background: #27c93f"></span>
            <span :class="$style.fileName">app.ts</span>
          </div>
          <pre :class="$style.codeBody"><code><span style="color: #c678dd">const</span> fetchUsers = <span style="color: #c678dd">async</span> () => {
  <span style="color: #c678dd">const</span> res = <span style="color: #c678dd">await</span> <span style="color: #61afef">fetch</span>(<span style="color: #98c379">'https://rusapi.com/mock/Vx9_k2m/users'</span>);
  <span style="color: #c678dd">const</span> data = <span style="color: #c678dd">await</span> res.<span style="color: #61afef">json</span>();
  
  <span style="color: #5c6370">// Result:</span>
  <span style="color: #5c6370">// [</span>
  <span style="color: #5c6370">//   { "id": "uuid-1", "name": "Иван", "email": "ivan@mail.ru" },</span>
  <span style="color: #5c6370">//   { "id": "uuid-2", "name": "Анна", "email": "anna@mail.ru" }</span>
  <span style="color: #5c6370">// ]</span>
  
  <span style="color: #c678dd">return</span> data;
};</code></pre>
        </div>
      </div>
    </section>

    <section :class="$style.ctaSection" v-motion-slide-visible-once-bottom>
      <div :class="$style.ctaBox">
        <h2>Хватит хардкодить. Пора разрабатывать.</h2>
        <p>Зарегистрируйтесь сейчас и создайте свой первый мок-эндпоинт менее чем за минуту.</p>
        <button :class="$style.btnPrimary" @click="router.push('/signup')">Перейти к регистрации</button>
      </div>
    </section>
  </div>
</template>

<style lang="scss" module>
$primary: #26a69a;
$dark: #0f172a;
$text-main: #1e293b;
$text-muted: #64748b;
$bg-light: #ffffff;
$bg-gray: #f8fafc;

.landing {
  width: 100%;
  font-family: 'Inter', system-ui, sans-serif;
  color: $text-main;
  position: relative; /* Убрано overflow-x: hidden */
}

/* Обертка для фоновых эффектов */
.bgWrapper {
  position: absolute;
  inset: 0;
  overflow: hidden; /* Скрывает горизонтальный скролл только для фона */
  z-index: 0;
  pointer-events: none;
}

/* Глоу-эффект на фоне */
.glow {
  position: absolute;
  width: 800px;
  height: 800px;
}

/* --- HERO --- */
.hero {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 20px;
  position: relative;
  z-index: 1;
}

.heroText {
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.badge {
  background: rgba($primary, 0.1);
  color: color-mix(in srgb, $primary 80%, black);
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 24px;
  border: 1px solid rgba($primary, 0.2);
}

.title {
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 24px;
  letter-spacing: -0.02em;
}

.highlight {
  color: $primary;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 4px;
    left: 0;
    width: 100%;
    height: 12px;
    background: rgba($primary, 0.2);
    z-index: -1;
  }
}

.subtitle {
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: $text-muted;
  max-width: 600px;
  line-height: 1.6;
  margin-bottom: 40px;
}

.actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
}

.btnPrimary {
  background: $primary;
  color: white;
  border: none;
  padding: 14px 28px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: color-mix(in srgb, $primary 90%, black);
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba($primary, 0.2);
  }
}

.btnSecondary {
  background: transparent;
  color: $text-main;
  border: 1px solid #e2e8f0;
  padding: 14px 28px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: $bg-gray;
    border-color: #cbd5e1;
  }
}

/* --- STEPS --- */
.stepsSection {
  padding: 80px 20px;
  background: $bg-gray;
  position: relative;
  z-index: 1;
}

.sectionTitle {
  text-align: center;
  font-size: clamp(2rem, 3vw, 2.5rem);
  font-weight: 800;
  margin-bottom: 60px;
}

.stepsGrid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
}

.stepCard {
  background: white;
  padding: 40px 30px;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f5f9;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
}

.stepNumber {
  font-size: 4rem;
  font-weight: 900;
  color: rgba($primary, 0.1);
  position: absolute;
  top: -10px;
  right: 20px;
  line-height: 1;
}

.stepTitle {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 12px;
  position: relative;
  z-index: 2;
}

.stepDesc {
  color: $text-muted;
  line-height: 1.6;
  position: relative;
  z-index: 2;
}

/* --- SHOWCASE --- */
.showcaseSection {
  padding: 100px 20px;
  background: white;
}

.showcaseContainer {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 60px;
  
  @media (max-width: 900px) {
    flex-direction: column;
  }
}

.showcaseText {
  flex: 1;
  
  h2 {
    font-size: clamp(2rem, 3vw, 2.5rem);
    font-weight: 800;
    margin-bottom: 24px;
    line-height: 1.2;
  }
  
  p {
    font-size: 1.125rem;
    color: $text-muted;
    line-height: 1.7;
    margin-bottom: 32px;
  }
}

.checkList {
  list-style: none;
  padding: 0;
  
  li {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 16px;
    color: $text-main;
  }
}

.codeWindow {
  flex: 1;
  width: 100%;
  background: #282c34;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.codeHeader {
  background: #21252b;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.fileName {
  color: #abb2bf;
  font-size: 13px;
  margin-left: auto;
  font-family: monospace;
}

.codeBody {
  margin: 0;
  padding: 24px;
  font-family: 'Fira Code', 'Courier New', Courier, monospace;
  font-size: 14px;
  line-height: 1.6;
  color: #abb2bf;
  overflow-x: auto;
}

/* --- CTA --- */
.ctaSection {
  padding: 80px 20px 120px;
  display: flex;
  justify-content: center;
}

.ctaBox {
  background: $dark;
  color: white;
  padding: 60px 40px;
  border-radius: 24px;
  text-align: center;
  max-width: 800px;
  width: 100%;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  
  h2 {
    font-size: clamp(1.75rem, 3vw, 2.5rem);
    font-weight: 800;
    margin-bottom: 16px;
  }
  
  p {
    color: #94a3b8;
    font-size: 1.125rem;
    margin-bottom: 32px;
  }
}
</style>