module.exports = {
  apps: [
    {
      name: 'pennywise-backend',
      script: 'server.js',
      cwd: __dirname,
      instances: 1,
      autorestart: true,
      watch: false,
      max_restarts: 10,
      restart_delay: 1000,
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
}
