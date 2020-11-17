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
        const targetElt = this.elm.nativeElement.querySelector('#score canvas');
        this.percent = parseInt(this.percent, 10);

        if (this.percent > 0 && this.percent <= 100) {
            this.myIntervals = setInterval(
                this.increment.bind(this, this.percent, targetElt),
                10
            );
        } else {
            this.percent = 0;
            this.increment(this.percent, targetElt);
        }
    }

    /*
     **	setInterval de increment(min, max, target)
     **	@param max: int - entre 0 et 100
     **	@param target : elt HTML - la balise canvas cible
     **	@param setIntId : int - id du setInterval
     */
    increment(max, target): any {
        if (max) {
            if (this.min > max - 1) {
                // stop à max
                clearInterval(this.myIntervals);
                return;
            }
            this.min += 1;

            this.circle(this.min, target);
        } else {
            this.circle(this.min, target);
        }
    }

    /*
     **	Fonction qui dessine le cercle
     **	@param i:number - nombre de 0 à 100
     **	@param target : elt HTML - l'élément canvas cible
     */
    circle(i, target): any {
        const data = parseInt(i, 10);
        const cx = this.canvasWidth / 2;
        const cy = this.canvasHeight / 2;

        const canvas = target;
        canvas.width = this.canvasWidth;
        canvas.height = this.canvasHeight;

        const context = canvas.getContext('2d');
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
