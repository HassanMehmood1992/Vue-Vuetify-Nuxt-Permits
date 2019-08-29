export default function({ store, route, redirect }) {
  if (!store.state.app.isLoggedIn) {
    console.log('store.state.app.isLoggedIn', store.state.app.isLoggedIn)
    console.log('route', route.path)
    if (route.path != '/login') return redirect('/login')
  } else {
    if (route.path == '/login' || route.path == '/')
      return redirect('/dashboard')
  }
}
