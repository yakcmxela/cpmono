module.exports = {
  apps: [
    {
      name: 'cportland-api',
      cwd: '/home/ubuntu/cportland-api',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
