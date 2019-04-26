import { MapAssign, TileType } from "./map-const"

const tileState2Tile = (tile: TileType): number => {
  // TODO magicment
  if (tile.broken) {
    return MapAssign.none
  }

  if (tile.nourishment === 0) {
    return MapAssign.zero
  }
  if (tile.nourishment <= 9) {
    return MapAssign.nourishment1
  }
  if (tile.nourishment <= 16) {
    return MapAssign.nourishment2
  }

  return MapAssign.nourishment3
}

export default tileState2Tile
