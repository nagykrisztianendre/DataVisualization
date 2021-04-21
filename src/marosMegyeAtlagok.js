import "../css/header-component.scss"
import {getAveragesMures} from "../DataQueries/getAveragesMures";

class MarosMegyeAtlagokComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    disconnectedCallback() {

    }

    render() {
        let header = document.createElement('div');
        let headerText = document.createElement('h1');
        headerText.innerText = 'A Maros megyei iskolák rangsorolva az átlagok alapján';
        header.append(headerText);
        this.append(header);
        let container = document.createElement('div');
        container.setAttribute('id', 'marosChart');
        let select = document.createElement('select');
        select.classList.add("msselect");
        select.innerHTML = ` <select class ="msselect">
        <option name="all" value="all">Teljes</option>
        <option name="all" value="urban">Csak város</option>
        <option name="all" value="rural">Csak falu</option>`;
        select.onchange =function (){
            container.innerHTML = "";
            getAveragesMures(this.value).then((data) => {
                data = data.sort(function (a, b) {
                    return d3.ascending(a.average, b.average);
                })

                let margin = {
                    top: 0,
                    right: 25,
                    bottom: 15,
                    left: 10
                };
                let schoolNames = [];
                for (let i = 0; i < data.length; i++) {
                    schoolNames.push(data[i].schoolName);
                }
                let color = d3.scaleOrdinal()
                    .domain(schoolNames)
                    .range(["#E53935", "#D81B60", "#8E24AA", "#5E35B1", "#3949AB", "#1E88E5", "#039BE5", "#00ACC1", "#00897B", "#43A047", "#7CB342", "#C0CA33", "#FDD835", "#FFB300", "#FB8C00", "#F4511E", "#6D4C41", "#757575", "#546E7A"]);

                let width = 1500 - margin.left - margin.right,
                    height = 6000 - margin.top - margin.bottom;

                let svg = d3.select("#marosChart").append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                // .attr("preserveAspectRatio", "xMinYMin meet")
                // .attr("viewBox", `0 0 ${width+margin.left+margin.right} ${height+margin.top+margin.bottom}`)
                // .classed("svg-content-responsive", true);

                let x = d3.scaleLinear()
                    .range([0, width])
                    .domain([0, 10]);

                //scale.ordinal();
                let y = d3.scaleBand()
                    .rangeRound([height, 0])
                    .padding(.1)
                    .domain(data.map(function (d) {
                        return d.schoolName;
                    }));

                //make y axis to show bar names
                let yAxis = d3.axisLeft(y)
                    //no tick marks
                    .tickSize(0);

                // let gy = svg.append("g")
                //     .attr("class", "y axisMS")
                //     .call(yAxis)

                let bars = svg.selectAll(".bar")
                    .data(data)
                    .enter()
                    .append("g")

                //append rects
                bars.append("rect")
                    .attr("class", "barMS")
                    .attr("y", function (d) {
                        return y(d.schoolName);
                    })
                    .style("fill", function (d) {
                        return color(d.schoolName);
                    })
                    .attr("height", y.bandwidth())
                    .attr("x", 0)
                    .attr("width", function (d) {
                        return x(d.average);
                    });

                //add a value label to the right of each bar
                bars.append("text")
                    .attr("class", "labelMS")
                    //y position of the label is halfway down the bar
                    .attr("y", function (d) {
                        return y(d.schoolName) + y.bandwidth() / 2 + 4;
                    })
                    //x position is 3 pixels to the right of the bar
                    .attr("x", function (d) {
                        return x(d.average) + 3;
                    })
                    .text(function (d) {
                        return d.average;
                    });

                bars.append("text")
                    .attr("class", "labelMS2")
                    //y position of the label is halfway down the bar
                    .attr("y", function (d) {
                        return y(d.schoolName) + y.bandwidth() / 2 + 4;
                    })
                    //x position is 3 pixels to the right of the bar
                    .attr("x", function (d) {
                        return 10;
                    })
                    .text(function (d) {
                        return d.schoolName;
                    });


            });
        };
        this.append(select);
        this.append(container);

    }

}

window.customElements.define('marosmegye-atlagok-component', MarosMegyeAtlagokComponent);
