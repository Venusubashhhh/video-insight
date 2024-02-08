import { atom } from "recoil";
const comment = atom({
  key: "commentHistory",
  default: [],
});
export { comment };