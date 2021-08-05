import React from 'react'
import Axios from 'axios'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import '../components/LineCharts.scss'
import PerhourModel from '../model/carbon/PerhourModel'
import graphModel from '../model/graph/graphModel'
import Loading from '../components/general-components/Loading'
import GetDataAPI from './function/getDataAPI'

interface IProps {}

interface IState {
  data: Array<any>,
  graphWidth: number,
  graphHeight: number,
  isLoading: boolean
}

class LineCharts extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      graphWidth: 1260,
      graphHeight: 450,
      isLoading: true,
      data: []
    }
  }

  public async componentDidMount(): Promise<void> {
    let today: string = this.getDateAndFormat(0)
    this.mapDataToGraph(await new GetDataAPI().fetchDataPerHour(today), 'hour')
    this.calculateWidthAndHeight()
    window.addEventListener('resize', this.calculateWidthAndHeight);
  }

  public getDateAndFormat = (dateNumber: number) => {
    let date: Date = new Date()
    date.setDate(date.getDate() + dateNumber)
    let dd = String(date.getUTCDate()).padStart(2, '0')
    let mm = String(date.getUTCMonth() + 1).padStart(2, '0')
    var yyyy = date.getFullYear()
    return yyyy + '-' + mm + '-' + dd
  }

  public componentWillUnmount(): void {
    window.removeEventListener('resize', this.calculateWidthAndHeight);
  }

  public setData = (value: Array<PerhourModel>, type: string): void => {
    this.setState({isLoading: true})
    this.mapDataToGraph(value, type)
    setTimeout(() => {
      this.setState({isLoading: false})
    }, 1800)
  }

  private mapDataToGraph(data: Array<PerhourModel>, type: string): void {
    let result: Array<graphModel> = []
    data.forEach((item: PerhourModel) => {
      let graphData: graphModel = new graphModel
      // graphData.name = type === 'hour' ? item.dateTime.slice(11, 19) : item.dateTime.slice(0, 10)
      graphData.name = type === 'hour' ? item.dateTime : item.dateTime.slice(0, 10)
      graphData.carbon = Number((item.carbon/1000).toFixed(2))
      result.push(graphData)
    })
    setTimeout(() => {
      this.setState({
        data: result,
        isLoading: false
      })
    }, 1500)
  }

  public calculateWidthAndHeight = (): void => {
    let width: number = window.screen.width
    let newWidth: number = 0
    let newHeight: number = 0
    if (width >= 1050 && width <= 1680) {
      newWidth = 1130
      newHeight = 400
    } else {
      newWidth = 1260
      newHeight = 450
    }
    this.setState({
      graphWidth: newWidth,
      graphHeight: newHeight
    })
  }

  render(): JSX.Element {
    return (
      <div id="lineChartsBox">
        <div id="lineCharts">
          {this.state.isLoading ?
          <div className="graph-loading">
            <Loading/>
          </div>
          :
          <LineChart
            width={this.state.graphWidth}
            height={this.state.graphHeight}
            data={this.state.data}
            margin={{
              top: 10,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="carbon" stroke="#82ca9d" />
          </LineChart>
          }
          
        </div>
      </div>
    )
  }
}

export default LineCharts