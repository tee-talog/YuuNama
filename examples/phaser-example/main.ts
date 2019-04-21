import Phaser from "phaser"

import "../../assets/ed2-s.png"

// アセットのロード
const preload = function (this: Phaser.Scene) {
	/*
	this.load.setBaseURL("http://labs.phaser.io")

	this.load.image("sky", "assets/skies/space3.png")
	this.load.image("logo", "assets/sprites/phaser3-logo.png")
	this.load.image("red", "assets/particles/red.png")
	*/

	this.load.image("mapchip", "assets/ed2-s.png")
	/*
	this.load.spritesheet("mapchip", "assets/ed2-s.png", {
		frameWidth: 30,
		frameHeight: 16,
	})
	*/
}

const create = function (this: Phaser.Scene) {
	// this.add.image(400, 300, "sky")
	this.add.image(400, 300, "mapchip")

	const particles = this.add.particles("red")

	const emitterConfig: ParticleEmitterConfig = {
		speed: 100,
		scale: {
			start: 1,
			end: 0,
		},
		blendMode: "ADD",
	}
	const emitter = particles.createEmitter(emitterConfig)

	const logo = this.physics.add.image(400, 100, "logo")

	logo.setVelocity(300, 400) // 力を加える
	logo.setBounce(1, 1) // 反発力の設定
	logo.setCollideWorldBounds(true) // ワールドの境界と衝突するかどうか

	emitter.startFollow(logo)
}

const config: GameConfig = {
	type: Phaser.AUTO,
	width: 800,
	height: 400,
	physics: {
		default: "arcade",
		arcade: {
			gravity: {
				y: 3000,
			},
		},
	},
	scene: {
		preload,
		create,
	},
}

const game = new Phaser.Game(config)
