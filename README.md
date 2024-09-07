# Stock

| Favicon  | Package | Version  |
| :------------: | :------------: | :------------: |
| <img src="https://nextjs.org/favicon.ico" width="24vh" > | NextJS  | 14.2.6 |
| <img src="https://next-auth.js.org/img/favicon.ico" width="24vh" > | NextAuth  | 4.24.7 |
| <img src="https://pnpm.io/img/favicon.png" width="24vh" > | Pnpm  | 9.6.0  |
| <img src="https://tanstack.com/favicon.ico" width="24vh" >  | Tanstack  | 5.55.0 |
| <img src="https://tailwindcss.com/favicons/favicon-32x32.png?v=3" width="24vh" > | Tailwind  | 3.4.10 |
| <img src="https://ui.shadcn.com/favicon-16x16.png" width="24vh" >  | Shadcn | 2.0.4 |
| <img src="https://zod.dev/static/favicon-32x32.png" width="24vh" >  | Zod | 3.23.8 |
| <img src="https://www.typescriptlang.org/favicon-32x32.png?v=8944a05a8b601855de116c8a56d3b3ae" width="24vh" >  | Typescript  | 5 |
| <img src="https://lodash.com/icons/favicon-32x32.png" width="24vh" >  | Lodash  | 4.17.7 |
| <img src="https://opencollective.com/static/images/favicon.ico.png" width="24vh" >  | Faker  | 8.4.1 |
| <img src="https://eslint.org/favicon.ico" width="24vh" >  | Eslint  | 8 |
| <img src="https://www.prisma.io/images/favicon-32x32.png" width="24vh" >  | Prisma  | 5.18.0 |
| <img src="https://www.postgresql.org/favicon.ico" width="24vh" >  | PostgreSQL  | 17 |
| <img src="https://www.docker.com/wp-content/uploads/2024/02/cropped-docker-logo-favicon-32x32.png" width="24vh" >  | Docker  | 4.33.1 |
| <img src="https://www.postman.com/_ar-assets/images/favicon-1-32.png" width="24vh" >  | Postman  | 11.11.1 |

#### ER Diagram

<img src="https://cdn.discordapp.com/attachments/1282103169538850877/1282103512381128826/diagram-export-8-9-2567-05_19_49.png?ex=66de2371&is=66dcd1f1&hm=1d2d811681fdc412fa6d0f2f4b06363dd8d43c9d180ea3b52a268ab9ca9b88c7&" width="400vh" >

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?
// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum StockStatus {
  APPROVED
  REJECTED
}

enum Role {
  MANAGER
  ADMIN
}

model User {
  id        Int        @id @default(autoincrement())
  name      String     @unique
  email     String     @unique
  password  String
  image     String?
  role      Role       @default(MANAGER)
  createdAt DateTime   @default(now())
  updatedAt DateTime   @default(now())
  Category  Category[]
  Stock     Stock[]
}

model Category {
  id        Int      @id @default(autoincrement())
  name      String   @unique
  userId    Int
  createdAt DateTime @default(now())
  updatedAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id])
  Stock     Stock[]
}

model Stock {
  id         Int         @id @default(autoincrement())
  name       String      @unique
  amount     Int
  detail     String
  image      String?
  status     StockStatus @default(APPROVED)
  CategoryId Int
  userId     Int
  createdAt  DateTime    @default(now())
  updatedAt  DateTime    @default(now())
  category   Category    @relation(fields: [CategoryId], references: [id])
  user       User        @relation(fields: [userId], references: [id])
}

```

#### Example Mode
|  Dark Mode | Light Mode |
| :------------: | :------------: |
|  <img src="https://cdn.discordapp.com/attachments/1282095960796692561/1282096042229108846/image.png?ex=66de1c7c&is=66dccafc&hm=03d3800ff25281fd9bc277bca644c695a264af8f9a00bc20112a697e28283bcf&" width="300vh" > | <img src="https://cdn.discordapp.com/attachments/1282095960796692561/1282096919547482195/image.png?ex=66de1d4d&is=66dccbcd&hm=f147514a660f344288637bedfa373458cd95f36f35478e95627abda35726540a&" width="300vh" >  |



