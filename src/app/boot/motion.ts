import { boot } from 'quasar/wrappers';
import { MotionPlugin } from '@vueuse/motion';

// Quasar передает сюда инстанс Vue-приложения (app), роутер и т.д.
export default boot(({ app }) => {
  app.use(MotionPlugin);
});
