export default class Keyboard {
  private isDown = false
  private isUp = true
  private pressingFrame = 0

  // 何をハンドラの引数にするかは要検討
  constructor(
    private keyType: string | Array<string>,
    private onPress: () => void = () => {},
    private onRelease: () => void = () => {},
    private onPressing: () => void = () => {},
    private runPerFrame: number = 1,
  ) {
    window.addEventListener("keydown", (e) => this.downHandler(e), false)
    window.addEventListener("keyup", (e) => this.upHandler(e), false)
  }

  unsubscribe() {
    window.removeEventListener("keydown", (e) => this.downHandler(e))
    window.removeEventListener("keyup", (e) => this.upHandler(e))
  }

  private isPressedKey(key: string): boolean {
    if ("string" === typeof this.keyType) {
      return key === this.keyType
    }
    return this.keyType.some((e) => e === key)
  }

  private downHandler(event: KeyboardEvent) {
    if (this.isPressedKey(event.key)) {
      if (this.isUp) {
        this.onPress()
      }

      if (this.isDown && this.pressingFrame % this.runPerFrame === 0) {
        this.onPressing()
      }

      this.isDown = true
      this.isUp = false
      this.pressingFrame++
      event.preventDefault()
    }
  }

  private upHandler(event: KeyboardEvent) {
    if (this.isPressedKey(event.key)) {
      if (this.isDown) {
        this.onRelease()
      }

      this.isDown = false
      this.isUp = true
      this.pressingFrame = 0
      event.preventDefault()
    }
  }
}
