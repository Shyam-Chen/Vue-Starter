import * as d from 'date-fns';

export const labelFormat = (date: Date, locale = 'en-US', localDateFormat = 'MM/dd/yyyy') => {
  const useIntl = false;
  return useIntl ? d.intlFormat(date, { locale }) : d.format(date, localDateFormat);
};

export const valueFormat = (date: Date) => {
  const useISO = false;
  return useISO ? date.toISOString() : d.format(date, 'yyyy-MM-dd');
};
