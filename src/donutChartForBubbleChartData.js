import "../css/header-component.scss"
import {separatedGrades, separatedGradesMagyar} from "../DataQueries/getSeparatedGrades";

class DonutChartForBubbleChartData extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.menubar = null;
        this.render();
    }

    disconnectedCallback() {

    }

    render() {
        let container = document.createElement('div');
        container.classList.add('piechart-container');
        let containerMagyar = document.createElement('div');
        containerMagyar.classList.add('piechart-container');
        let header = document.createElement('h3');
        header.innerText = `A Maros megyében vizsgázott tanulók jegyei:`;
        this.append(header);

        let innerHeader = document.createElement('h3');
        innerHeader.innerText = `A Maros megyében vizsgázott magyar tanulók jegyei:`;

        this.append(container);
        this.append(innerHeader);
        this.append(containerMagyar);

        for (let i = 2015; i <= 2020; i++) {
            if (i === 2018) {
                continue;
            }
            const containerChart = document.createElement('div');
            containerChart.classList.add(`donutchart${i}`);
            const containerChartMagyar = document.createElement('div');
            containerChartMagyar.classList.add(`donutchartmagyar${i}`);
            container.append(containerChart);
            containerMagyar.append(containerChartMagyar);
            separatedGrades(i).then(data => {
                const div = d3.select(`.donutchart${i}`);
                const width = window.innerWidth / 5;
                const height = window.innerHeight / 5;
                const radius = Math.min(width, height) / 2;
                const colorScale = d3.scaleOrdinal(["#E53935", "#D81B60", "#8E24AA", "#5E35B1", "#3949AB", "#1E88E5", "#039BE5", "#00ACC1", "#00897B", "#43A047", "#7CB342", "#C0CA33", "#FDD835", "#FFB300", "#FB8C00", "#F4511E", "#6D4C41", "#757575", "#546E7A"]);
                const svg = div.append('svg')
                    .attr('width', height)
                    .attr('height', height)
                    .append('g')
                    .attr('transform', `translate(${height / 2},${height / 2})`);
                const pie = d3.pie().value(d => d.value).sort(null);
                const arc = d3.arc().outerRadius(radius * 0.8).innerRadius(radius*0.6);
                const hoverArc = d3.arc().outerRadius(radius * 0.9).innerRadius(radius*0.65);

                const g = svg.selectAll('.arc')
                    .data(pie(data))
                    .enter()
                    .append('g')
                    .attr('class', 'arc');

                g.append('path')
                    .attr('d', arc)
                    .attr('class', 'arc')
                    .style('fill', (d, index) => {
                        let s = (index + i) % 19;
                        return colorScale(s);
                    })
                    .style('fill-opacity', 0.9)
                    .style('stroke', '#11141C')
                    .style('stroke-width', 4)
                    .on('mouseover', function (d, i) {
                        d3.select(this)
                            .style('fill-opacity', 1)
                            .transition().duration(500)
                            .attr('d', hoverArc);
                    })
                    .on('mouseout', function (d, i) {
                        d3.select(this)
                            .style('fill-opacity', 0.9)
                            .transition().duration(500)
                            .attr('d', arc);
                    });


                g.append('title')
                    .text(function (d) {
                        return d.data.key + ": " + d.data.value;
                    });

                svg.append('text')
                    .text(i.toString())
                    .attr('transform', d => `translate(0,${height / 2})`)
                    .style('font-size', 20)
                    .style('font-weight', 800);

            });
            separatedGradesMagyar(i).then(data=>{
                const div = d3.select(`.donutchartmagyar${i}`);
                const width = window.innerWidth / 5;
                const height = window.innerHeight / 5;
                const radius = Math.min(width, height) / 2;
                const colorScale = d3.scaleOrdinal(["#E53935", "#D81B60", "#8E24AA", "#5E35B1", "#3949AB", "#1E88E5", "#039BE5", "#00ACC1", "#00897B", "#43A047", "#7CB342", "#C0CA33", "#FDD835", "#FFB300", "#FB8C00", "#F4511E", "#6D4C41", "#757575", "#546E7A"]);
                const svg = div.append('svg')
                    .attr('width', height)
                    .attr('height', height)
                    .append('g')
                    .attr('transform', `translate(${height / 2},${height / 2})`);
                const pie = d3.pie().value(d => d.value).sort(null);
                const arc = d3.arc().outerRadius(radius * 0.8).innerRadius(radius*0.6);
                const hoverArc = d3.arc().outerRadius(radius * 0.9).innerRadius(radius * 0.65);

                const g = svg.selectAll('.arc')
                    .data(pie(data))
                    .enter()
                    .append('g')
                    .attr('class', 'arc');

                g.append('path')
                    .attr('d', arc)
                    .attr('class', 'arc')
                    .style('fill', (d, index) => {
                        let s = (index + i) % 19;
                        return colorScale(s);
                    })
                    .style('fill-opacity', 0.9)
                    .style('stroke', '#11141C')
                    .style('stroke-width', 4)
                    .on('mouseover', function (d, i) {
                        d3.select(this)
                            .style('fill-opacity', 1)
                            .transition().duration(500)
                            .attr('d', hoverArc);
                    })
                    .on('mouseout', function (d, i) {
                        d3.select(this)
                            .style('fill-opacity', 0.9)
                            .transition().duration(500)
                            .attr('d', arc);
                    });

                g.append('title')
                    .text(function (d) {
                        return d.data.key + ": " + d.data.value;
                    });

                svg.append('text')
                    .text(i.toString())
                    .attr('transform', d => `translate(0,${height / 2})`)
                    .style('font-size', 20)
                    .style('font-weight', 800);
            });
        }

    }

}

window.customElements.define('donutchart-component',DonutChartForBubbleChartData);
