/**
 * Created by ash on 11/05/2017.
 */
import { POPUP_OPEN,
  POPUP_CLOSE } from 'constants/sharedConstants';

export function openPopup(content, cssClass = '') {
  return {
    type: POPUP_OPEN,
    cssClass,
    content,
  };
}

export function closePopup() {
  return {
    type: POPUP_CLOSE,
  };
}
