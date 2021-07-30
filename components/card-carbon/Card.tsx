import React, { useEffect } from 'react'
import Axios from 'axios'
import './Card.scss'
import Loading from '../general-components/Loading'
import PerhourModel from '../../model/carbon/PerhourModel'
import GetDataAPI from '../function/getDataAPI'

export default function Card({ sendData }): JSX.Element {
  const [number, setNumber] = React.useState(0)
  const [todayLoading, settodayLoading] = React.useState(true)
  const [perHourData, setperHourData] = React.useState([])
  const [weeklyData, setweeklyData] = React.useState([])
  const [monthlyData, setmonthlyData] = React.useState([])
  const [getDataApi, setgetDataApi] = React.useState(new GetDataAPI)
  const [cardList, setCardList] = React.useState([
    {
      topic: 'Today Carbon',
      persent: '+3%',
      volume: '-',
      gram: 'kg',
      isLoad: true
    },
    {
      topic: 'Weekly Carbon',
      persent: '+3%',
      volume: '-',
      gram: 'kg',
      isLoad: true
    },
    {
      topic: 'Average Carbon/Distance',
      persent: '+3%',
      volume: '-',
      gram: 'kg',
      isLoad: true
    },
  ])

  useEffect( () => {
    fetchCardData()
  }, [])

  const fetchCardData = async() => {
    let todayCarbon: number = await fetchTodayCarbon()
    let yesterdayCarbon: number = await fetchYesterdayCarbon() 
    let weeklyCarbon: number = await fetchWeeklyCarbon()
    let monthlyCarbon: number = await fetchMonthlyCarbon()
    let lastweekCarbon: number = await fetchLastWeekCarbon()
    let lastMonthCarbon: number = await fetchLastMonthCarbon()
    setCardList([
      {
        topic: 'Today Carbon',
        persent: `${diffPercent(todayCarbon, yesterdayCarbon)}`,
        volume: todayCarbon.toFixed(2),
        gram: 'kg',
        isLoad: false
    },
      {
        topic: 'Weekly Carbon',
        persent:  `${diffPercent(weeklyCarbon, lastweekCarbon)}`,
        volume: weeklyCarbon.toFixed(2),
        gram: 'kg',
      isLoad: false
    },
      {
        topic: 'Monthly Carbon',
        persent:  `${diffPercent(monthlyCarbon, lastMonthCarbon)}`,
        volume: monthlyCarbon.toFixed(2),
        gram: 'kg',
        isLoad: false
    },
    ])
  }

  const diffPercent = (num1: number, num2: number) => {
    return Math.round(((num1 - num2) * 100) / num2)
  }

  const fetchTodayCarbon = async() => {
    let response: Array<PerhourModel> = await getDataApi.fetchDataPerHour()
    setperHourData(response)
    return (response.map(item => item.carbon).reduce((sum, a) => sum + a, 0)/1000)
  }
  
  const fetchWeeklyCarbon = async() => {
    let today: string = getDateAndFormat(0)
    let weekly: string = getDateAndFormat(new Date().getUTCDay() * -1)
    const response: Array<PerhourModel> = await getDataApi.fetchDataFromDate(weekly, today)
    setweeklyData(response)
    return (response.map(item => item.carbon).reduce((sum, a) => sum + a, 0)/1000)
  }

  const fetchMonthlyCarbon = async() => {
    let today: string = getDateAndFormat(0)
    let weekly: string = getDateAndFormat(new Date().getUTCDate() * -1)
    const response: Array<PerhourModel> = await getDataApi.fetchDataFromDate(weekly, today)
    setmonthlyData(response)
    return (response.map(item => item.carbon).reduce((sum, a) => sum + a, 0)/1000)
  }

  const fetchYesterdayCarbon = async() => {
    let today: string = getDateAndFormat(0)
    let weekly: string = getDateAndFormat(-1)
    const response: Array<PerhourModel> = await getDataApi.fetchDataFromDate(weekly, today)
    return (response.map(item => item.carbon).reduce((sum, a) => sum + a, 0)/1000)
  }


  const fetchLastWeekCarbon = async() => {
    let today: Date = new Date()
    let start: string = formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate()-12))
    let end: string = formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate()-7))
    const response: Array<PerhourModel> = await getDataApi.fetchDataFromDate(start, end)
    return (response.map(item => item.carbon).reduce((sum, a) => sum + a, 0)/1000)
  }

  const fetchLastMonthCarbon = async() => {
    let date: Date = new Date()
    let start: string = formatDate(new Date(date.getUTCFullYear(), date.getUTCMonth() -1 , 2))
    let end: string = formatDate(new Date(date.getUTCFullYear(), date.getUTCMonth(), 1))
    const response: Array<PerhourModel> = await getDataApi.fetchDataFromDate(start, end)
    return (response.map(item => item.carbon).reduce((sum, a) => sum + a, 0)/1000)
  }

  const fetchAverageCarbon = async() => {
    const response = await Axios.get(`https://fsk328moy9.execute-api.ap-southeast-1.amazonaws.com/dev/carbon/avg/`)
    return response.data.toFixed(2)
  }

  const getDateAndFormat = (dateNumber: number) => {
    let date: Date = new Date()
    date.setDate(date.getDate() + dateNumber)
    let dd = String(date.getUTCDate()).padStart(2, '0')
    let mm = String(date.getUTCMonth() + 1).padStart(2, '0')
    var yyyy = date.getFullYear()
    return yyyy + '-' + mm + '-' + dd
  }

  const formatDate = (date: Date) => {
    let dd = String(date.getUTCDate()).padStart(2, '0')
    let mm = String(date.getUTCMonth() + 1).padStart(2, '0')
    var yyyy = date.getFullYear()
    return yyyy + '-' + mm + '-' + dd
  }

  const setLoading = (index: number, loading: boolean):void => {
    let newState = [...cardList]
    newState[index].isLoad = loading
    setCardList(newState)
  }

  const fakeLoading = (index: number) => {
    setTimeout(() => {
      setLoading(index, false)
    }, 800)
  }
  
  const active = async(numCurrent: number) => {
    switch (numCurrent) {
      case 0:
        setNumber(0)
        setLoading(0, true)
        await fetchTodayCarbon()
        sendData(perHourData, 'hour')
        fakeLoading(0)
        break
      case 1:
        setNumber(1)
        setLoading(1, true)
        await fetchWeeklyCarbon()
        sendData(weeklyData, 'day')
        fakeLoading(1)
        break
      case 2:
        setNumber(2)
        setLoading(2, true)
        await fetchMonthlyCarbon()
        sendData(monthlyData, 'day')
        fakeLoading(2)
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
                    <label className='percent'>{item.persent}%</label>
                  </div>
                </div>
                <div className='mid'>
                  <div className='volume'>
                    <div className="volume-text">{item.volume}</div>
                    <div className="text-gram-box"><label className='text-gram'>{item.gram}</label></div>
                  </div>
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
