


import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist'

const { persistAtom} = recoilPersist()

export const comment = atom({
  key: "commentHistory",
  default: [],
  effects_UNSTABLE: [persistAtom]
});