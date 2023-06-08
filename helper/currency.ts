export default (val : number): string => {
  const result = val.toLocaleString('id-ID',{
    style: 'currency',
    currency: 'IDR'
  })
  return result
}