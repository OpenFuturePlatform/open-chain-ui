import * as moment from 'moment';
import { TimeFormat } from '../const/time-formats';

export const formatDate = (value: number | string, format: TimeFormat = TimeFormat.YYYY_MM_DD_hh_mm_ss_z) =>
  value ? moment.utc(value).format(format) : '-';
