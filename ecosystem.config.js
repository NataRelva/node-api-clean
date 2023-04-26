module.exports = {
  apps: [
    {
      name: "madeinnatural-api",
      script: "./dist/main/server.js",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};