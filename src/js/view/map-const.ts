import { Sprite } from "pixi.js"
import Creature from "../object/Creature"

export const MapSize = {
  width: 60,
  height: 72,
}

export const MapAssign = {
  none: 0,
  zero: 1,
  nourishment1: 2,
  nourishment2: 3,
  nourishment3: 4,
}

export const MapchipFiles: { [k: number]: string } = {
  // TODO これ none も透明なタイルをアサインしておくほうがよさそう
  [MapAssign.zero]: "mapchip/mapchip_425.png",
  [MapAssign.nourishment1]: "mapchip/mapchip_332.png",
  [MapAssign.nourishment2]: "mapchip/mapchip_077.png",
  [MapAssign.nourishment3]: "mapchip/mapchip_227.png",
}

export type TileType = {
  broken: boolean
  nourishment: number
  magicment: number
  sprite: Sprite | null
  creatures: Array<Creature>
}
