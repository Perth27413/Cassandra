import React, { useEffect } from 'react'
import Axios from 'axios'
import './Card.scss'
import Loading from '../general-components/Loading'

export default function Card({ fetchToday }): JSX.Element {
  const [number, setNumber] = React.useState(0)
  const [todayLoading, settodayLoading] = React.useState(true)
  const [cardList, setCardList] = React.useState([
    {
      topic: 'Today Carbon',
      persent: '+3%',
      volume: '-',
      gram: 'gram',
      isLoad: true
    },
    {
      topic: 'Weekly Carbon',
      persent: '+3%',
      volume: '-',
      gram: 'gram',
      isLoad: true
    },
    {
      topic: 'Average Carbon/Distance',
      persent: '+3%',
      volume: '-',
      gram: 'gram/km',
      isLoad: true
    },
  ])

  useEffect(() => {
    fetchCardData()
  }, [])

  const fetchCardData = async() => {
    setCardList([
      {
        topic: 'Today Carbon',
        persent: '+3%',
        volume: await fetchTodayCarbon(),
        gram: 'gram',
        isLoad: false
    },
      {
        topic: 'Weekly Carbon',
        persent: '+3%',
        volume: await fetchYesterdayCarbon(),
        gram: 'gram',
      isLoad: false
    },
      {
        topic: 'Average Carbon/Distance',
        persent: '+3%',
        volume: await fetchAverageCarbon(),
        gram: 'gram/km',
        isLoad: false
    },
    ])
  }

  const fetchTodayCarbon = async() => {
    let today: string = await getDateAndFormat(new Date())
    const response = await Axios.get(`https://fsk328moy9.execute-api.ap-southeast-1.amazonaws.com/dev/carbon/byday?dateTime=${today}`)
    
    return response.data
  }

  const fetchYesterdayCarbon = async() => {
    let date: Date = new Date()
    date.setDate(date.getDate() - 1)
    let today: string = await getDateAndFormat(date)
    const response = await Axios.get(`https://fsk328moy9.execute-api.ap-southeast-1.amazonaws.com/dev/carbon/byday?dateTime=${today}`)
    return response.data
  }

  const fetchAverageCarbon = async() => {
    const response = await Axios.get(`https://fsk328moy9.execute-api.ap-southeast-1.amazonaws.com/dev/carbon/avg/`)
    return response.data.toFixed(2)
  }

  const getDateAndFormat = (date: Date) => {
    let dd = String(date.getUTCDate()).padStart(2, '0')
    let mm = String(date.getUTCMonth() + 1).padStart(2, '0')
    var yyyy = date.getFullYear()
    return yyyy + '-' + mm + '-' + dd
  }
  
  const active = (numCurrent: number) => {
    switch (numCurrent) {
      case 0:
        setNumber(0)
        fetchToday(true)
        break
      case 1:
        setNumber(1)
        break
      case 2:
        setNumber(2)
        break
      default:
        break
    }
  }

  return (
    <div id='card'>
      {cardList.map((item, index: number) => {
        return (
          <div key={index} className={`card-item ${index === number || item.isLoad ? 'active' : ''}`} onClick={() => active(index)}>
            {!item.isLoad ?
              <div>
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
            :
            <div className="loading-card"><Loading/></div>
            }
          </div>
        )
      })}

    </div>
  )
}
