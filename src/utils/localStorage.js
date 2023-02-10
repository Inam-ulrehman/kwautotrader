//  user in local Storage //
export const setUserInLocalStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user))
}

export const getUserFromLocalStorage = () => {
  const result = localStorage.getItem('user')
  const user = result ? JSON.parse(result) : null
  return user
}

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem('user')
}
//  set Cart in local storage //
export const setCartInLocalStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart))
}

export const getCartFromLocalStorage = () => {
  const result = localStorage.getItem('cart')
  const user = result ? JSON.parse(result) : null
  return user
}

export const removeCartFromLocalStorage = () => {
  localStorage.removeItem('cart')
}
