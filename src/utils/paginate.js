const paginate = (data) => {
  const itemsPerPage = 10
  const pages = Math.ceil(data.length / itemsPerPage)
  const newData = Array.from({ length: pages }, (_, index) => {
    const start = index * itemsPerPage
    return data.slice(start, start + itemsPerPage)
  })
  return newData
}

export default paginate
