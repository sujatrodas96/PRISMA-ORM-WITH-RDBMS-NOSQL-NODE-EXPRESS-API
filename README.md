# PRISMA-ORM-WITH-RDBMS-NOSQL-NODE-EXPRESS-API
# npx prisma generate for updating prisma schema file
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
