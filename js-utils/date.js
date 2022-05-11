import { format } from 'date-fns';

const DEFAULT_PRESET = 'MMM d, yyyy';
const SHORT_DATE_PRESET = 'MMM d, yyyy';
const LONG_DATE_PRESET = 'MMMM d, yyyy';

const presets = {
  default: DEFAULT_PRESET,
  short: SHORT_DATE_PRESET,
  long: LONG_DATE_PRESET,
};

export function formatDate(
  date = new Date(),
  { format: fmt, preset = 'default' } = {},
) {
  const formatStr = fmt ? fmt : presets[preset];
  return format(date, formatStr);
}
