import { app } from './app'
import { env } from './env'

app.get('/hello', () => {
  return 'Hello World!'
})

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log('🚀 HTTP Server Running!')
  })
