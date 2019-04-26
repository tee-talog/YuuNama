export default class Keyboard {
  private isDown = false
  private isUp = true

  // 何をハンドラの引数にするかは要検討
  constructor(
    private keyType: string,
    private onPress: () => void,
    private onRelease: () => void,
  ) {
    window.addEventListener("keydown", (e) => this.downHandler(e), false)
    window.addEventListener("keyup", (e) => this.upHandler(e), false)
  }

  unsubscribe() {
    window.removeEventListener("keydown", (e) => this.downHandler(e))
    window.removeEventListener("keyup", (e) => this.upHandler(e))
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
