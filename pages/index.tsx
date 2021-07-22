import '../styles/scss/style.scss'
import Card from './../components/card-carbon/Card'
import RankCard from './../components/top-3-ranking-card/RankCard'
import LineCharts from '../components/LineCharts'
import BarCharts from '../components/BarCharts'

export default function Home() {
  return (
    <div id="indexPage">
      <div className="home">
        <Card/>
        <LineCharts/>
        <div className="rank-graph">
          <RankCard/>
          <BarCharts/>
        </div>
      </div>
    </div>
  )
}
