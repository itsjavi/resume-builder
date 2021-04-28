/**
 * API Config
 *
 * */

export default {
  // The URL we're connecting to
  hostname: process.env.NEXT_PUBLIC_SERVER_URL,
  imgurHostname: 'https://api.imgur.com/3/image',

  endpoints: [
    {key: 'save', url: '/save', method: 'POST'},
    {key: 'download', url: '/download', method: 'GET'},
    {key: 'download', url: '/download', method: 'POST'}
  ]
}
