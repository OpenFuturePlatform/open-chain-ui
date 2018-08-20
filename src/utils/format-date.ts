import * as moment from 'moment';
import { TimeFormat } from '../const/time-formats';

export const formatDate = (value: number | string, format: TimeFormat = TimeFormat.DD_MMM_YYYY_hh_mm_a) =>
  value ? moment(value).format(format) : '-';
