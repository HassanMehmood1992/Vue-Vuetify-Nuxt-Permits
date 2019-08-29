import cryptojs from 'crypto-js'
import qs from 'qs'

export const state = () => ({})
export const getters = {}
export const mutations = {}
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

    this.$axios
      .$request({
        url: `${process.env.authUrl}oauth2/token`,
        method: 'post',
        data: RSdataObj,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .then(response => {})
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
