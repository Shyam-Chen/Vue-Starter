import Avatar from './Avatar.vue';
import AvatarGroup from './AvatarGroup.vue';

Avatar.Group = AvatarGroup;

export default Avatar as typeof Avatar & {
  Group: typeof AvatarGroup;
};
