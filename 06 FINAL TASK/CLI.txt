npm i express prisma jsonwebtoken cookie-parser dotenv @prisma/client
npx prisma init
npm i bcryptjs
npm i --save-dev @types/jsonwebtoken

npm i --save-dev @types/node
npm install --save-dev @types/express
npm i --save-dev @types/cookie-parser

npm i -D typescript ts-node nodemon @types/node @types/express @types/jsonwebtoken 

for seeding
put this in the package.json
"prisma": {
"seed": "ts-node prisma/seed.ts"
},

must have this dev dependencies
npm install -D typescript ts-node @types/node
after that cli command
npx prisma db seed
