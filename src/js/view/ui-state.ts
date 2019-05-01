import { MapSize } from "./map-const"
import Keyboard from "../controller/keyboard"

const initialCursorPoint = {
  x: Math.floor(MapSize.width / 2),
  y: 0,
}

const state = {
  cursorPoint: {
    ...initialCursorPoint,
  },
  horiPower: 100,
  isOpenInfo: false,
  // 表示倍率
  magnification: 2,
}
export type UiStateType = typeof state

export const getUiState = (): typeof state => state

export const updateUiState = (delta: number): void => {
  // TODO
}

// ------------------------------------------------------------
// key listeners

const arrowUpPress = () => {
  if (state.cursorPoint.y > 0) {
    state.cursorPoint.y -= 1
  }
}
const arrowUp = new Keyboard(
  ["ArrowUp", "w"],
  arrowUpPress,
  () => {},
  arrowUpPress,
  3,
)

const arrowDownPress = () => {
  if (state.cursorPoint.y < MapSize.height - 1) {
    state.cursorPoint.y += 1
  }
}
const arrowDown = new Keyboard(
  ["ArrowDown", "s"],
  arrowDownPress,
  () => {},
  arrowDownPress,
  3,
)

const arrowLeftPress = () => {
  if (state.cursorPoint.x > 0) {
    state.cursorPoint.x -= 1
  }
}
const arrowLeft = new Keyboard(
  ["ArrowLeft", "a"],
  arrowLeftPress,
  () => {},
  arrowLeftPress,
  3,
)

const arrowRightPress = () => {
  if (state.cursorPoint.x < MapSize.width - 1) {
    state.cursorPoint.x += 1
  }
}
const arrowRight = new Keyboard(
  ["ArrowRight", "d"],
  arrowRightPress,
  () => {},
  arrowRightPress,
  3,
)

const pushG = new Keyboard(
  "g",
  () => {
    state.cursorPoint = { ...initialCursorPoint }
  },
)
