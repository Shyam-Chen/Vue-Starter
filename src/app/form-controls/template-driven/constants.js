export const INITIAL = {
  // input
  nickname: '',
  nicknameRules: [
    () => !!INITIAL.nickname || 'This field is required',
    () => INITIAL.nickname.length <= 15 || 'Word length is too long',
  ],

  // select
  dessert: '',
  dessertList: ['Cakes', 'Cookies', 'Biscuits', 'Gelatins', 'Pastries', 'Ice Creams', 'Pies', 'Puddings', 'Candies'],

  // multiple select
  states: [],
  statesList: [
    'Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California',
    'Colorado', 'Connecticut', 'Delaware', 'District of Columbia',
    'Federated States of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii',
    'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
    'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan',
    'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
    'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina',
    'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon',
    'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina',
    'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
  ],

  // nested select
  pet: '',

  // checkboxes
  technologies: [],
  technologiesList: ['ECMAScript', 'HTML5', 'Node.js', 'Docker'],

  // radios
  gender: '',
  genderList: ['Male', 'Female', ' Other'],

  // switch
  autoplay: false,

  // slider
  volume: 0,

  // autocomplete

  // date picker

  // date range picker

  // time picker

  // color picker

  // file upload
};
