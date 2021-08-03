import Axios from 'axios'
import PerhourModel from '../../model/carbon/PerhourModel'
import UserModel from '../../model/user/userModel'

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

  public async fetchDataUser(): Promise<Array<UserModel>> {
    try {
      const response = await Axios.get(`https://fsk328moy9.execute-api.ap-southeast-1.amazonaws.com/dev/user/all`)
      let data: Array<UserModel> = response.data
      return data
    } catch (error) {
      console.error(error)
    }
  }

  public async fetchDataAVGCarbon(): Promise<number> {
    try {
      const response = await Axios.get(`https://fsk328moy9.execute-api.ap-southeast-1.amazonaws.com/dev/carbon/avg`)
      let data: number = response.data
      return data
    } catch (error) {
      console.error(error)
    }
  }

  public async fetchDataTotalPayment(): Promise<number> {
    try {
      const response = await Axios.get(`https://fsk328moy9.execute-api.ap-southeast-1.amazonaws.com/dev/user/earn`)
      let data: number = response.data
      return data
    } catch (error) {
      console.error(error)
    }
  }
}

export default GetDataAPI