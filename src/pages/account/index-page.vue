<script setup lang="ts">
import {
  UserProfileWidget,
  UserSecurityWidget,
  UserDangerZoneWidget,
} from 'src/widgets/account-settings/ui';
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.profileWidgetContainer">
      <UserProfileWidget />
    </div>

    <div :class="$style.settingsWidgetsContainer">
      <div :class="$style.securityWidgetContainer">
        <UserSecurityWidget />
      </div>

      <div :class="$style.dangerZoneWidgetContainer">
        <UserDangerZoneWidget />
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.container {
  padding: 16px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  gap: 32px;
}

.pageTitle {
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 8px 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  letter-spacing: -0.5px;
}
.profileWidgetContainer {
  flex: 3;
}
.settingsWidgetsContainer {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
