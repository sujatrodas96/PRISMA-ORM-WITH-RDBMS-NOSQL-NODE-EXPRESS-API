# PRISMA-ORM-WITH-RDBMS-NOSQL-NODE-EXPRESS-API
# After updating the Prisma schema file, make sure to run npx prisma generate to apply the changes and reflect them on the server.
# Prisma ID configuration based on the type of database:

# For Relational Databases (e.g., MySQL, PostgreSQL)
# id        Int     @id @default(autoincrement())  # Auto-incrementing primary key

# For NoSQL Databases (e.g., MongoDB)
# id        String  @id @default(auto()) @map("_id") @db.ObjectId  # MongoDB ObjectId mapped to "_id"


# Example datasource configurations:

# For MySQL (Relational Database)
# datasource db {
#   provider = "mysql"
#   url      = env("DATABASE_URL")
# }

# For MongoDB (NoSQL Database)
# datasource db {
#   provider = "mongodb"
#   url      = env("MONGO_URL")
# }

