export const transformRow = gifs =>
  gifs.reduce(
    (rows, key, index) =>
      (index % 3 === 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) &&
      rows,
    []
  )

export const isProd = () => process.env.NODE_ENV === 'production'
