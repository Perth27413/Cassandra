import React from 'react'
import './Loading.scss'

interface IProps { }

interface IState {
}

class Loading extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
    }
  }

  render(): JSX.Element {
    return (
      <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    )
  }
}

export default Loading