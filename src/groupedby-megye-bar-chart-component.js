import {getAllAverageInOne} from "../DataQueries/getAllAverageInOne";

class GroupedbyMegyeBarChartComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    disconnectedCallback() {

    }

    render() {
        getAllAverageInOne().then((data) => {
            let margin = {top: 20, right: 110, bottom: 30, left: 40},
                width = 960 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

            let x0 = d3.scaleBand()
                .rangeRound([0, width])
                .padding(0.1);

            let x1 = d3.scaleBand();

            let y = d3.scaleLinear()
                .range([height, 0]);

            let xAxis = d3.axisBottom(x0)
                .tickSize(0);


            let yAxis = d3.axisRight(y).tickSizeOuter(0);


            let svg = d3.select('body').append("svg")
                .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
                .classed("svg-content-responsive2", true)
                .append("g");


            let categoriesNames = data.map(function (d) {
                return d.year;
            });

            let rateNames = [];

            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < data[i].values.length; j++) {
                    if (!rateNames.includes(data[i].values[j].megye)) {
                        rateNames.push(data[i].values[j].megye);
                    }
                }
            }



            let color = d3.scaleOrdinal()
                .domain(rateNames)
                .range(["#E53935", "#D81B60", "#8E24AA", "#5E35B1", "#3949AB", "#1E88E5", "#039BE5", "#00ACC1", "#00897B", "#43A047", "#7CB342", "#C0CA33", "#FDD835", "#FFB300", "#FB8C00", "#F4511E", "#6D4C41", "#757575", "#546E7A"]);


            x0.domain(categoriesNames);
            x1 = d3.scaleBand()
                .domain(rateNames)
                .rangeRound([0, x0.bandwidth()]);

            y.domain([0, d3.max(data, function (categorie) {
                return d3.max(categorie.values, function (d) {
                    return d.media;
                })+1;
            })]);

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            svg.append("g")
                .attr("class", "y axis")
                .style('opacity', '0')
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .style('font-weight', 'bold')
                .text("Value");

            svg.select('.y').transition().duration(500).delay(1300).style('opacity', '1');

            let slice = svg.selectAll(".slice")
                .data(data)
                .enter().append("g")
                .attr("class", "g")
                .attr("transform", function (d) {
                    return "translate(" + x0(d.year) + ",0)";
                });

            slice.selectAll("rect")
                .data(function (d) {
                    return d.values;
                })
                .enter().append("rect")
                .attr("width", x1.bandwidth())
                .attr("x", function (d) {
                    return x1(d.megye);
                })
                .style("fill", function (d) {
                    return color(d.megye);
                })
                .attr("y", function (d) {
                    return y(0);
                })
                .attr("height", function (d) {
                    return height - y(0);
                })
                .on("mouseover", function (d) {
                    d3.select(this).style("fill", function (d) {
                        return d3.rgb(color(d.megye)).darker(2);
                    });
                })
                .on("mouseout", function (d) {
                    d3.select(this).style("fill", function (d) {
                        return color(d.megye);
                    });
                });

            slice.selectAll("rect")
                .transition()
                .delay(function (d) {
                    return Math.random() * 1000;
                })
                .duration(1000)
                .attr("y", function (d) {
                    return y(d.media);
                })
                .attr("height", function (d) {
                    return height - y(d.media);
                });

            //Legend
            let legend = svg.selectAll(".legend")
                .data(rateNames.map(function (d) {
                    return d;
                }))
                .enter().append("g")
                .attr("class", "legend")
                .attr("transform", function (d, i) {
                    return "translate(0," + i * 20 + ")";
                })
                .style("opacity", "0");

            legend.append("rect")
                .attr("x", width + 90)
                .attr("width", 18)
                .attr("height", 18)
                .style("fill", function (d) {
                    return color(d);
                });

            legend.append("text")
                .attr("x", width + 85)
                .attr("y", 9)
                .attr("dy", ".35em")
                .style("text-anchor", "end")
                .text(function (d) {
                    return d;
                });

            legend.transition().duration(500).delay(function (d, i) {
                return 1300 + 100 * i;
            }).style("opacity", "1");

        });
    }
}

window.customElements.define('groupedby-megye-bar-chart-component', GroupedbyMegyeBarChartComponent);
