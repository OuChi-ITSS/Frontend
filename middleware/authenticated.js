export default function ({ store, redirect }) {
  // If the user is not authenticated
  const token = localStorage.getItem('token')
  if (!token) {
    return redirect('/login')
  }
}
