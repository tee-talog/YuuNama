import * as Pixi from "pixi.js"

const type = (Pixi.utils.isWebGLSupported()) ? "WebGL" : "canvas"
Pixi.utils.sayHello(type)

const app = new Pixi.Application({
	width: 800,
	height: 600,
	antialias: true,
	transparent: false,
	resolution: 1,
})
app.renderer.backgroundColor = 0x999999

document.body.appendChild(app.view)

Pixi.loader
	.add("cat.png").load(() => {
		const mapchip = new Pixi.Sprite(Pixi.loader.resources["cat.png"].texture)
		mapchip.x = 0
		mapchip.y = 0
		mapchip.width = 100
		mapchip.height = 100
		app.stage.addChild(mapchip)

		app.renderer.render(app.stage)
	})

// 続き
// https://github.com/kittykatattack/learningPixi#positioning-sprites

// 元
// http://www.pixijs.com/tutorials
