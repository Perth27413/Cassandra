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
                  </div>
                  { item.topList.map((value: string, num: number) => {
                    return (
                       <div key={value} className="list-info">
                        <div className="profile">
                            <img className="picture-box" src="https://pyxis.nymag.com/v1/imgs/3d4/0aa/89125115b0e10b94e3378d484712450727-25-thanos.rhorizontal.w700.jpg" alt="" />
                            <div className="text-box">
                                <div className="name-box">{value} {value}</div>
                                <div className="position-box">{value}</div>
                            </div>
                        </div>
                        <div className="carbon">
                          <div className={`carbon-box
                            ${index === 0 ? num === 1 ? 'orange' : num === 2 ? 'yellow' : '' : num === 0 ? 'darkgreen' : num === 1 ? 'green' : 'lightgreen'}
                          `}>
                          </div>
                        </div>
                      </div>
                    )
                  })
                  }
              </div>
          )
      })}

  </div>
)
}
