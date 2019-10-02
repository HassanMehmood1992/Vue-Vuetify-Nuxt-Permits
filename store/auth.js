import cryptojs from 'crypto-js'
import qs from 'qs'

export const state = () => ({
  isLoggedIn:
    !!localStorage.getItem('access_token') && !!localStorage.getItem('user'),
  isAdmin: localStorage.getItem('isAdmin') == 'false' ? false : true || false,
  token: localStorage.getItem('access_token') || null,
  userId: localStorage.getItem('user_id') || null,
  user: JSON.parse(localStorage.getItem('user')) || null
})
export const getters = {}
export const mutations = {
  setIsLoggedIn(state, val) {
    state.isLoggedIn = val
  },

  setToken(state, val) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + val
    state.token = val
  },

  setUserId(state, val) {
    state.userId = val
  },

  setUser(state, val) {
    state.user = val
  },

  setIsAdmin(state, val) {
    state.isAdmin = val
  }
}
export const actions = {
  getToken(context, credentials) {
    let encUsername = encryption.encryptData(credentials.username)
    let encPassword = encryption.encryptData(credentials.password)

    const dataObj = {
      username: encUsername,
      password: encPassword,
      grant_type: 'password',
      client_id: '2184085be8e14e09be357c52f2386260'
    }

    const RSdataObj = qs.stringify(dataObj)

    return new Promise((resolve, reject) => {
      delete axios.defaults.headers.common['Authorization']
      axios({
        url: `${process.env.authUrl}oauth2/token`,
        method: 'post',
        data: RSdataObj,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
        .then(response => {
          localStorage.setItem('access_token', response.data.access_token)
          localStorage.setItem('user_id', response.data.user_id)
          context.commit('setIsLoggedIn', true)
          context.commit('setToken', response.data.access_token)
          context.commit('setUserId', response.data.user_id)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  deleteToken(context) {
    return new Promise((resolve, reject) => {
      localStorage.removeItem('access_token')
      localStorage.removeItem('user_id')
      localStorage.removeItem('user')
      localStorage.removeItem('isAdmin')
      context.commit('setIsLoggedIn', false)
      context.commit('setToken', null)
      context.commit('setUserId', null)
      context.commit('setUser', null)
      context.commit('setIsAdmin', false)
      resolve()
    })
  },

  getUserDetails(context, userId) {
    return new Promise((resolve, reject) => {
      axios
        .get(`accounts/user/${userId}`)
        .then(response => {
          localStorage.setItem('user', JSON.stringify(response.data.result))
          localStorage.setItem(
            'isAdmin',
            response.data.result.userRoles[0].roleName == 'Admin'
          )
          context.commit('setUser', response.data.result)
          context.commit(
            'setIsAdmin',
            response.data.result.userRoles[0].roleName == 'Admin'
          )
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

var encryption = {
  encryptionKey: cryptojs.enc.Utf8.parse('charterpadntwork'),
  encryptionIv: cryptojs.enc.Utf8.parse('e84ad660c4721ae0'),

  encryptData(data) {
    var encryptedData = cryptojs.AES.encrypt(data, this.encryptionKey, {
      iv: this.encryptionIv,
      keySize: 128 / 8,
      mode: cryptojs.mode.CBC,
      padding: cryptojs.pad.Pkcs7
    })
    return encryptedData.toString()
  },
  decryptData(encrypteddata) {
    var decrypticData = cryptojs.AES.decrypt(
      encrypteddata,
      this.encryptionKey,
      {
        iv: this.encryptionIv,
        keySize: 128 / 8,
        mode: cryptojs.mode.CBC,
        padding: cryptojs.pad.Pkcs7
      }
    ).toString(cryptojs.enc.Utf8)
    return decrypticData.toString()
  }
}
