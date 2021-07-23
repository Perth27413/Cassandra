import React from 'react'
import Link from 'next/link'
import './Sidebar.scss'

interface IProps {}

interface IState {
  menu_list: Array<any>
}

class Sidebar extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      menu_list: [
        {
          title: "Dashboard",
          path: "",
          url: ""
        },
        {
          title: "Test",
          path: "",
          url: ""
        }
      ]
  }
}

  render(): JSX.Element {
    return (
      <div id="sidebar">

        <div className="side-bar-top">
          <div className="banner">
            <div className="logo-banner">
              <em className="fas fa-copyright"></em>
            </div>
            <div className="text-banner">
              Carbon Footprint
            </div>
          </div>
          {this.state.menu_list.map((item, index) => {
            return(
          <div key={index} className="menu-list">
            <div className="logo-menu">
              <em className="far fa-chart-bar"></em>
            </div>
            <div className="text-menu">
              {item.title}
            </div>
          </div>
            )
          })}
        </div>

        <div className="side-bar-bottom">
          <hr />
          <div className="user-name">Lorem Ipsum</div>
          <div className="position">CEO</div>
          <div className="logout">
          <div className="logo-logout">
            <em className="fas fa-sign-out-alt"></em>
          </div>
          <div className="text-logout">Logout</div>
          </div>
        </div>
      </div>
    )
  }
  
}

export default Sidebar