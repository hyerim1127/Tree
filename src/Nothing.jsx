//버블차트

import BubbleChart from './BubbleChart';
import React from 'react';
const data = [
    { name: '문학', value: 30 },
    { name: '경제/경영', value: 20 },
    { name: '인문', value: 10 },
    { name: '예술', value: 15 },
    { name: '기술/공학', value: 25 },
    { name: '자기계발', value: 10 }
  ];
  
function Nothing() {
    return (
        <div className="App">
        <h1>Book Genre Bubble Chart</h1>
        <BubbleChart data={data} />
        </div>
    );
}

export default Nothing;