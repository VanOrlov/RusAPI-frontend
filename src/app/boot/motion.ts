import { boot } from 'quasar/wrappers';
import { MotionPlugin } from '@vueuse/motion';

const directives = {
  'slide-up-fast': {
    initial: { y: 30, opacity: 0 },
    visibleOnce: { y: 0, opacity: 1, transition: { duration: 200 } },
  },
  'slide-up': {
    initial: { y: 30, opacity: 0 },
    visibleOnce: { y: 0, opacity: 1, transition: { duration: 400 } },
  },
  'slide-up-late': {
    initial: { y: 30, opacity: 0 },
    visibleOnce: { y: 0, opacity: 1, transition: { duration: 600 } },
  },
};

export default boot(({ app }) => {
  app.use(MotionPlugin, { directives });
});
