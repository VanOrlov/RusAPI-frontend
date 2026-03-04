<script setup lang="ts">
import type { ProjectDto } from 'src/shared/api/dto';
import { useRouter } from 'vue-router';

defineProps<{
  project: ProjectDto;
}>();

const router = useRouter();

const formatDate = (isoString: string) => {
  return new Date(isoString).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};
</script>

<template>
  <QCard
    flat
    bordered
    :class="$style.projectCard"
    @click="router.push(`/projects/${project.nanoId}`)"
  >
    <QCardSection :class="$style.cardBody">
      <div :class="$style.cardHeader">
        <h3 :class="$style.projectName">{{ project.name }}</h3>
        <QBadge color="grey-2" text-color="grey-8" :class="$style.nanoIdBadge">
          {{ project.nanoId }}
        </QBadge>
      </div>

      <p :class="$style.projectDesc">
        {{ project.description || 'Нет описания' }}
      </p>

      <div :class="$style.cardFooter">
        <div :class="$style.footerMeta">
          <QIcon name="calendar_today" size="14px" :class="$style.metaIcon" />
          <span>Создан {{ formatDate(project.createdAt) }}</span>
        </div>
        <QBtn flat round color="secondary" icon="arrow_forward" size="sm" />
      </div>
    </QCardSection>
  </QCard>
</template>

<style lang="scss" module>
.projectCard {
  border-radius: 8px;
  border-color: #eaeaea;
  background-color: #ffffff;
  transition: all 0.2s ease;
  cursor: pointer;
  height: 100%; /* Чтобы все карточки в сетке были одной высоты */

  &:hover {
    border-color: #26a69a;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(38, 166, 154, 0.1);
  }
}

.cardBody {
  padding: 24px;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.cardHeader {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 12px;
}

.projectName {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: #111;
  line-height: 1.3;
}

.nanoIdBadge {
  font-family: 'Courier New', Courier, monospace;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 6px;
}

.projectDesc {
  font-size: 14px;
  color: #666;
  margin: 0 0 24px 0;
  line-height: 1.5;
  flex-grow: 1;
}

.cardFooter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #eaeaea;
  padding-top: 16px;
  margin-top: auto;
}

.footerMeta {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #888;
}

.metaIcon {
  color: #bbb;
}
</style>
