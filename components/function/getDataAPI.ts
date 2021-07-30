import Axios from 'axios'
import PerhourModel from '../../model/carbon/PerhourModel'

class GetDataAPI {
  public async fetchDataPerHour(): Promise<Array<PerhourModel>> {
    try {
      const response = await Axios.get('https://fsk328moy9.execute-api.ap-southeast-1.amazonaws.com/dev//carbon/perhour/')
      let data: Array<PerhourModel> = response.data
      return data
    } catch (error) {
      console.error(error)
    }
  }

  public async fetchDataFromDate(startDate: string, endDate: string): Promise<Array<PerhourModel>> {
    try {
      const response = await Axios.get(`https://fsk328moy9.execute-api.ap-southeast-1.amazonaws.com/dev/carbon/range?startTime=${startDate}&endTime=${endDate}`)
      let data: Array<PerhourModel> = response.data
      return data
    } catch (error) {
      console.error(error)
    }
  }
}

export default GetDataAPI