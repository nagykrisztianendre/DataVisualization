import {getAverageOfHungarianStudents2020} from "../DataQueries/getAverageOfHungarianStudents2020";

class Grades2020Chart extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    disconnectedCallback() {

    }


    render() {
        this.innerHTML = `
<div id="app">
        <div id="chart">
            <svg></svg>
        </div>
        <div id="data">
            <ul></ul>
        </div>
    </div>`;
        getAverageOfHungarianStudents2020().then((data) => {
            const MARGINS = {top:10,bottom:10,left:10,right:10};
            const CHART_WIDTH = 960-MARGINS.left-MARGINS.right;
            const CHART_HEIGHT = 500 -MARGINS.top - MARGINS.bottom;

            const x = d3.scaleBand().rangeRound([0, CHART_WIDTH]).padding(0.1);
            const y = d3.scaleLinear().range([CHART_HEIGHT, 0]);

            x.domain(data.map((d) => d.megye));
            y.domain([0, d3.max(data, (d) => d.media) + 3]);

            const chartContainer = d3
                .select('svg')
                .attr("preserveAspectRatio", "xMinYMin meet")
                .attr("viewBox", `0 0 ${CHART_WIDTH+MARGINS.left+MARGINS.right} ${CHART_HEIGHT+MARGINS.top+MARGINS.bottom}`)
                .classed("svg-content-responsive", true);

            const chart = chartContainer.append('g');

            chart.append('g')
                .call(d3.axisBottom(x).tickSizeOuter(0))
                .attr('transform',`translate(0,${CHART_HEIGHT})`)
                .attr('color','black')
                .attr('font-size','0.6rem');

            chart.append('g')
                .call(d3.axisRight(y).tickSizeOuter(0));

            chart.selectAll('.bar')
                .data(data)
                .enter()
                .append('rect')
                .classed('bar', true)
                .attr('width', x.bandwidth())
                .attr('height', (data) => {
                    return CHART_HEIGHT - y(data.media);
                })
                .attr('x', (data) => {
                    return x(data.megye);
                })
                .attr('y', (data) => {
                    return y(data.media);
                });

            chart
                .selectAll('.label')
                .data(data)
                .enter()
                .append('text')
                .text((data) => data.media)
                .attr('x', data => x(data.megye)+x.bandwidth()/2)
                .attr('y', data => y(data.media) -20)
                .attr('text-anchor','middle')
                .classed('label',true);

            const listItems = d3.select('#data').select('ul')
                .selectAll('li')
                .data(data)
                .enter()
                .append('li');

            listItems.append('span').text(data=>data.megye+" ("+data.studentCount+")");
        });
    }
}

window.customElements.define('grades2020-chart-component', Grades2020Chart);
