import '../styles/scss/style.scss'
import Card from './../components/card-carbon/Card'
import RankCard from './../components/top-3-ranking-card/RankCard'
import LineCharts from '../components/LineCharts'
import BarCharts from '../components/BarCharts'
import dynamic from 'next/dynamic'
import { ComponentType } from 'react'



export default function Home() {
  const LineChartsNoSSR: ComponentType = dynamic(
    () => import('../components/LineCharts'),
    { ssr: false }
  )

  const BarChartsNoSSR: ComponentType = dynamic(
    () => import('../components/BarCharts'),
    { ssr: false }
  )

  return (
    <div id="indexPage">
      <div className="home">
        <Card/>
        <LineChartsNoSSR/>
        <div className="rank-graph">
          <RankCard/>
          <BarChartsNoSSR/>
        </div>
      </div>
    </div>
  )
}
