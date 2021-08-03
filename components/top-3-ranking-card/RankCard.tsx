import React from 'react'
import './RankCard.scss'
import GetDataAPI from '../function/getDataAPI'
import UserModel from '../../model/user/userModel'

interface IProps { }

interface IState {
  cardList: Array<any>
}

class RankCard extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      cardList: []
    }
  }
  
  componentDidMount() {
    this.getUserDateFromAPI()
  }

  private getUserDateFromAPI = async() => {
    let response: Array<UserModel> = await new GetDataAPI().fetchDataUser()
    this.setState({
      cardList: [
        {
          topic: 'Most  CO',
          topList: response.slice(response.length - 3, response.length).sort((a, b) => b.carbon - a.carbon)
        },
        {
          topic: 'Least  CO',
          topList: response.slice(0, 3)
        },
      ]
    })
    this.forceUpdate()
  }

  render(): JSX.Element {
    return (
      <div id='rankCard'>
        {this.state.cardList.map((item, index) => {
          return (
            <div key={index} className='rank-card-item'>
              <div className='rank-top'>
                <div className='rank-topic'>
                  <label className='text-topic'>{item.topic}&#8322;  Emission</label>
                </div>
              </div>
              {item.topList.map((value: UserModel, num: number) => {
                return (
                  <div key={value.userEntity.userId} className="list-info">
                    <div className="profile">
                      <img className="picture-box" src={value.userEntity.profilePic} alt="" />
                      <div className="text-box">
                        <div className="name-box">{value.userEntity.firstName} {value.userEntity.lastName}</div>
                        <div className="position-box">Rider</div>
                      </div>
                    </div>
                    <div className="carbon">
                      <div className={`carbon-box
                              ${index === 0 ? num === 1 ? 'orange' : num === 2 ? 'yellow' : '' : num === 0 ? 'darkgreen' : num === 1 ? 'green' : 'lightgreen'}
                            `}>
                        {value.carbon.toFixed(2)}
                      </div>
                    </div>
                  </div>
                )
              })
              }
            </div>
          )
        })}
      </div>
    )
  }
  }

  export default RankCard
