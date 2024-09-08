#  📦 Stock
ในระยะเวลา 13 วัน ได้พัฒนาเว็บไซต์จัดการสต็อกสินค้าโดยใช้ Next.js เป็น Fullstack และ PostgreSQL เป็นฐานข้อมูลหลัก นอกจากนี้ยังใช้ pnpm สำหรับจัดการแพ็กเกจ และ Tanstack เพื่อเก็บแคชในหน่วยความจำ ช่วยเพิ่มความเร็วในการโหลดข้อมูล ทำให้เว็บไซต์ตอบสนองได้อย่างรวดเร็วและมีประสิทธิภาพ

# 🔧 Tools

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

## 📐 ER Diagram

<img src="https://cdn.discordapp.com/attachments/1282103169538850877/1282103512381128826/diagram-export-8-9-2567-05_19_49.png?ex=66de2371&is=66dcd1f1&hm=1d2d811681fdc412fa6d0f2f4b06363dd8d43c9d180ea3b52a268ab9ca9b88c7&">

```prisma
enum StockStatus {
  APPROVED
  REJECTED
}

enum Role {
  MANAGER
  ADMIN
}
```
```prisma
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
```
```prisma
model Category {
  id        Int      @id @default(autoincrement())
  name      String   @unique
  userId    Int
  createdAt DateTime @default(now())
  updatedAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id])
  Stock     Stock[]
}
```
```prisma
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

## 🚀 Example

|  Login | Register |
| :------------: | :------------: |
|  <img src="https://media.discordapp.net/attachments/1282095960796692561/1282096759719329873/image.png?ex=66de1d27&is=66dccba7&hm=c4adf082efcd5fd8e9935a724d1d87326851f213f00c7223a1385074866f35ce&=&format=webp&quality=lossless&width=1415&height=671"> | <img src="https://media.discordapp.net/attachments/1282095960796692561/1282096820327026709/image.png?ex=66de1d36&is=66dccbb6&hm=395716e1bd046449abbd1c8eceb952edca03f44744a9d5932d3e4323740377c5&=&format=webp&quality=lossless&width=1415&height=671">  |

|  Dashboard Dark Mode | Dashboard Light Mode |
| :------------: | :------------: |
|  <img src="https://cdn.discordapp.com/attachments/1282095960796692561/1282096042229108846/image.png?ex=66de1c7c&is=66dccafc&hm=03d3800ff25281fd9bc277bca644c695a264af8f9a00bc20112a697e28283bcf&"> | <img src="https://cdn.discordapp.com/attachments/1282095960796692561/1282096919547482195/image.png?ex=66de1d4d&is=66dccbcd&hm=f147514a660f344288637bedfa373458cd95f36f35478e95627abda35726540a&">  |

|  Categories |
| :------------: |
|  <img src="https://media.discordapp.net/attachments/1282095960796692561/1282096180741804145/image.png?ex=66de1c9d&is=66dccb1d&hm=479e23b253a97ea4e43c794da06ce264b2952b98af0979e045d35c76754c4e57&=&format=webp&quality=lossless&width=1197&height=671">

|  Stock |
| :------------: |
|  <img src="https://media.discordapp.net/attachments/1282095960796692561/1282096260907536487/image.png?ex=66de1cb0&is=66dccb30&hm=9d5f512d10df2bb673f7e8e8d904ba30cb5fc7621724489e8ac3b70011c25ed8&=&format=webp&quality=lossless&width=923&height=671"> |

|  User |
| :------------: |
|  <img src="https://media.discordapp.net/attachments/1282095960796692561/1282096333448024146/image.png?ex=66de1cc2&is=66dccb42&hm=3566f67f6c0134ceef3fb9176f037cf803435028a356f8e827c41dd17dca5f8c&=&format=webp&quality=lossless&width=924&height=671"> |

|  Modal Detail [Intercept route] | Modal Edit [Intercept route] |
| :------------: | :------------: |
|  <img src="https://media.discordapp.net/attachments/1282095960796692561/1282096458484678666/image.png?ex=66de1cdf&is=66dccb5f&hm=eeb768fc7907cd794c5ce97192bb608df9cff8ea18cfbfd8d115c0d4afd5a62c&=&format=webp&quality=lossless&width=923&height=671"> |  <img src="https://media.discordapp.net/attachments/1282095960796692561/1282096558338216067/image.png?ex=66de1cf7&is=66dccb77&hm=1d644d86367025e8d0f45a7a8243ae22d6b4291e0bd05d0724ceadbf4e2eb72e&=&format=webp&quality=lossless&width=923&height=671"> |

|  Profile |
| :------------: |
|  <img src="https://media.discordapp.net/attachments/1282095960796692561/1282096701938864280/image.png?ex=66de1d19&is=66dccb99&hm=a753eb35bae7f8f9f5ee8505dec907dca76c2b21c9ff22b479a8c5a599b73966&=&format=webp&quality=lossless&width=1415&height=671"> |



