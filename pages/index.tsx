import '../styles/scss/style.scss'
import Card from './../components/card-carbon/Card'

export default function Home() {
  return (
    <div id="indexPage">
      <div className="home">
        <Card/>
        <label id="welcomeText">Welcome To FindMyMate</label>
      </div>
    </div>
  )
}
