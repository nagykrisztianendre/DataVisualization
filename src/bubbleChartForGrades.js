import "../css/header-component.scss"

import {separatedGrades, separatedGradesMagyar} from "../DataQueries/getSeparatedGrades";

class BubbleChartForGrades extends HTMLElement {
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
        container.classList.add('bubblechart-container');
        let containerMagyar = document.createElement('div');
        containerMagyar.classList.add('bubblechart-container');

        let innerContainer = document.createElement('div');

        let innerHeader = document.createElement('h3');
        innerHeader.innerText = `A Maros megyében vizsgázott tanulók jegyei:`;

        let innerHeader2 = document.createElement('h3');
        innerHeader2.innerText = `A Maros megyében vizsgázott magyar tanulók jegyei:`;


        let headerContainer = document.createElement('div');
        headerContainer.classList.add('bubbleheaders');
        headerContainer.append(innerHeader);
        headerContainer.append(innerHeader2);


        innerContainer.classList.add('bubblechartcomponent');

        innerContainer.append(container);
        innerContainer.append(containerMagyar);
        this.append(headerContainer);
        this.append(innerContainer);

        for (let i = 2015; i <= 2020; i++) {
            if (i === 2018) {
                continue;
            }
            const containerChart = document.createElement('div');
            containerChart.classList.add(`bubblechart${i}`);
            const containerChartMagyar = document.createElement('div');
            containerChartMagyar.classList.add(`bubblechartmagyar${i}`);
            container.append(containerChart);
            containerMagyar.append(containerChartMagyar);
            separatedGrades(i).then(data => {
                let dataset = {};
                dataset.children = data;
                var diameter = window.innerWidth/2.5;
                var color = d3.scaleOrdinal(d3.schemeCategory10);

                var bubble = d3.pack(dataset)
                    .size([diameter, diameter])
                    .padding(1.5);

                var svg = d3.select(`.bubblechart${i}`)
                    .append("svg")
                    .attr("width", diameter)
                    .attr("height", diameter)
                    .attr("class", "bubble");

                var nodes = d3.hierarchy(dataset)
                    .sum(function (d) {
                        return d.value;
                    });

                var node = svg.selectAll(".node")
                    .data(bubble(nodes).descendants())
                    .enter()
                    .filter(function (d) {
                        return !d.children
                    })
                    .append("g")
                    .attr("class", "node")
                    .attr("transform", function (d) {
                        return "translate(" + d.x + "," + d.y + ")";
                    });

                node.append("title")
                    .text(function (d) {
                        return d.data.key + ": " + d.value;
                    });

                node.append("circle")
                    .attr("r", function (d) {
                        return d.r;
                    })
                    .style("fill", function (d, i) {
                        return color(i);
                    });

                node.append("text")
                    .attr("dy", ".2em")
                    .style("text-anchor", "middle")
                    .text(function (d) {
                        return d.data.key.substring(0, d.r / 3);
                    })
                    .attr("font-family", "sans-serif")
                    .attr("font-size", function (d) {
                        return d.r / 5;
                    })
                    .attr("fill", "white");

                node.append("text")
                    .attr("dy", "1.3em")
                    .style("text-anchor", "middle")
                    .text(function (d) {
                        return d.data.value;
                    })
                    .attr("font-family", "Gill Sans", "Gill Sans MT")
                    .attr("font-size", function (d) {
                        return d.r / 5;
                    })
                    .attr("fill", "white");

                d3.select(self.frameElement)
                    .style("height", diameter + "px");
                svg.append('text')
                    .text(i.toString())
                    .attr('transform', d => `translate(0,${diameter/4})`)
                    .style('font-size', 20)
                    .style('font-weight', 800);

            });
            separatedGradesMagyar(i).then(data => {
                let dataset = {};
                dataset.children = data;
                var diameter = window.innerWidth/3;
                var color = d3.scaleOrdinal(d3.schemeCategory10);

                var bubble = d3.pack(dataset)
                    .size([diameter, diameter])
                    .padding(1.5);

                var svg = d3.select(`.bubblechartmagyar${i}`)
                    .append("svg")
                    .attr("width", diameter)
                    .attr("height", diameter)
                    .attr("class", "bubble");

                var nodes = d3.hierarchy(dataset)
                    .sum(function (d) {
                        return d.value;
                    });

                var node = svg.selectAll(".node")
                    .data(bubble(nodes).descendants())
                    .enter()
                    .filter(function (d) {
                        return !d.children
                    })
                    .append("g")
                    .attr("class", "node")
                    .attr("transform", function (d) {
                        return "translate(" + d.x + "," + d.y + ")";
                    });

                node.append("title")
                    .text(function (d) {
                        // console.log(d.data.key);
                        return d.data.key + ": " + d.value;
                    });

                node.append("circle")
                    .attr("r", function (d) {
                        return d.r;
                    })
                    .style("fill", function (d, i) {
                        return color(i);
                    });

                node.append("text")
                    .attr("dy", ".2em")
                    .style("text-anchor", "middle")
                    .text(function (d) {
                        return d.data.key.substring(0, d.r / 3);
                    })
                    .attr("font-family", "sans-serif")
                    .attr("font-size", function (d) {
                        return d.r / 5;
                    })
                    .attr("fill", "white");

                node.append("text")
                    .attr("dy", "1.3em")
                    .style("text-anchor", "middle")
                    .text(function (d) {
                        return d.data.value;
                    })
                    .attr("font-family", "Gill Sans", "Gill Sans MT")
                    .attr("font-size", function (d) {
                        return d.r / 5;
                    })
                    .attr("fill", "white");

                d3.select(self.frameElement)
                    .style("height", diameter + "px");

                svg.append('text')
                    .text(i.toString())
                    .attr('transform', d => `translate(0,${diameter/4})`)
                    .style('font-size', 20)
                    .style('font-weight', 800);

            });
        }

    }

}

window.customElements.define('bubblechart-component', BubbleChartForGrades);
