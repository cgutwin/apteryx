module.exports = {
  apps : [
    {
      name: "apteryx",
      script: "./lib/index.js",
      env: {
        "NODE_ENV": "production",
        "PORT": 5000
      }
    }
  ]
}
