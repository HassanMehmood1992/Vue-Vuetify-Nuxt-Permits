export default function({ store, route, redirect }) {
  if (
    route.path != '/register' &&
    route.path != '/terms-and-conditions' &&
    route.path != '/forgot-password' &&
    route.path != '/reset-password'
  ) {
    if (!store.state.auth.isLoggedIn) {
      if (route.path != '/login') return redirect('/login')
    } else {
      if (route.path == '/login' || route.path == '/')
        return redirect('/dashboard')
    }
  }
}
