export default class Keyboard {
	private isDown = false
	private isUp = true

	// 何をハンドラの引数にするかは要検討
	constructor(
		private keyType: string,
		private onPress: () => void,
		private onRelease: () => void,
	) {
		window.addEventListener("keydown", this.downHandler, false)
		window.addEventListener("keyup", this.upHandler, false)
	}

	unsubscribe() {
		window.removeEventListener("keydown", this.downHandler)
		window.removeEventListener("keyup", this.upHandler)
	}

	private downHandler(event: KeyboardEvent) {
		if (event.key === this.keyType) {
			if (this.isUp) {
				this.onPress()
			}

			this.isDown = true
			this.isUp = false
			event.preventDefault()
		}
	}

	private upHandler(event: KeyboardEvent) {
		if (event.key === this.keyType) {
			if (this.isDown) {
				this.onRelease()
			}

			this.isDown = false
			this.isUp = true
			event.preventDefault()
		}
	}
}
