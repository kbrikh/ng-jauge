import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-jauge',
    templateUrl: './jauge.component.html',
    styleUrls: ['./jauge.component.css'],
})
export class JaugeComponent implements OnInit {
    @Input() color;
    @Input() percent;
    @Input() card: boolean = true;
    public myIntervals;
    public min = 0;
    public canvas;
    public radius = 90;
    public canvasWidth = 300;
    public canvasHeight = 300;

    constructor(private elm: ElementRef) {}

    ngOnInit(): void {
        this.canvas = this.elm.nativeElement.querySelector('#score canvas');
        this.percent = parseInt(this.percent, 10);

        if (this.percent > 0 && this.percent <= 100) {
            this.myIntervals = setInterval(
                this.increment.bind(this, this.percent),
                10
            );
        } else {
            this.percent = 0;
            this.increment(this.percent);
        }
    }

    /*
     **	setInterval de increment(min, max, target)
     **	@param max: int - entre 0 et 100
     */
    increment(max): any {
        if (max) {
            if (this.min > max - 1) {
                clearInterval(this.myIntervals);
                return;
            }
            this.min += 1;

            this.circle(this.min);
        } else {
            this.circle(this.min);
        }
    }

    /*
     **	Fonction qui dessine le cercle
     **	@param i:number - nombre de 0 à 100
     **	@param target : elt HTML - l'élément canvas cible
     */
    circle(i): any {
        const data = parseInt(i, 10);
        const cx = this.canvasWidth / 2;
        const cy = this.canvasHeight / 2;

        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;

        const context = this.canvas.getContext('2d');
        context.font = '30px Arial';
        context.fillText(data + '%', 130, 150);
        context.beginPath();
        context.arc(cx, cy, this.radius, 0, 2 * Math.PI);
        context.lineWidth = '20';
        context.strokeStyle = '#fff';
        context.shadowOffsetX = 2;
        context.shadowBlur = 10;
        context.shadowColor = 'rgba(0,0,0,0.1)';

        context.stroke();

        if (data) {
            context.beginPath();
            context.arc(
                cx,
                cy,
                this.radius,
                (-1 / 2) * Math.PI,
                (data / 100) * 2 * Math.PI - (1 / 2) * Math.PI
            );
            context.lineWidth = '20';
            context.strokeStyle = this.color;
            context.shadowOffsetX = 3;
            context.shadowBlur = 10;
            context.shadowColor = 'rgba(0,0,0,0.2)';

            context.stroke();
        }
    }
}
