import React from 'react'
import './Card.scss'

interface IProps {}

interface IState {
}

class Card extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props)
  }
  render(): JSX.Element {
    return (
      <div id='card'>
        <div className='card-item'>
          <div>
            <div>
              <label>Today Carbon</label>
            </div>
            <div>
              <label>+3%</label>
            </div>
          </div>
          <div>
            <p >62132</p>
          </div>
          <div>
            <label>gram</label>
          </div>
        </div>
        <div className='card-item'>
          <p>Weekly Carbon</p>
          <p>62132</p>
          <p >gram</p>
        </div>
        <div className='card-item'>
          <p>Average carbon/km</p>
          <p>62132</p>
          <p>gram</p>
        </div>
      </div>
    )
  }
}

export default Card