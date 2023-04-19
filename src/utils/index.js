import { USER } from "../const";

export const ROLE = JSON.parse(localStorage.getItem(USER))?.user.role;
export const USER_ID = JSON.parse(localStorage.getItem(USER))?.user._id;
export const USER_INFO = JSON.parse(localStorage.getItem(USER))?.user;
