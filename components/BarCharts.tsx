import React from 'react'
import '../components/BarCharts.scss'
import GetDataAPI from '../components/function/getDataAPI'
import Loading from '../components/general-components/Loading'

interface IProps { }

interface IState {
  avgCarbon: number
  totalPayment: number
  isLoading: boolean
}

class BarCharts extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      avgCarbon: 0,
      totalPayment: 0,
      isLoading: true
    }
  }

  componentDidMount() {
    this.getAVGCarbon()
    this.getTotalPayment()
    setTimeout(() => {
      this.setState({
        isLoading: false
      })
    }, 1000)
    
  }

  private getAVGCarbon = async() => {
    let response: number = await new GetDataAPI().fetchDataAVGCarbon()
    this.setState({
      avgCarbon: response
    })
  }

  private getTotalPayment = async() => {
    let response: number = await new GetDataAPI().fetchDataTotalPayment()
    this.setState({
      totalPayment: response
    })
  }

  render(): JSX.Element {
    return (
      <div id='earnBox'>
        <div id='avgCarbon' className={`${this.state.isLoading ? 'loading' : ''}`}>
          <div className='bgLeft'>
            Avg CO&#8322;
          </div>
          {this.state.isLoading ?
            <div className="loading-box">
              <Loading/>
            </div>
          :
            <div className='bgRight'>
              <label className='text-volume'>{this.state.avgCarbon.toFixed(2)}</label>
              <label className='text-unit'>kg/km</label>
            </div>
          }
        </div>
        <div id='totalEarn' className={`${this.state.isLoading ? 'loading' : ''}`}>
          <div className='bgLeft'>
            Total Payment
          </div>
          {this.state.isLoading ?
            <div className="loading-box">
              <Loading/>
            </div>
          :
          <div className='bgRight'>
            <label className='text-volume'>{(this.state.totalPayment / 30).toFixed(2)}</label>
            <label className='text-unit'>Dallars</label>
          </div>
          }
        </div>
      </div>
    )
  }
}

export default BarCharts