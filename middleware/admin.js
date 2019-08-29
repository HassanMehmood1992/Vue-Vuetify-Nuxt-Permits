export default function({ store, route, redirect }) {
  if (!store.state.app.isAdmin) {
    if (route.path != '/dashboard') return redirect('/dashboard')
  }
}
