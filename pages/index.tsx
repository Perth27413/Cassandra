import '../styles/scss/style.scss'
import Card from './../components/card-carbon/Card'
import LineCharts from '../components/LineCharts'
import BarCharts from '../components/BarCharts'

export default function Home() {
  return (
    <div id="indexPage">
      <div className="home">
        <Card/>
        <LineCharts/>
        <BarCharts/>
      </div>
    </div>
  )
}
