import {
  Notification,
} from '../../models/Notification';

export const countUnseen = (notifs: Notification[]) => {
  let count = 0;
  notifs.forEach((n) => {
    count += n.seen ? 0 : 1;
  });
  return count;
};