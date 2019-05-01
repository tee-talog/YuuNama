import { MapSize } from "./map-const"
import Keyboard from "../controller/keyboard"

const cursorPoint = {
  x: Math.floor(MapSize.width / 2),
  y: 0,
}

const state = {
  cursorPoint,
  horiPower: 100,
  isOpenInfo: false,
  // 表示倍率
  magnification: 2,
}
export type UiStateType = typeof state

export const getUiState = (): typeof state => state

const arrowUp = new Keyboard(
  ["ArrowUp", "w"],
  () => {
    if (state.cursorPoint.y > 0) {
      state.cursorPoint.y -= 1
    }
  },
  () => {},
)
const arrowDown = new Keyboard(
  ["ArrowDown", "s"],
  () => {
    if (state.cursorPoint.y < MapSize.height - 1) {
      state.cursorPoint.y += 1
    }
  },
  () => {},
)
const arrowLeft = new Keyboard(
  ["ArrowLeft", "a"],
  () => {
    if (state.cursorPoint.x > 0) {
      state.cursorPoint.x -= 1
    }
  },
  () => {},
)
const arrowRight = new Keyboard(
  ["ArrowRight", "d"],
  () => {
    if (state.cursorPoint.x < MapSize.width - 1) {
      state.cursorPoint.x += 1
    }
  },
  () => {},
)

export const updateUiState = (delta: number): void => {
  // TODO
}
