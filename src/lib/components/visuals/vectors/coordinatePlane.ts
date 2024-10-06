export class Plane {
  maxWidth: number;
  maxHeight: number;

  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  xOrigin: number;
  yOrigin: number;

  divisions: number;
  tiles: number;

  greenVector = { x: 0, y: 0 }
  redVector = { x: 0, y: 0 }

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, maxWidth: number, maxHeight: number, tiles: number) {
    this.canvas = canvas;
    this.context = ctx;

    this.xOrigin = this.canvas.width / 2;
    this.yOrigin = this.canvas.height / 2;

    this.divisions = canvas.width / tiles - 1;
    this.tiles = tiles;

    this.maxWidth = maxWidth;
    this.maxHeight = maxHeight;
  }

  drawFullPlane() {

    // This draws the main two axis.
    this.context.beginPath();
    this.context.strokeStyle = "white";
    this.context.lineWidth = 2;

    this.context.moveTo(0, this.yOrigin);
    this.context.lineTo(this.maxWidth, this.yOrigin);
    this.context.moveTo(this.xOrigin, 0);
    this.context.lineTo(this.xOrigin, this.maxHeight);

    this.context.stroke();
    this.context.closePath();

    // This draws the grid.
    this.context.beginPath();
    this.context.strokeStyle = "white";
    this.context.lineWidth = 0.2;

    for (let i = 0; i < this.tiles * 3; i++) {

      // Addeds lines after y-axis.
      this.context.moveTo(this.xOrigin + i * this.divisions, 0);
      this.context.lineTo(this.xOrigin + i * this.divisions, this.maxHeight);

      // Addeds lines before y-axis.
      this.context.moveTo(this.xOrigin - i * this.divisions, 0);
      this.context.lineTo(this.xOrigin - i * this.divisions, this.maxHeight);

      this.context.moveTo(0, this.yOrigin + i * this.divisions);
      this.context.lineTo(this.maxWidth, this.yOrigin + i * this.divisions);

      this.context.moveTo(0, this.yOrigin - i * this.divisions);
      this.context.lineTo(this.maxWidth, this.yOrigin - i * this.divisions);
    }

    this.context.stroke();
    this.context.closePath();
  }

  // This will only draw the first quadrant making the bottom left it's origin
  drawFirstQuadrant(drawGrid: boolean) {

    // Sets the origins a bit further from bottom left to add padding
    this.xOrigin = 20;
    this.yOrigin = this.canvas.height - 20;

    if (drawGrid) {
      // This draws the main two axis.
      this.context.beginPath();
      this.context.strokeStyle = "grey";
      this.context.lineWidth = 2;

      this.context.moveTo(20, this.yOrigin);
      this.context.lineTo(this.maxWidth - 20, this.yOrigin);
      this.context.moveTo(this.xOrigin, 20);
      this.context.lineTo(this.xOrigin, this.maxHeight - 20);

      this.context.stroke();
      this.context.closePath();

      this.drawCircle(20, 20, 4, true, 'grey');
      this.drawCircle(this.maxWidth - 20, this.maxHeight - 20, 4, true, 'grey');

      this.context.beginPath();
      this.context.strokeStyle = "grey";
      this.context.lineWidth = 0.3;

      for (let i = 0; i < this.tiles; i++) {
        this.context.moveTo(this.xOrigin + i * this.divisions, 20);
        this.context.lineTo(this.xOrigin + i * this.divisions, this.maxHeight - 20);

        this.context.moveTo(20, this.yOrigin - i * this.divisions);
        this.context.lineTo(this.maxWidth - 20, this.yOrigin - i * this.divisions);
      }
      this.context.stroke();
      this.context.closePath();
    }
  }

  drawGreenVector(showText: boolean) {
    this.context.beginPath();
    this.context.strokeStyle = "green";
    this.context.lineWidth = 3;

    this.context.moveTo(this.xOrigin, this.yOrigin);
    this.context.lineTo(this.xOrigin + this.greenVector.x * this.divisions, this.yOrigin - this.greenVector.y * this.divisions);

    this.context.stroke();
    this.context.closePath();

    if (showText) {
      this.context.fillStyle = "green";
      this.context.fillText(`( ${this.greenVector.x}, ${this.greenVector.y} )`, this.xOrigin + this.greenVector.x * this.divisions, this.yOrigin - this.greenVector.y * this.divisions);
    }
  }

  updateGreenVector(x: number, y: number, showText: boolean) {
    this.greenVector = {
      x: x,
      y: y
    }

    this.context.beginPath();
    this.context.strokeStyle = "green";
    this.context.lineWidth = 3;

    this.context.moveTo(this.xOrigin, this.yOrigin);
    this.context.lineTo(this.xOrigin + x * this.divisions, this.yOrigin - y * this.divisions);

    this.context.stroke();
    this.context.closePath();

    this.drawCircle(this.xOrigin + x * this.divisions, this.yOrigin - y * this.divisions, 8, true, 'green');

    if (showText) {
      this.context.fillStyle = "green";
      this.context.font = 'bold 1.3rem sans-serif';
      this.context.fillText(`( ${this.greenVector.x}, ${this.greenVector.y} )`, this.xOrigin + x * this.divisions + 10, this.yOrigin - y * this.divisions - 20);
    }
  }

  drawRedVector(showText: boolean) {

    this.context.beginPath();
    this.context.strokeStyle = "red";
    this.context.lineWidth = 3;

    this.context.moveTo(this.xOrigin, this.yOrigin);
    this.context.lineTo(this.xOrigin + this.redVector.x * this.divisions, this.yOrigin - this.redVector.y * this.divisions);

    this.context.stroke();
    this.context.closePath();

    if (showText) {
      this.context.fillStyle = "red";
      this.context.fillText(`( ${this.redVector.x}, ${this.redVector.y} )`, this.xOrigin + this.redVector.x * this.divisions, this.yOrigin - this.redVector.y * this.divisions);
    }
  }

  updateRedVector(x: number, y: number, showText: boolean) {
    this.redVector = {
      x: x,
      y: y
    }

    this.context.beginPath();
    this.context.strokeStyle = "red";
    this.context.lineWidth = 3;

    this.context.moveTo(this.xOrigin, this.yOrigin);
    this.context.lineTo(this.xOrigin + x * this.divisions, this.yOrigin - y * this.divisions);

    this.context.stroke();
    this.context.closePath();

    this.drawCircle(this.xOrigin + x * this.divisions, this.yOrigin - y * this.divisions, 8, true, 'red');

    if (showText) {
      this.context.fillStyle = "red";
      this.context.font = 'bold 1.3rem sans-serif';
      this.context.fillText(`( ${this.redVector.x}, ${this.redVector.y} )`, this.xOrigin + x * this.divisions + 10, this.yOrigin - y * this.divisions - 20);
    }
  }

  drawSumVector(x1: number, y1: number, x2: number, y2: number, color: string, showShadow: boolean, v1Color: string, v2Color: string) {
    this.context.beginPath();
    this.context.strokeStyle = color;
    this.context.lineWidth = 3;

    this.context.moveTo(this.xOrigin, this.yOrigin);
    this.context.lineTo(this.xOrigin + (x1 + x2) * this.divisions, this.yOrigin - (y1 + y2) * this.divisions);

    this.context.stroke();
    this.context.closePath();

    if (showShadow) {

      // Create a temporary element to convert color to RGB
      const tempElement = document.createElement("span");
      tempElement.style.color = v1Color;
      document.body.appendChild(tempElement);

      // Get the computed color, which will be in RGB format
      let computedColor = getComputedStyle(tempElement).color;
      const v1ColorFinal = computedColor.replace("rgb(", "rgba(").replace(")", ", 0.3)");

      tempElement.style.color = v2Color;

      computedColor = getComputedStyle(tempElement).color;
      const v2ColorFinal = computedColor.replace("rgb(", "rgba(").replace(")", ", 0.3)");

      document.body.removeChild(tempElement);

      // Convert the RGB color to RGBA with 0.3 opacity

      this.context.beginPath();
      this.context.strokeStyle = v1ColorFinal;
      this.context.lineWidth = 3;

      this.context.moveTo(this.xOrigin + x1 * this.divisions, this.yOrigin - y1 * this.divisions);
      this.context.lineTo(this.xOrigin + (x1 + x2) * this.divisions, this.yOrigin - (y1 + y2) * this.divisions);

      this.context.stroke();
      this.context.closePath();

      this.context.beginPath();
      this.context.strokeStyle = v2ColorFinal;
      this.context.lineWidth = 3;

      this.context.moveTo(this.xOrigin + x2 * this.divisions, this.yOrigin - y2 * this.divisions);
      this.context.lineTo(this.xOrigin + (x1 + x2) * this.divisions, this.yOrigin - (y1 + y2) * this.divisions);

      this.context.stroke();
      this.context.closePath();
    }

    this.drawCircle(this.xOrigin + (x1 + x2) * this.divisions, this.yOrigin - (y1 + y2) * this.divisions, 8, true, color);
  }

  drawFloatingVector(x1: number, y1: number, x2: number, y2: number, showText: boolean, showDots: { head: boolean, tail: boolean }, color) {
    // Draw the vector
    this.context.beginPath();
    this.context.strokeStyle = color;
    this.context.lineWidth = 3;

    this.context.moveTo(this.xOrigin + x1 * this.divisions, this.yOrigin - y1 * this.divisions);
    this.context.lineTo(this.xOrigin + x2 * this.divisions, this.yOrigin - y2 * this.divisions);

    this.context.stroke();
    this.context.closePath();

    // Draw the tips for the vector
    if (showDots.head) this.drawCircle(this.xOrigin + x1 * this.divisions, this.yOrigin - y1 * this.divisions, 8, true, color);
    if (showDots.tail) this.drawCircle(this.xOrigin + x2 * this.divisions, this.yOrigin - y2 * this.divisions, 8, true, color);

    // Draw the coordinates at the tip of the vector
    if (showText) {
      this.context.fillStyle = color;
      this.context.font = 'bold 1.3rem sans-serif';
      this.context.fillText(`( ${x1}, ${y1} )`, this.xOrigin + x1 * this.divisions, this.yOrigin - y1 * this.divisions + 30);
      this.context.fillText(`( ${x2}, ${y2} )`, this.xOrigin + x2 * this.divisions - 50, this.yOrigin - y2 * this.divisions - 20);
    }
  }

  drawCircle(xCord: number, yCord: number, r: number, filled: boolean, color: string) {
    this.context.beginPath();
    this.context.fillStyle = color;
    this.context.lineWidth = 3;
    this.context.arc(xCord, yCord, r, 0, Math.PI * 2, false);
    if (filled) this.context.fill();
    this.context.closePath();
  }

  clear() {
    this.context.clearRect(0, 0, this.maxWidth, this.maxHeight);
  }

  writeText(x: number, y: number, text: string, color: string, size: number) {
    this.context.fillStyle = color;
    this.context.font = `bold ${size}rem sans-serif`;
    this.context.textAlign = "center";
    this.context.textBaseline = "middle";
    this.context.fillText(text, this.xOrigin + x * this.divisions, this.yOrigin - y * this.divisions);
  }
}

