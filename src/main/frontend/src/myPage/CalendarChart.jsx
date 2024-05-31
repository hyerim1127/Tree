import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './CalendarChart.css';

const CalendarChart = ({ data }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      drawChart();
    };

    window.addEventListener('resize', handleResize);
    drawChart();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [data]);

  const drawChart = () => {
    const svgElement = svgRef.current;
    const containerWidth = svgElement.parentElement.offsetWidth;
    const cellSize = 17;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const width = Math.max(500, containerWidth - margin.left - margin.right);
    const height = cellSize * 7 + margin.top + margin.bottom;

    d3.select(svgElement).selectAll("*").remove(); // Clear previous chart

    const svg = d3.select(svgElement)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const format = d3.timeFormat("%Y-%m-%d");

    const color = d3.scaleQuantize()
      .domain([0, d3.max(data, d => d.value)])
      .range(d3.schemeBlues[9]);

    const year = new Date().getFullYear();

    svg.append("text")
      .attr("transform", "translate(-6," + cellSize * 3.5 + ")rotate(-90)")
      .attr("font-weight", "bold")
      .attr("text-anchor", "middle")
      .text(year);

    const rect = svg.append("g")
      .attr("fill", "none")
      .attr("stroke", "#ccc")
      .selectAll("rect")
      .data(d3.timeDays(new Date(year, 0, 1), new Date(year + 1, 0, 1)))
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
      .attr("stroke", "#000")
      .selectAll("path")
      .data(d3.timeMonths(new Date(year, 0, 1), new Date(year + 1, 0, 1)))
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

  return (
    <div className="calendar-chart-container">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default CalendarChart;