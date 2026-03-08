export const getAuthStatus = () => {
  if (typeof window === 'undefined') return false
  return localStorage.getItem('isLoggedIn') === 'true'
}

export const setAuthStatus = (status: boolean) => {
  if (typeof window === 'undefined') return
  localStorage.setItem('isLoggedIn', String(status))
}

export const getUser = () => {
  if (typeof window === 'undefined') return null
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

export const setUser = (user: any) => {
  if (typeof window === 'undefined') return
  localStorage.setItem('user', JSON.stringify(user))
}

export const clearAuth = () => {
  if (typeof window === 'undefined') return
  localStorage.removeItem('isLoggedIn')
  localStorage.removeItem('user')
  localStorage.removeItem('token')
}
