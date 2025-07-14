# PRISMA-ORM-WITH-RDBMS-NOSQL-NODE-EXPRESS-API
# After updating the Prisma schema file, make sure to run npx prisma generate to apply the changes and reflect them on the server.
# id        Int      @id @default(autoincrement()) --- RDBMS
# id        String   @id @default(auto()) @map("_id") @db.ObjectId --- NOSQL


# datasource db {
#   provider = "mysql"
#   url      = env("DATABASE_URL")
# }

# datasource db {
#   provider = "mongodb"
#   url      = env("MONGO_URL")
# }
