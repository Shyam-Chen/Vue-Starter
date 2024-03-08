import Timeline from './Timeline.vue';
import TimelineItem from './TimelineItem.vue';

Timeline.Item = TimelineItem;

export default Timeline as typeof Timeline & {
  Item: typeof TimelineItem;
};
