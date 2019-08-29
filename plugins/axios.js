export default function({ $axios, redirect }) {
  $axios.setHeader('Access-Control-Allow-Origin', '*')
  $axios.setHeader('Content-Type', 'application/json; charset=utf-8', ['get'])
}
