function createshape(startingX, startingY) {
  const shape = {
    x: startingX,
    y: startingY,
    goingRight: true,
    goingUp: false,
    checkAllSides() {
      if (this.x > 1400) {
        this.goingRight = false;
      }
      if (this.x < -30) {
        this.goingRight = true;
      }
      if (this.y > 800) {
        this.goingUp = true;
      }
      if (this.y < 0) {
        this.goingUp = false;
      }
    },
    move() {
      if (this.goingRight) {
        this.x = this.x + 1;
      } else {
        this.x = this.x - 1;
      }
      if (this.goingUp) {
        this.y = this.y - 3;
      } else {
        this.y = this.y + 3;
      }
    },
  };
  return shape;
}

const joscha = {
  name: "joscha",
  superpower: "programming",
};
