import React from 'react'
import Link from 'next/link'
import './Sidebar.scss'

interface IProps {}

interface IState {
}

class Sidebar extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
    }
  }

  render(): JSX.Element {
    return (
      <div id="sidebar">
        <label>This is Sidebar</label>
      </div>
    )
  }
}

export default Sidebar