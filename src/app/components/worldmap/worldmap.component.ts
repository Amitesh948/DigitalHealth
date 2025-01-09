import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-worldmap',
  standalone: false,
  templateUrl: './worldmap.component.html',
  styleUrls: ['./worldmap.component.css']
})
export class WorldmapComponent implements AfterViewInit {
  @ViewChild('mapCanvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>; // Ensure static is false

  private ctx!: CanvasRenderingContext2D;

  ngAfterViewInit(): void {
    if (this.canvasRef) {
      const canvas = this.canvasRef.nativeElement;
      this.ctx = canvas.getContext('2d')!;
      this.drawMap();
    }
  }

  private drawMap(): void {
    const width = this.ctx.canvas.width;
    const height = this.ctx.canvas.height;

    this.ctx.fillStyle = '#e0e0e0';
    this.ctx.fillRect(0, 0, width, height);

    // Draw grid lines
    const cellSize = 50;
    this.ctx.strokeStyle = '#cccccc';
    for (let x = 0; x <= width; x += cellSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, height);
      this.ctx.stroke();
    }
    for (let y = 0; y <= height; y += cellSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(width, y);
      this.ctx.stroke();
    }

    this.drawMarker(200, 200, 'red');
  }

  private drawMarker(x: number, y: number, color: string): void {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(x, y, 10, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.strokeStyle = 'black';
    this.ctx.stroke();
  }
}
