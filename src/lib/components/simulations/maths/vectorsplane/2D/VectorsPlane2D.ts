import { number, string } from 'mathjs';

export class Plane {
	maxWidth: number;
	maxHeight: number;

	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;

	xOrigin: number;
	yOrigin: number;

	divisions: number;
	zoom: number;

	constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, zoom: number) {
		this.canvas = canvas;
		this.ctx = ctx;

		this.xOrigin = this.canvas.width / 2;
		this.yOrigin = this.canvas.height / 2;

		this.divisions = (canvas.width / zoom) * 2;
		this.zoom = zoom;

		this.maxWidth = canvas.width;
		this.maxHeight = canvas.height;
	}

	drawFullPlane(zoom: number, drawGrid: boolean) {
		this.xOrigin = this.canvas.width / 2;
		this.yOrigin = this.canvas.height / 2;

		this.zoom = zoom;
		this.divisions = this.canvas.width / this.zoom - 1;

		// Draw the X axis
		this.ctx.beginPath();
		this.ctx.strokeStyle = 'red';
		this.ctx.lineWidth = 2;

		this.ctx.moveTo(0, this.yOrigin);
		this.ctx.lineTo(this.maxWidth, this.yOrigin);

		this.ctx.stroke();
		this.ctx.closePath();

		// Draw the Y Axis
		this.ctx.beginPath();
		this.ctx.strokeStyle = 'green';
		this.ctx.lineWidth = 2;

		this.ctx.moveTo(this.xOrigin, 0);
		this.ctx.lineTo(this.xOrigin, this.maxHeight);

		this.ctx.stroke();
		this.ctx.closePath();

		this.drawCircle(0, this.yOrigin, 4, true, 'grey');
		this.drawCircle(this.maxWidth, this.yOrigin, 4, true, 'grey');
		this.drawCircle(this.xOrigin, 0, 4, true, 'grey');
		this.drawCircle(this.xOrigin, this.maxHeight, 4, true, 'grey');

		if (drawGrid) {
			// This draws the grid.
			this.ctx.beginPath();
			this.ctx.strokeStyle = 'grey';
			this.ctx.lineWidth = 0.3;

			for (let i = 0; i < this.zoom; i++) {
				// Addeds lines after y-axis.
				this.ctx.moveTo(this.xOrigin + i * this.divisions, 0);
				this.ctx.lineTo(this.xOrigin + i * this.divisions, this.maxHeight);

				// Addeds lines before y-axis.
				this.ctx.moveTo(this.xOrigin - i * this.divisions, 0);
				this.ctx.lineTo(this.xOrigin - i * this.divisions, this.maxHeight);

				this.ctx.moveTo(0, this.yOrigin + i * this.divisions);
				this.ctx.lineTo(this.maxWidth, this.yOrigin + i * this.divisions);

				this.ctx.moveTo(0, this.yOrigin - i * this.divisions);
				this.ctx.lineTo(this.maxWidth, this.yOrigin - i * this.divisions);
			}

			this.ctx.stroke();
			this.ctx.closePath();
		}
	}

	// This will only draw the first quadrant making the bottom left it's origin
	drawFirstQuadrant(zoom: number, drawGrid: boolean) {
		// Sets the origins a bit further from bottom left to add padding
		this.xOrigin = 20;
		this.yOrigin = this.canvas.height - 20;

		this.zoom = zoom;
		this.divisions = this.canvas.width / this.zoom - 1;

		// This draws the main two axis.
		this.ctx.beginPath();
		this.ctx.strokeStyle = 'red';
		this.ctx.lineWidth = 2;

		this.ctx.moveTo(20, this.yOrigin);
		this.ctx.lineTo(this.maxWidth - 20, this.yOrigin);

		this.ctx.stroke();
		this.ctx.closePath();

		this.ctx.beginPath();
		this.ctx.strokeStyle = 'green';
		this.ctx.lineWidth = 2;

		this.ctx.moveTo(this.xOrigin, 20);
		this.ctx.lineTo(this.xOrigin, this.maxHeight - 20);

		this.ctx.stroke();
		this.ctx.closePath();

		this.drawCircle(20, 20, 4, true, 'green');
		this.drawCircle(this.maxWidth - 20, this.maxHeight - 20, 4, true, 'red');

		this.ctx.beginPath();
		this.ctx.strokeStyle = 'grey';
		this.ctx.lineWidth = 0.3;

		if (drawGrid) {
			for (let i = 0; i < this.zoom * 2; i++) {
				this.ctx.moveTo(this.xOrigin + i * this.divisions, 20);
				this.ctx.lineTo(this.xOrigin + i * this.divisions, this.maxHeight - 20);

				this.ctx.moveTo(20, this.yOrigin - i * this.divisions);
				this.ctx.lineTo(this.maxWidth - 20, this.yOrigin - i * this.divisions);
			}
			this.ctx.stroke();
			this.ctx.closePath();
		}
	}
	// This will only draw the first quadrant making the bottom left it's origin
	drawSecondQuadrant(zoom: number, drawGrid: boolean) {
		// Sets the origins a bit further from bottom left to add padding
		this.xOrigin = this.canvas.width - 20;
		this.yOrigin = this.canvas.height - 20;

		this.zoom = zoom;
		this.divisions = this.canvas.width / this.zoom - 1;

		// This draws the main two axis.
		this.ctx.beginPath();
		this.ctx.strokeStyle = 'red';
		this.ctx.lineWidth = 2;

		this.ctx.moveTo(20, this.yOrigin);
		this.ctx.lineTo(this.maxWidth - 20, this.yOrigin);

		this.ctx.stroke();
		this.ctx.closePath();

		this.ctx.beginPath();
		this.ctx.strokeStyle = 'green';
		this.ctx.lineWidth = 2;

		this.ctx.moveTo(this.xOrigin, 20);
		this.ctx.lineTo(this.xOrigin, this.maxHeight - 20);

		this.ctx.stroke();
		this.ctx.closePath();

		this.drawCircle(this.maxWidth - 20, 20, 4, true, 'green');
		this.drawCircle(20, this.maxHeight - 20, 4, true, 'red');

		this.ctx.beginPath();
		this.ctx.strokeStyle = 'grey';
		this.ctx.lineWidth = 0.3;

		if (drawGrid) {
			for (let i = 0; i < this.zoom * 2; i++) {
				this.ctx.moveTo(this.xOrigin - i * this.divisions, 20);
				this.ctx.lineTo(this.xOrigin - i * this.divisions, this.maxHeight - 20);

				this.ctx.moveTo(20, this.yOrigin - i * this.divisions);
				this.ctx.lineTo(this.maxWidth - 20, this.yOrigin - i * this.divisions);
			}
			this.ctx.stroke();
			this.ctx.closePath();
		}
	}

	// This will only draw the first quadrant making the bottom left it's origin
	drawThirdQuadrant(zoom: number, drawGrid: boolean) {
		// Sets the origins a bit further from bottom left to add padding
		this.xOrigin = this.canvas.width - 20;
		this.yOrigin = 20;

		this.zoom = zoom;
		this.divisions = this.canvas.width / this.zoom - 1;

		// This draws the main two axis.
		this.ctx.beginPath();
		this.ctx.strokeStyle = 'red';
		this.ctx.lineWidth = 2;

		this.ctx.moveTo(20, this.yOrigin);
		this.ctx.lineTo(this.maxWidth - 20, this.yOrigin);

		this.ctx.stroke();
		this.ctx.closePath();

		this.ctx.beginPath();
		this.ctx.strokeStyle = 'green';
		this.ctx.lineWidth = 2;

		this.ctx.moveTo(this.xOrigin, 20);
		this.ctx.lineTo(this.xOrigin, this.maxHeight - 20);

		this.ctx.stroke();
		this.ctx.closePath();

		this.drawCircle(this.maxWidth - 20, this.maxHeight - 20, 4, true, 'green');
		this.drawCircle(20, 20, 4, true, 'red');

		this.ctx.beginPath();
		this.ctx.strokeStyle = 'grey';
		this.ctx.lineWidth = 0.3;

		if (drawGrid) {
			for (let i = 0; i < this.zoom * 2; i++) {
				this.ctx.moveTo(this.xOrigin - i * this.divisions, 20);
				this.ctx.lineTo(this.xOrigin - i * this.divisions, this.maxHeight - 20);

				this.ctx.moveTo(20, this.yOrigin + i * this.divisions);
				this.ctx.lineTo(this.maxWidth - 20, this.yOrigin + i * this.divisions);
			}
			this.ctx.stroke();
			this.ctx.closePath();
		}
	}

	// This will only draw the first quadrant making the bottom left it's origin
	drawFourthQuadrant(zoom: number, drawGrid: boolean) {
		// Sets the origins a bit further from bottom left to add padding
		this.xOrigin = 20;
		this.yOrigin = 20;

		this.zoom = zoom;
		this.divisions = this.canvas.width / this.zoom - 1;

		// This draws the main two axis.
		this.ctx.beginPath();
		this.ctx.strokeStyle = 'red';
		this.ctx.lineWidth = 2;

		this.ctx.moveTo(20, this.yOrigin);
		this.ctx.lineTo(this.maxWidth - 20, this.yOrigin);

		this.ctx.stroke();
		this.ctx.closePath();

		this.ctx.beginPath();
		this.ctx.strokeStyle = 'green';
		this.ctx.lineWidth = 2;

		this.ctx.moveTo(this.xOrigin, 20);
		this.ctx.lineTo(this.xOrigin, this.maxHeight - 20);

		this.ctx.stroke();
		this.ctx.closePath();

		this.drawCircle(20, this.maxHeight - 20, 4, true, 'green');
		this.drawCircle(this.maxWidth - 20, 20, 4, true, 'red');

		this.ctx.beginPath();
		this.ctx.strokeStyle = 'grey';
		this.ctx.lineWidth = 0.3;

		if (drawGrid) {
			for (let i = 0; i < this.zoom * 2; i++) {
				this.ctx.moveTo(this.xOrigin + i * this.divisions, 20);
				this.ctx.lineTo(this.xOrigin + i * this.divisions, this.maxHeight - 20);

				this.ctx.moveTo(20, this.yOrigin + i * this.divisions);
				this.ctx.lineTo(this.maxWidth - 20, this.yOrigin + i * this.divisions);
			}
			this.ctx.stroke();
			this.ctx.closePath();
		}
	}

	drawCircle(xCord: number, yCord: number, r: number, filled: boolean, color: string) {
		this.ctx.beginPath();
		this.ctx.fillStyle = color;
		this.ctx.lineWidth = 3;
		this.ctx.arc(xCord, yCord, r, 0, Math.PI * 2, false);
		if (filled) this.ctx.fill();
		this.ctx.closePath();
	}

	drawVector(x: number, y: number, fillColor: string, showText: boolean) {
		this.ctx.beginPath();
		this.ctx.strokeStyle = fillColor;
		this.ctx.lineWidth = 3;

		this.ctx.moveTo(this.xOrigin, this.yOrigin);
		this.ctx.lineTo(this.xOrigin + x * this.divisions, this.yOrigin - y * this.divisions);

		this.ctx.stroke();
		this.ctx.closePath();

		// Drawing the pointy arrow
		if ((x != 0 && x != null) || (y != 0 && y != null)) {
			const angle = Math.atan2(y, x);
			const arrowLength = 20;
			const arrowAngle = Math.PI / 6;

			const arrowX1 = x * this.divisions - arrowLength * Math.cos(angle - arrowAngle);
			const arrowY1 = y * this.divisions - arrowLength * Math.sin(angle - arrowAngle);

			const arrowX2 = x * this.divisions - arrowLength * Math.cos(angle + arrowAngle);
			const arrowY2 = y * this.divisions - arrowLength * Math.sin(angle + arrowAngle);

			this.ctx.beginPath();
			this.ctx.fillStyle = fillColor;

			this.ctx.moveTo(this.xOrigin + x * this.divisions, this.yOrigin - y * this.divisions); // Move to vector endpoint
			this.ctx.lineTo(this.xOrigin + arrowX1, this.yOrigin - arrowY1); // Arrow left side
			this.ctx.lineTo(this.xOrigin + arrowX2, this.yOrigin - arrowY2); // Arrow right side

			this.ctx.closePath();
			this.ctx.fill();
		}

		if (showText) {
			this.ctx.fillStyle = fillColor;
			this.ctx.fillText(
				`( ${x}, ${y} )`,
				this.xOrigin + x * this.divisions,
				this.yOrigin - y * this.divisions
			);
		}
	}

	drawFloatingVector(x1: number, y1: number, x2: number, y2: number, fillColor: string) {
		const tempElement = document.createElement('span');
		tempElement.style.color = fillColor;
		document.body.appendChild(tempElement);

		// Get the computed color, which will be in RGB format
		const computedColor = getComputedStyle(tempElement).color;
		const finalColor = computedColor.replace('rgb(', 'rgba(').replace(')', ', 0.3)');

		document.body.removeChild(tempElement);

		this.ctx.beginPath();
		this.ctx.strokeStyle = finalColor;
		this.ctx.lineWidth = 3;

		this.ctx.moveTo(this.xOrigin + x1 * this.divisions, this.yOrigin - y1 * this.divisions);
		this.ctx.lineTo(
			this.xOrigin + x1 * this.divisions + x2 * this.divisions,
			this.yOrigin - (y1 * this.divisions + y2 * this.divisions)
		);

		this.ctx.stroke();
		this.ctx.closePath();
	}
}
