import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist'

const { persistAtom} = recoilPersist()

export const Filename = atom({
  key: "Filename",
  default: '',
  effects_UNSTABLE: [persistAtom]
});
