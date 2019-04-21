import {
	utils,
	Application,
	loader,
	Sprite,
	Rectangle,
} from "pixi.js"

const {
	isWebGLSupported,
	TextureCache,
} = utils

import {
	MapAssign,
	mapState,
	MapSize,
	TileType,
	MapType,
	tileState2Tile,
} from "./map-state"

import {
  uiState,
} from "./ui-state"

import Keyboard from "../controller/keyboard"

// TODO import のルートを@にアサインするやつとかやりたい

const TILE_SIZE = 16

const type = (isWebGLSupported()) ? "WebGL" : "canvas"
utils.sayHello(type)

const mapWidth = 50
const mapHeight = 34

const app = new Application({
  /*
	width: 800,
  height: 600,
  */
	/*
	width: MapSize.width * TILE_SIZE,
	height: MapSize.height * TILE_SIZE,
  */
  width: mapWidth * TILE_SIZE,
  height: mapHeight * TILE_SIZE,
	antialias: true,
	transparent: false,
	resolution: 1,
})
app.renderer.backgroundColor = 0xbbbbbb

document.body.appendChild(app.view)

// ----------------------------------------

const mapchipFiles: { [k: number]: string } = {
	[MapAssign.zero]: "mapchip/mapchip_425.png",
	[MapAssign.nourishment1]: "mapchip/mapchip_332.png",
	[MapAssign.nourishment2]: "mapchip/mapchip_077.png",
	[MapAssign.nourishment3]: "mapchip/mapchip_227.png",
}


const renderMap = (map: MapType, ui: typeof uiState): void => {
	map.forEach((row, rowIndex) => {
		if (
			rowIndex < ui.cursorPoint.y - Math.floor(Math.floor(mapHeight / 2 - 1) / ui.magnification) ||
			rowIndex > ui.cursorPoint.y + Math.floor(Math.floor(mapHeight / 2 - 1) / ui.magnification)
		) {
			// 見えていない部分はスキップ
			return
    }

		row.forEach((column, columnIndex) => {
      if (
        columnIndex < ui.cursorPoint.x - Math.floor(Math.floor(mapWidth / 2 - 1) / ui.magnification) ||
        columnIndex > ui.cursorPoint.x + Math.floor(Math.floor(mapWidth / 2 - 1) / ui.magnification)
      ) {
        // 見えていない部分はスキップ
				return
			}

			const assign = tileState2Tile(column)

			if (assign !== MapAssign.none) {
				const tile = new Sprite(loader.resources[mapchipFiles[assign]].texture)
				tile.x = TILE_SIZE * (columnIndex - ui.cursorPoint.x) * ui.magnification + (TILE_SIZE * Math.floor((mapWidth - 1) / 2))
        tile.y = TILE_SIZE * (rowIndex - ui.cursorPoint.y) * ui.magnification + (TILE_SIZE * Math.floor((mapHeight - 1) / 2))
        tile.scale.set(ui.magnification, ui.magnification)
				app.stage.addChild(tile)
			}

			const frame = new Sprite(loader.resources["mapchip_frame.png"].texture)
			frame.x = TILE_SIZE * (columnIndex - ui.cursorPoint.x) * ui.magnification + (TILE_SIZE * Math.floor((mapWidth - 1) / 2))
			frame.y = TILE_SIZE * (rowIndex - ui.cursorPoint.y) * ui.magnification + (TILE_SIZE * Math.floor((mapHeight - 1) / 2))
      frame.scale.set(ui.magnification, ui.magnification)
			app.stage.addChild(frame)
		})
	})
}

const renderUi = (map: MapType): void => {
  const cursor = new Sprite(loader.resources["cursor-tile.png"].texture)
  cursor.x = Math.floor((mapWidth - 1) / 2) * TILE_SIZE
  cursor.y = Math.floor((mapHeight - 1) / 2) * TILE_SIZE
  cursor.scale.set(uiState.magnification, uiState.magnification)
  app.stage.addChild(cursor)
}

const gameLoop = (delta: number) => {
}

loader
	.add([
		...Object.values(mapchipFiles),
    "mapchip_frame.png",
    "cursor-tile.png",
	])
	.load(() => {
    renderMap(mapState, uiState)
    renderUi(mapState)

		app.renderer.render(app.stage)
		app.ticker.add(gameLoop)
	})


// http://www.pixijs.com/tutorials
