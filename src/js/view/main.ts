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

const mapWidth = 48
const mapHeight = 32

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


const renderMap = (map: MapType): void => {
	map.forEach((row, rowIndex) => {
		row.forEach((column, columnIndex) => {
			const assign = tileState2Tile(column)

			if (assign !== MapAssign.none) {
				const tile = new Sprite(loader.resources[mapchipFiles[assign]].texture)
				tile.x = TILE_SIZE * (columnIndex - uiState.cursorPoint.x) * uiState.magnification + (TILE_SIZE * Math.floor(mapWidth / 2))
        tile.y = TILE_SIZE * (rowIndex - uiState.cursorPoint.y) * uiState.magnification + (TILE_SIZE * Math.floor(mapHeight / 2))
        tile.scale.set(uiState.magnification, uiState.magnification)
				app.stage.addChild(tile)
			}

			const frame = new Sprite(loader.resources["mapchip_frame.png"].texture)
			frame.x = TILE_SIZE * (columnIndex - uiState.cursorPoint.x) * uiState.magnification + (TILE_SIZE * Math.floor(mapWidth / 2))
			frame.y = TILE_SIZE * (rowIndex - uiState.cursorPoint.y) * uiState.magnification + (TILE_SIZE * Math.floor(mapHeight / 2))
      frame.scale.set(uiState.magnification, uiState.magnification)
			app.stage.addChild(frame)
		})
	})
}

const renderUi = (): void => {
  const cursor = new Sprite(loader.resources["cursor-tile.png"].texture)
  cursor.x = Math.floor(mapWidth / 2) * TILE_SIZE
  cursor.y = Math.floor(mapHeight / 2) * TILE_SIZE
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
    renderMap(mapState)
    renderUi()

		app.renderer.render(app.stage)
		app.ticker.add(gameLoop)
	})


// http://www.pixijs.com/tutorials
