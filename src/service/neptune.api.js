import axios from 'axios'

const defaultConfig = {
  baseURL: 'https://np.ironhelmet.com/',
  withCredentials: true
}
const axiosInstance = axios.create(defaultConfig)

const NeptuneApi = {

  login (alias, password) {
    return this.post('arequest/login', {type: 'login', alias: alias, password: password})
  },
  logout () {
    return axiosInstance.get('logout')
  },
  initPlayer () {
    return this.post('mrequest/init_player', {type: 'init_player'})
  },
  post (url, formData) {
    var bodyFormData = new FormData()
    for (var k in formData) {
      bodyFormData.append(k, formData[k])
    }
    return axiosInstance.post(url, bodyFormData)
      .then(r => {
        return r.data
      })
      .catch(e => {
        console.error(e)
      })
  }

}

export default NeptuneApi
