#  📦 Stock
ในระยะเวลา 13 วัน ได้พัฒนาเว็บไซต์จัดการสต็อกสินค้าโดยใช้ Next.js เป็น Fullstack และ PostgreSQL เป็นฐานข้อมูลหลัก นอกจากนี้ยังใช้ pnpm สำหรับจัดการแพ็กเกจ และ Tanstack เพื่อเก็บแคชในหน่วยความจำ ช่วยเพิ่มความเร็วในการโหลดข้อมูล ทำให้เว็บไซต์ตอบสนองได้อย่างรวดเร็วและมีประสิทธิภาพ

## 🔧 Tools

ในโปรเจกต์นี้ ใช้เทคโนโลยีและเครื่องมือต่างๆ เช่น NextJS (เวอร์ชัน 14.2.6) สำหรับการพัฒนา Fullstack, TypeScript (เวอร์ชัน 5) เพื่อความปลอดภัยของโค้ด, Pnpm (เวอร์ชัน 9.6.0) ในการจัดการแพ็กเกจ, และ Tanstack (เวอร์ชัน 5.55.0) สำหรับการจัดเก็บข้อมูลแคช เพิ่มความเร็วในการโหลดของเว็บไซต์ นอกจากนี้ยังใช้ PostgreSQL (เวอร์ชัน 17) เป็นฐานข้อมูล, Tailwind (เวอร์ชัน 3.4.10) สำหรับการออกแบบ, Shadcn (เวอร์ชัน 2.0.4) สำหรับคอมโพเนนต์ UI, Zod (เวอร์ชัน 3.23.8) สำหรับการตรวจสอบข้อมูล, Lodash (เวอร์ชัน 4.17.7) สำหรับฟังก์ชันเสริม, Faker (เวอร์ชัน 8.4.1) สำหรับข้อมูลตัวอย่าง, Eslint (เวอร์ชัน 8) สำหรับมาตรฐานโค้ด, Prisma (เวอร์ชัน 5.18.0) เป็น ORM, Docker (เวอร์ชัน 4.33.1) สำหรับการจัดการคอนเทนเนอร์, และ Postman (เวอร์ชัน 11.11.1) สำหรับการทดสอบ API

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

ใน Prisma schema นี้ กำหนดโมเดลหลักสามตัว ได้แก่ User, Category, และ Stock โดย User แทนผู้ใช้ในระบบและมีบทบาทเช่น MANAGER หรือ ADMIN, Category แทนหมวดหมู่ของสต็อกที่เชื่อมโยงกับผู้ใช้ และ Stock แทนรายการสต็อกที่มีข้อมูลเกี่ยวกับชื่อ, จำนวน, รายละเอียด, และสถานะ. นอกจากนี้ยังมี Enum StockStatus และ Role เพื่อจัดการสถานะของสต็อกและบทบาทของผู้ใช้ตามลำดับ. ทั้งหมดนี้ใช้ PostgreSQL เป็นฐานข้อมูลและ prisma-client เป็น client

Enums: StockStatus มีค่า APPROVED และ REJECTED, ส่วน Role มีค่า MANAGER และ ADMIN
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
User: โมเดลนี้แทนผู้ใช้ในระบบ ซึ่งมีฟิลด์สำคัญเช่น id, name, email, password, image, และ role (มีค่าเริ่มต้นเป็น MANAGER). ผู้ใช้สามารถมีหลาย Category และ Stock
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
Category: โมเดลนี้แทนหมวดหมู่ของสต็อก โดยมีฟิลด์ id, name, userId, และความสัมพันธ์กับ User และ Stock. userId อ้างอิงถึง User ที่เป็นเจ้าของหมวดหมู่นี้
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
Stock: โมเดลนี้แทนรายการสต็อก โดยมีฟิลด์ id, name, amount, detail, image, status (มีค่าเริ่มต้นเป็น APPROVED), CategoryId, และ userId. CategoryId อ้างอิงถึง Category และ userId อ้างอิงถึง User ที่จัดการสต็อกนี้
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



