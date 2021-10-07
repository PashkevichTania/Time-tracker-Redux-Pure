import {SET_IS_MESSAGE_POPUP_OPENED, SET_IS_POPUP_OPENED} from "./types";

export function setIsPopupOpened(value) {
    return {
        type: SET_IS_POPUP_OPENED,
        payload: value,
    };
}

export function setIsMessagePopupOpened(value) {
    return {
        type: SET_IS_MESSAGE_POPUP_OPENED,
        payload: value,
    };
}
