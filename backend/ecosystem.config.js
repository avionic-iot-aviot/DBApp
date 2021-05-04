module.exports = {
    apps: [
        {
            name: "dbapp",
            script: "./dist/main.js",
            instance_var: 'INSTANCE_ID',
            env: {
                "NODE_ENV": "staging"
            }
        }
    ]
}