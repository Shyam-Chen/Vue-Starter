import Stepper from './Stepper.vue';
import StepperContent from './StepperContent.vue';
import StepperStep from './StepperStep.vue';

Stepper.Step = StepperStep;
Stepper.Content = StepperContent;

export default Stepper as typeof Stepper & {
  Step: typeof StepperStep;
  Content: typeof StepperContent;
};
