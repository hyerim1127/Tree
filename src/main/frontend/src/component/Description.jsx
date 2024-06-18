import React from 'react';
import mainImg from '../img/mainImage.png';
import btn from '../img/btn.png';
import './description.css';

const Description = ({ goToPageR }) => {
    return (
        <div style={{zIndex:-1}}>
            <img className='mainImg' alt='main' src={mainImg} />
            <img className='btnR' alt='btn' src={btn} onClick={goToPageR} />
            <div className='description'>
                <p className="descriptionText">
                    <h1>그루터기</h1><br />
                    <h2>마음을 울리는 책구절,<br />인상에 남는 한 줄을 적어보세요.</h2><br />
                    <h5>지식과 지혜를 쌓는 공간, 그루터기에서는 독서를 하고 난 뒤, 책의 인상깊은 구절을 통해 서로의 경험과 지식을 공유하고 나누는 곳입니다. 그루터기에서는 책에서 온 통찰력이 우리를 밝은 세계로 안내합니다.<br /><br />여러분의 다양한 관점과 경험을 소중히 여기며, 책을 통해 이룬 인생의 여정을 함께 나눕니다. 그루터기와 함께하는 모두가 지식의 씨앗을 뿌리고 자라나길 바랍니다.</h5>
                </p>
            </div>
        </div>
    );
};

export default Description;
