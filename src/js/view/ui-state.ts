import {
  MapSize,
} from "./map-state"

const cursorPoint = {
  x: Math.floor(MapSize.width / 2),
  y: 0,
}

export const uiState = {
  cursorPoint,
  horiPower: 100,
  isOpenInfo: false,
  // 表示倍率
  magnification: 2,
}
