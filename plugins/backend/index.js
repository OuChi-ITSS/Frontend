// import querystring from 'querystring'

export default ({ $axios, app }, inject) => {
  const api = $axios
  api.defaults.baseURL = process.env.API_URL
  api.defaults.timeout = 180000
  api.defaults.headers = { 'Content-Type': 'application/json' }
  // Add a request interceptor
  api.interceptors.response.use(
    function (response) {
      // Do something before request is sent
      return response
    },
    function (error) {
      // Do something with request error
      const code = (error.response.data && error.response.data.code) || 5000
      if (error.response.data.code)
        app.$toast.error(
          app.i18n.t(`apiErrors.${code}`, {
            msg: JSON.stringify(error.response.data.message),
          }),
          {
            position: 'top-right',
            theme: 'bubble',
            keepOnHover: true,
            duration: 5000,
          }
        )
      return Promise.reject(error)
    }
  )
  const backend = {
    getProgramList() {
      return api.get('/programs')
      // DELME
      // return api.get('/program.json')
    },
    getProgramInfo(id) {
      return api.get('/programs/' + id)
      // DELME
      // return api.get('/program.json')
    },
    getPoseList(programId) {
      return api.get('/poses?programId=' + programId)
      // DELME
      // return api.get('/pose.json')
    },
  }
  inject('backend', backend)
}
