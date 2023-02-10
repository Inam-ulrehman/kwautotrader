//==================filter===============

// get unique values for filter declare variable
// const categories = getUniqueValues(data,'categories')

export const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item[type])
  // if its an array pass error array = [1,2,3]
  if (type === 'array') {
    unique = unique.flat()
  }
  return ['all', ...new Set(unique)]
}

// ======Difference Between 2 Arrays (Note-Don't use _id)========
export function arrayDiffByKey(key, ...arrays) {
  return [].concat(
    ...arrays.map((arr, i) => {
      const others = arrays.slice(0)
      others.splice(i, 1)
      const unique = [...new Set([].concat(...others))]
      return arr.filter((x) => !unique.some((y) => x[key] === y[key]))
    })
  )
}
// Example:

// const a = [{k:1}, {k:2}, {k:3}];
// const b = [{k:1}, {k:4}, {k:5}, {k:6}];
// const c = [{k:3}, {k:5}, {k:7}];
// arrayDiffByKey('k', a, b, c); // (4) [{k:2}, {k:4}, {k:6}, {k:7}]
//=================payments============

// format price for payments like stripe

export const formatPrice = (number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'CAD',
  }).format(number / 100)
}

// ============Scroll up============
window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })

// ==========bill calculator========

export const totalBill = (cart) => {
  const TotalAmount = cart.reduce((total, cart) => {
    let productQuantity = cart.quantity
    let productAmount = cart.amount * productQuantity
    total += productAmount

    return total
  }, 0)
  return TotalAmount
}
// =============Paragraph limit==========

export const paragraphLimit = (string, length) => {
  var trimmedString = string.substring(0, length) + '...'
  return trimmedString
}
// ==========addObjectInState=======
export const addObjectInState = (payload, state) => {
  const objectArray = Object.entries(payload)
  return objectArray.forEach(([key, value]) => {
    state[key] = value
  })
}
