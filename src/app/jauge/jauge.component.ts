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
    private size = 90;

    constructor(private elm: ElementRef) {}

    ngOnInit(): void {
        this.canvas = this.elm.nativeElement.querySelector('#score canvas');

        const targetElt = this.canvas;
        const percentMax = this.percent;

        this.myIntervals = setInterval(
            this.increment.bind(this, percentMax, targetElt),
            10
        );
    }

    /*
     **	setInterval de increment(min, max, target)
     **	@param max: int - entre 0 et 100
     **	@param target : elt HTML - la balise canvas cible
     **	@param setIntId : int - id du setInterval
     */
    increment(max, target): any {
        if (this.min > max - 1) {
            // stop à max
            clearInterval(this.myIntervals);
            return;
        }
        this.min += 1;

        this.circle(this.min, target);
    }

    /*
     **	Fonction qui dessine le cercle
     **	@param i:number - nombre de 0 à 100
     **	@param target : elt HTML - l'élément canvas cible
     */
    circle(i, target): any {
        let data = i;

        const color = this.color;
        const canvas = target;
        canvas.width = '300';
        canvas.height = '300';

        data = parseInt(data, 10);

        const context = canvas.getContext('2d');
        context.font = '30px Arial';
        context.fillText(data + '%', 130, 150);
        context.beginPath();
        // context.arc(150, 150, this.size, Math.PI / 2, (3 / 2) * Math.PI);
        context.arc(150, 150, this.size, 0, 2 * Math.PI);
        context.lineWidth = '20';
        context.strokeStyle = '#fff';
        context.shadowOffsetX = 2;
        context.shadowBlur = 10;
        context.shadowColor = 'rgba(0,0,0,0.1)';

        context.stroke();

        context.beginPath();
        context.arc(
            150,
            150,
            this.size,
            (-1 / 2) * Math.PI,
            (data / 100) * 2 * Math.PI - (1 / 2) * Math.PI
        );
        context.lineWidth = '20';
        context.strokeStyle = color;
        context.shadowOffsetX = 3;
        context.shadowBlur = 10;
        context.shadowColor = 'rgba(0,0,0,0.2)';

        context.stroke();
    }
}
