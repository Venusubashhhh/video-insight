import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist'

const { persistAtom} = recoilPersist()

export const chatMessagesState = atom({
  key: "chatMessagesState",
  default: [],
  effects_UNSTABLE: [persistAtom]
});
