import React from 'react'
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
          name: "Page A",
          uv: 4000,
          pv: 2400,
          amt: 2400
        },
        {
          name: "Page B",
          uv: 3000,
          pv: 1398,
          amt: 2210
        },
        {
          name: "Page C",
          uv: 2000,
          pv: 9800,
          amt: 2290
        },
        {
          name: "Page D",
          uv: 2780,
          pv: 3908,
          amt: 2000
        },
        {
          name: "Page E",
          uv: 1890,
          pv: 4800,
          amt: 2181
        },
        {
          name: "Page F",
          uv: 2390,
          pv: 3800,
          amt: 2500
        },
        {
          name: "Page G",
          uv: 3490,
          pv: 4300,
          amt: 2100
        }
      ]
    }
  }

  public componentDidMount(): void {
    this.calculateWidthAndHeight()
    window.addEventListener('resize', this.calculateWidthAndHeight);
  }

  public componentWillUnmount(): void {
    window.removeEventListener('resize', this.calculateWidthAndHeight);
  }

  public calculateWidthAndHeight = (): void => {
    let width: number = window.screen.width
    let newWidth: number = 0
    let newHeight: number = 0
    if (width >= 1050 && width <= 1680) {
      newWidth = 1160
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
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart> 
        </div>
      </div>
    )
  }
}

export default LineCharts