import React from 'react'
import './Card.scss'

export default function Card(): JSX.Element {
  const [number, setNumber] = React.useState(0)
  const [cardList, setCardList] = React.useState([
    {
      topic: 'Today Carbon',
      persent: '+3%',
      volume: '6323',
      gram: 'gram'
    },
    {
      topic: 'Weekly Carbon',
      persent: '+3%',
      volume: '6323',
      gram: 'gram'
    },
    {
      topic: 'Average Carbon/Distance',
      persent: '+3%',
      volume: '59',
      gram: 'gram'
    },
  ])

  const active = (numCurrent: number) => {
    if (numCurrent == 0) {
      setNumber(0)
    } else if (numCurrent == 1) {
      setNumber(1)
    } else if (numCurrent == 2) {
      setNumber(2)
    } else {
      setNumber(0)
    }
  }

  return (
    <div id='card'>

      {cardList.map((item, index) => {
        return (
          <div key={index} className={`card-item ${index == number ? 'active' : ''}`} onClick={()=>active(index)}>
            <div className='top'>
              <div className='con-topic'>
                <label className='text-topic'>{item.topic}</label>
              </div>
              <div className='con-percent'>
                <label className='percent'>{item.persent}</label>
              </div>
            </div>
            <div className='mid'>
              <p className='volume'>{item.volume}</p>
            </div>
            <div className='bottom'>
              <label className='text-gram'>{item.gram}</label>
            </div>
          </div>
        )
      })}

    </div>
  )
}
