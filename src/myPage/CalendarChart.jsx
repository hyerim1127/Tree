import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import './CalendarChart.css';

const CalendarChart = ({ data }) => {
    const svgRef = useRef(null);
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        drawChart();
    }, [data, width]);

    const drawChart = () => {
        const svgElement = svgRef.current;
        const containerWidth = svgElement.parentElement.offsetWidth;
        const height = 140;
        const cellSize = 0.01*width+0.5;

        // Clear previous chart
        d3.select(svgElement).selectAll("*").remove();

        const years = d3.range(d3.min(data, d => new Date(d.date).getFullYear()), d3.max(data, d => new Date(d.date).getFullYear()) + 1);

        const svg = d3.select(svgElement)
            .selectAll("svg")
            .data(years)
            .enter().append("svg")
            .attr("width", width*0.75)
            .attr("height", height)
            .attr("class", "year")
            .append("g")
            .attr("transform", "translate(" + ((width*0.8 - cellSize * 53) / 2) + "," + (height - cellSize * 7 - 1) + ")");

        const format = d3.timeFormat("%Y-%m-%d");

        const color = d3.scaleQuantize()
            .domain([0, d3.max(data, d => d.value)])
            .range(d3.schemeGreens[9]);
        
        svg.select("svg")
            .append("text")
            .text("title");

        svg.append("text")
            .attr("transform", "translate(-6," + cellSize * 3.5 + ")rotate(-90)")
            .attr("font-weight", "bold")
            .attr("text-anchor", "middle")
            .attr("fill", "#562E12")
            .text(d => d);

        const rect = svg.append("g")
            .attr("fill", "none")
            .attr("stroke", "#c6a690")
            .selectAll("rect")
            .data(d => d3.timeDays(new Date(d, 0, 1), new Date(d + 1, 0, 1)))
            .enter().append("rect")
            .attr("width", cellSize)
            .attr("height", cellSize)
            .attr("x", d => d3.timeWeek.count(d3.timeYear(d), d) * cellSize)
            .attr("y", d => d.getDay() * cellSize)
            .datum(format);

        rect.append("title")
            .text(d => d);

        const dataMap = new Map(data.map(d => [d.date, d.value]));

        rect.filter(d => dataMap.has(d))
            .attr("fill", d => color(dataMap.get(d)))
            .select("title")
            .text(d => `${d}: ${dataMap.get(d)}`);

        svg.append("g")
            .attr("fill", "none")
            .attr("stroke", "#562E12")
            .selectAll("path")
            .data(d => d3.timeMonths(new Date(d, 0, 1), new Date(d + 1, 0, 1)))
            .enter().append("path")
            .attr("class", "month")
            .attr("d", d => {
                const t1 = new Date(d.getFullYear(), d.getMonth() + 1, 0);
                const d0 = d.getDay(), w0 = d3.timeWeek.count(d3.timeYear(d), d);
                const d1 = t1.getDay(), w1 = d3.timeWeek.count(d3.timeYear(t1), t1);
                return `M${(w0 + 1) * cellSize},${d0 * cellSize}
                        H${w0 * cellSize}V${7 * cellSize}
                        H${w1 * cellSize + cellSize}V${(d1 + 1) * cellSize}
                        H${(w1 + 1) * cellSize}V0H${(w0 + 1) * cellSize}Z`;
            });
    };

    return <div ref={svgRef}></div>;
};

export default CalendarChart;
