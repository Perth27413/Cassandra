import React from 'react'
import Axios from 'axios'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar
} from 'recharts';
import '../components/LineCharts.scss'
import PerhourModel from '../model/carbon/PerhourModel'
import graphModel from '../model/graph/graphModel'

interface IProps {}

interface IState {
  data: Array<any>,
  graphWidth: number,
  graphHeight: number
}

class LineCharts extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      graphWidth: 1260,
      graphHeight: 450,
      data: [
        {
          name: "2021-07-29T16:00:00",
          carbon: 500
        },
        {
          name: "2021-07-29T14:00:00",
          carbon: 600
        },
        {
          name: "2021-07-29T13:00:00",
          carbon: 400
        },
        {
          name: "2021-07-29T12:00:00",
          carbon: 100
        }
      ]
    }
  }

  public componentDidMount(): void {
    this.fetchData()
    this.calculateWidthAndHeight()
    window.addEventListener('resize', this.calculateWidthAndHeight);
  }

  public componentWillUnmount(): void {
    window.removeEventListener('resize', this.calculateWidthAndHeight);
  }

  private async fetchData(): Promise<void> {
    const response = await Axios.get('https://fsk328moy9.execute-api.ap-southeast-1.amazonaws.com/dev//carbon/perhour/')
    let data: Array<PerhourModel> = response.data
    this.mapDataToGraph(data)
  }

  private mapDataToGraph(data: Array<PerhourModel>): void {
    let result: Array<graphModel> = []
    data.forEach((item: PerhourModel) => {
      let graphData: graphModel = new graphModel
      graphData.name = item.dateTime.split('T')[1].split(':').slice(0, 2).join(':')
      graphData.carbon = item.carbon
      result.push(graphData)
    })
    this.setState({
      data: result
    })
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
        </div>
      </div>
    )
  }
}

export default LineCharts