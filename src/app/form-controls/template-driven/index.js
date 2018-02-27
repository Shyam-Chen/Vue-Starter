import TemplateDriven from './TemplateDriven';
import { INITIAL as state } from './constants';
import mutations from './mutations';

const templateDriven = {
  state,
  mutations,
};

export { TemplateDriven, templateDriven };
