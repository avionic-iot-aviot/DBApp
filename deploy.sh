mkdir /db
sqlite3 /db/mydb.sqlite < create.sql


PROJECT_FOLDER="DBApp"

echo 'Scarico da Github'
rm -rf $PROJECT_FOLDER
git clone https://github.com/avionic-iot-aviot/DBApp

echo 'Avvio di deploy'

pm2 delete 0
cd ~/$PROJECT_FOLDER/backend
npm install
npm run be:build
NODE_ENV=staging knex migrate:up
pm2 start ecosystem.config.js && cd ~/ && pm2 startup openrc > pm2_startup_output && tail -n 1 pm2_startup_output > pm2_startup.sh && chmod a+rwx pm2_startup.sh && ./pm2_startup.sh && pm2 save
cd ~/$PROJECT_FOLDER/backend
pm2 logs 0

