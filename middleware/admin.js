export default function({ store, route, redirect }) {
  if (!store.state.auth.isAdmin) {
    if (route.path != '/dashboard') return redirect('/dashboard')
  }
}
