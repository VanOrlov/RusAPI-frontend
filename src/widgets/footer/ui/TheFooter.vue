<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goTo = (path: string) => {
  void router.push(path);
};
</script>

<template>
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
</template>

<style lang="scss" module>
.footer {
  background-color: var(--bg-page);
  color: var(--text-muted);
  border-top: 1px solid var(--border-color)
}
.footerContainer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-inline: 120px;
  height: 64px;
}
.footerLeft {
  display: flex;
  align-items: center;
  gap: 16px;
}
.footerLogo {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-muted);
  letter-spacing: -0.5px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.copyright {
  font-size: 14px;
  color: var(--text-muted);
}
.footerRight {
  display: flex;
  gap: 24px;
}
.footerLink {
  color: var(--text-muted);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s ease;
  cursor: pointer;

  &:hover {
    color: #26a69a;
  }
}

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
