import GameObject from "~/object/GameObject"

export default class WorldObject extends GameObject {
	constructor(public nourishment: number = 0, public magicment: number = 0) {
		super()
	}
}

