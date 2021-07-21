import React from 'react'
import './RankCard.scss'

export default function Card(): JSX.Element {
    const [cardList, setCardList] = React.useState([
        {
            topic: 'Most Carbon Used',
            topList: ['perth', 'bio', 'jill']
        },
        {
            topic: 'Least Carbon Used',
            topList: ['uDome', 'uGo', 'bung']
        },
    ])

return (
        <div id='rankCard'>
            {cardList.map((item, index) => {
                return (
                    <div key={index} className='rank-card-item'>
                        <div className='rank-top'>
                            <div className='rank-topic'>
                                <label className='text-topic'>{item.topic}</label>
                            </div>
                            <div className="list-info">
                                <div className="profile-part">
                                    <div className="name-box">
                                        <div className="rider-name">{item.topList}</div>
                                        <div className="occupation">{item.topList}</div>
                                    </div>
                                </div>
                                <div className="carbon-part">
                                    <div className="carbon-amount">{item.topList}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}

        </div>
    )
}
