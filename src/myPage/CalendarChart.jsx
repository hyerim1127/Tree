import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const CalendarChart = ({ data }) => {
    const svgRef = useRef(null);

    useEffect(() => {
        drawChart();
        window.addEventListener('resize', handleResize); // 화면 크기 변화 감지
        handleResize(); // 초기 렌더링 시에도 적용
        return () => {
            window.removeEventListener('resize', handleResize); // cleanup
        };
    }, [data]);

    const handleResize = () => {
        const width = svgRef.current.parentNode.offsetWidth; // 부모 요소의 너비 가져오기
        drawChart(width); // drawChart 호출 시에 너비 전달
    };

    const drawChart = (width) => {
        width = width || 700; // 기본값 설정
        const height = 136;
        const cellSize = 17;

        const format = d3.timeFormat("%Y-%m-%d");

        const color = d3.scaleQuantize()
            .domain([0, d3.max(data, d => d.value)])
            .range(d3.schemeBlues[9]);

        const svg = d3.select(svgRef.current)
            .selectAll("svg")
            .data(d3.range(2023, 2024))
            .enter().append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("class", "year")
            .append("g")
            .attr("transform", "translate(" + ((width - cellSize * 53) / 2) + "," + (height - cellSize * 7 - 1) + ")");

        svg.append("text")
            .attr("transform", "translate(-6," + cellSize * 3.5 + ")rotate(-90)")
            .attr("font-weight", "bold")
            .attr("text-anchor", "middle")
            .text(d => d);

        const rect = svg.append("g")
            .attr("fill", "none")
            .attr("stroke", "#ccc")
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
            .attr("stroke", "#000")
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
