export class Plane {
  constructor(canvas, ctx, maxWidth, maxHeight, tiles) {
    this.canvas = canvas;
    this.context = ctx;

    this.divisions = canvas.width / tiles - 1;
    this.tiles = tiles;

    this.maxWidth = maxWidth;
    this.maxHeight = maxHeight;
  }

  vectors = [];

  drawFullPlane() {

      this.xOrigin = this.canvas.width / 2;
      this.yOrigin = this.canvas.height / 2;
      
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
      
      for (let i = 0; i < this.tiles*3; i++) {
          
          // Addeds lines after y-axis.
          this.context.moveTo(this.xOrigin + i*this.divisions, 0);
          this.context.lineTo(this.xOrigin + i*this.divisions, this.maxHeight);
          
          // Addeds lines before y-axis.
          this.context.moveTo(this.xOrigin - i*this.divisions, 0);
          this.context.lineTo(this.xOrigin - i*this.divisions, this.maxHeight);
          
          this.context.moveTo(0, this.yOrigin + i*this.divisions);
          this.context.lineTo(this.maxWidth, this.yOrigin + i*this.divisions);
          
          this.context.moveTo(0, this.yOrigin - i*this.divisions);
          this.context.lineTo(this.maxWidth, this.yOrigin - i*this.divisions);
      }
      
      this.context.stroke();
      this.context.closePath();
  }

  // This will only draw the first quadrant making the bottom left it's origin
  drawFirstQuadrant(drawGrid: boolean) {

    this.xOrigin = 20;
    this.yOrigin = this.canvas.height - 20;

    // This draws the main two axis.
    this.context.beginPath();
    this.context.strokeStyle = "white";
    this.context.lineWidth = 2;
    
    this.context.moveTo(20, this.yOrigin);
    this.context.lineTo(this.maxWidth - 20, this.yOrigin);
    this.context.moveTo(this.xOrigin, 20);
    this.context.lineTo(this.xOrigin, this.maxHeight - 20);
    
    this.context.stroke();
    this.context.closePath();

    this.drawCircle( 20, 20, 4, true, 'white');
    this.drawCircle(this.maxWidth - 20, this.maxHeight - 20, 4, true, 'white');

    if (drawGrid) {
      this.context.beginPath();
      this.context.strokeStyle = "white";
      this.context.lineWidth = 0.1;

      for (let i = 0; i < this.tiles; i++) {
        this.context.moveTo(this.xOrigin + i*this.divisions, 20);
        this.context.lineTo(this.xOrigin + i*this.divisions, this.maxHeight - 20);

        this.context.moveTo(20, this.yOrigin - i*this.divisions);
        this.context.lineTo(this.maxWidth - 20, this.yOrigin - i*this.divisions);
      }
      this.context.stroke();
      this.context.closePath();
    }
  }

  drawMainVector(showText) {
    this.mainVector = {
      x: 2,
      y: 3,
    }

    this.context.beginPath();
    this.context.strokeStyle = "green";
    this.context.lineWidth = 3;

    this.context.moveTo(this.xOrigin, this.yOrigin);
    this.context.lineTo(this.xOrigin + this.mainVector.x*this.divisions, this.yOrigin - this.mainVector.y*this.divisions);

    this.context.stroke();
    this.context.closePath();

    if (showText) {
      this.context.fillStyle = "green";
      this.context.fillText(`( ${this.mainVector.x}, ${this.mainVector.y} )`, this.xOrigin + this.mainVector.x*this.divisions, this.yOrigin - this.mainVector.y*this.divisions);
    }
  }

  updateMainVector(x, y, showText) {
    this.mainVector = {
      x: x,
      y: y
    }

    this.context.beginPath();
    this.context.strokeStyle = "green";
    this.context.lineWidth = 3;

    this.context.moveTo(this.xOrigin, this.yOrigin);
    this.context.lineTo(this.xOrigin + x*this.divisions, this.yOrigin - y*this.divisions);

    this.context.stroke();
    this.context.closePath();

    this.drawCircle(this.xOrigin + x*this.divisions, this.yOrigin - y*this.divisions, 8, true, 'green');

    if (showText) {
      this.context.fillStyle = "green";
      this.context.font = 'bold 1.3rem sans-serif';
      this.context.fillText(`( ${this.mainVector.x}, ${this.mainVector.y} )`, this.xOrigin + x*this.divisions + 10, this.yOrigin - y*this.divisions - 20);
    }
  }

  drawFloatingVector(x1, y1, x2, y2, showText) {
    // Draw the vector
    this.context.beginPath();
    this.context.strokeStyle = "green";
    this.context.lineWidth = 3;

    this.context.moveTo(this.xOrigin + x1*this.divisions, this.yOrigin - y1*this.divisions);
    this.context.lineTo(this.xOrigin + x2*this.divisions, this.yOrigin - y2*this.divisions);
    
    this.context.stroke();
    this.context.closePath();

    // Draw the tips for the vector
    this.drawCircle(this.xOrigin + x1*this.divisions, this.yOrigin - y1*this.divisions, 8, true, 'green');
    this.drawCircle(this.xOrigin + x2*this.divisions, this.yOrigin - y2*this.divisions, 8, true, 'green');

    // Draw the coordinates at the tip of the vector
    if (showText) {
      this.context.fillStyle = "green";
      this.context.font = 'bold 1.3rem sans-serif';
      this.context.fillText(`( ${x1}, ${y1} )`, this.xOrigin + x1*this.divisions, this.yOrigin - y1*this.divisions + 30);
      this.context.fillText(`( ${x2}, ${y2} )`, this.xOrigin + x2*this.divisions - 50, this.yOrigin - y2*this.divisions - 20);
    }
  }

  addVector() {
    const newVector = {
      x: this.divisions,
      y: this.divisions,
    }

    this.vectors.push(newVector);
  }

	drawCircle(xCord: number, yCord: number, r: number, filled: boolean, color: string) {
		this.context.beginPath();
		this.context.fillStyle = color;
		this.context.lineWidth = 3;
		this.context.arc(xCord, yCord, r, 0, Math.PI * 2, false);
    if (filled) this.context.fill();
		this.context.closePath();
	}
}

