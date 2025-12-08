function createshape(startingX, startingY, rightKey, leftkey, upkey, downkey) {
  const shape = {
    rightKey: rightKey,
    leftkey: leftkey,
    upkey: upkey,
    downkey: downkey,
    x: startingX,
    y: startingY,
    goingRight: true,
    goingUp: true,
    checkAllSides() {
      if (this.x > 1400) {
        this.goingRight = false;
      }
      if (this.x < -30) {
        this.goingRight = true;
      }
      if (this.y > 750) {
        this.goingUp = true;
      }
      if (this.y < 0) {
        this.goingUp = false;
      }
    },
    move() {
      if (this.goingRight) {
        this.x = this.x + 3;
      } else {
        this.x = this.x - 3;
      }
      if (this.goingUp) {
        this.y = this.y - 3;
      } else {
        this.y = this.y + 3;
      }
    },
    control(key) {
      if (key == leftkey) {
        this.goingRight = false;
      }
      if (key == this.rightKey) {
        this.goingRight = true;
      }
      if (key == upkey) {
        this.goingUp = true;
      }
      if (key == downkey) {
        this.goingUp = false;
      }
    },
  };
  return shape;
}
const joscha = {
  name: "joscha",
  superpower: "programming",
};
