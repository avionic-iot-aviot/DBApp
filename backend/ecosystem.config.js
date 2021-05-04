


module.exports = {
    apps: [
        {
            name: "dbapp",
            script: "./dist/main.js",
            watch: true,
            instance_var: 'INSTANCE_ID',
            env: {
                "NODE_ENV": "staging"
            }
        }
    ]
}