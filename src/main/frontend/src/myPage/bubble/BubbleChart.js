import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import branchImg from '../../img/tree-branch.png'

const BubbleChart = ({ data }) => {
    const svgRef = useRef();

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        const width = 500;
        const height = 400;

        svg.attr('width', width).attr('height', height);

        svg.append("image")
        .attr("href", branchImg)
        .attr("width", 500)
        .attr("height", 400);

        const bubble = d3.pack().size([width, height]).padding(10);

        const root = d3.hierarchy({ children: data }).sum(d => d.value);

        const nodes = bubble(root).leaves();

        const node = svg
            .selectAll('g')
            .data(nodes)
            .enter()
            .append('g')
            .attr('transform', d => `translate(${d.x},${d.y})`);

        node
            .append('circle')
            .attr('r', d => d.r)
            .attr('fill', d => getColor(d.data.name))
            .on('mouseenter', function (event, d) {
                d3.select(this)
                    .attr('fill', darkenColor(getColor(d.data.name)))
                    .attr('r', d => d.r + 5); // 버블 크기 증가
                d3.select(this.parentNode)
                    .select('text')
                    .attr('font-size', '1.2em'); // 텍스트 크기 증가
            })
            .on('mouseleave', function (event, d) {
                d3.select(this)
                .attr('fill', getColor(d.data.name))
                .attr('r', d => d.r); // 원래 크기로 복원
                d3.select(this.parentNode)
                .select('text')
                .attr('font-size', '1em'); // 원래 크기로 복원
            });
        
        // 중간 생략
        function getColor(genre) {
            switch (genre) {
                case '과학':
                    return '#456D4F';
                case '경제경영':
                    return '#76A081';
                case '인문학':
                    return '#77955E';
                case '고전':
                    return '#B6BC6D';
                case '소설/시/희곡':
                    return '#78824E';
                case '자기계발':
                    return '#385500';
                case '사회과학':
                    return '#6f9424';
                case '에세이':
                    return '#a3c168';
                case '역사':
                    return '#565d06';
                default:
                    return 'gray';
            }
        }
    
        // 색상을 더 어둡게 만드는 함수
        function darkenColor(color) {
        return d3.color(color).darker(0.5).toString();
        }

        node
        .append('text')
        .attr('dy', '0.3em')
        .attr('text-anchor', 'middle')
        .style('font-family', 'Gothic, sans-serif')
        .style('fill', 'white')
        .text(d => d.data.name);

        }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default BubbleChart;