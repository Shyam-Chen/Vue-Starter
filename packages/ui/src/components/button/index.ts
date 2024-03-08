import Button from './Button.vue';
import ButtonGroup from './ButtonGroup.vue';

Button.Group = ButtonGroup;

export default Button as typeof Button & {
  Group: typeof ButtonGroup;
};
