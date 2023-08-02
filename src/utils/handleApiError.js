export const handleApiError = (e, msg = 'Something went wrong') => {
  if (e.response && e.response.data && e.response.data.msg) {
    return e.response.data.msg
    } else {
    return msg
  }
}