import React from 'react'
import '../components/BarCharts.scss'

interface IProps { }

interface IState {

}

class BarCharts extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
    }
  }

  render(): JSX.Element {
    return (
      <div id='earnBox'>
        <div id='avgCarbon'>
          <div className='bgLeft'>
            Avg Carbon
          </div>
          <div className='bgRight'>
            <label className='text-volume'>300</label>
            <label className='text-unit'>kg/km</label>
          </div>
        </div>
        <div id='totalEarn'>
          <div className='bgLeft'>
            Total Payment
          </div>
          <div className='bgRight'>
            <label className='text-volume'>300</label>
            <label className='text-unit'>Dallar</label>
          </div>
        </div>
      </div>
    )
  }
}

export default BarCharts