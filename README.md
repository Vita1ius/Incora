Cтворити файл .env і добавити DATABASE_URL="postgresql://postgres:postgres@localhost:5432/db_user?schema=public"

зразок: DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

Команди для запуску:

    npm install

    npx prisma migrate dev --name init

    npm run start
