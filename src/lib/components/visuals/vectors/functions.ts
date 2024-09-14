	export class Ball {
		constructor(canvas: HTMLCanvasElement, ctx:CanvasRenderingContext2D, magnitude: number, direction: number, drawer: (ctx: CanvasRenderingContext2D, xCord: number, yCord: number, r: number, filled: boolean) => void) {
      this.canvas = canvas;
      this.ctx = ctx;
      this.drawer = drawer;

      // Initial ball position
      this.x = canvas.width / 2;
      this.y = canvas.height / 2;

      // Converts degree to radian
      let radian = (direction * Math.PI) / 180;

      // Decomposes the magnitude to x and y
      this.vx = magnitude * Math.sin(radian);
      this.vy = -magnitude * Math.cos(radian);
		}

    radius = 50;

    draw() {
      this.drawer(this.ctx, this.x, this.y, 50, true);
      console.log(this.x, this.y)
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x + this.radius > this.canvas.width || this.x < this.radius) this.vx = -this.vx;
      if (this.y + this.radius > this.canvas.height || this.y <= this.radius) this.vy = -this.vy;

      this.draw();
    }
	}

  export function drawLine(ctx, x1, y1, x2, y2, color = 'red', lineWidth = 1) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth; 
    ctx.stroke();
  }

	export function drawCircle(ctx: CanvasRenderingContext2D, xCord: number, yCord: number, r: number, filled: boolean, color = '#a13856') {
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.strokeStyle = 'white';
		ctx.lineWidth = 3;
		ctx.arc(xCord, yCord, r, 0, Math.PI * 2, false);
    if (filled) ctx.fill();
		ctx.stroke();
		ctx.closePath();
	}

	export function rotatePoint(
		x: number,
		y: number,
		angleInDegrees: number,
		originX: number,
		originY: number
	): { x: number; y: number } {
		// Convert the angle to radians
		const angleInRadians = (angleInDegrees * Math.PI) / 180;

		// Translate the point to the origin (if it's not already)
		const translatedX = x - originX;
		const translatedY = y - originY;

		const rotatedX =
			translatedX * Math.cos(angleInRadians) - translatedY * Math.sin(angleInRadians);
		const rotatedY =
			translatedX * Math.sin(angleInRadians) + translatedY * Math.cos(angleInRadians);

		// Translate the point back to its original position
		return {
			x: rotatedX + originX,
			y: rotatedY + originY
		};
	}
