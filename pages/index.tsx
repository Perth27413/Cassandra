import '../styles/scss/style.scss'
import Card from './../components/card-carbon/Card'
import Charts from '../components/Charts'

export default function Home() {
  return (
    <div id="indexPage">
      <div className="home">
        <Card/>
        <label id="welcomeText">Welcome To FindMyMate</label>
        <Charts/>
      </div>
    </div>
  )
}
