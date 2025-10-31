# Đồ án EProject - Hệ thống E-commerce Microservices

Đây là đồ án môn học Lập trình Hướng dịch vụ (EProject), trình bày việc xây dựng một hệ thống E-commerce cơ bản dựa trên kiến trúc Microservices. Hệ thống sử dụng các công nghệ chính bao gồm Node.js, MongoDB, RabbitMQ, và được đóng gói, triển khai bằng Docker.

## Thông tin Sinh viên Thực hiện
# Đồ án EProject — Hệ thống E‑commerce Microservices

Đồ án môn Lập trình Hướng dịch vụ (EProject). Hệ thống là ví dụ nền tảng thương mại điện tử nhỏ, theo kiến trúc microservices, sử dụng Node.js, MongoDB, RabbitMQ và Docker.

## Thông tin sinh viên

- MSSV: **22691011**
- Họ và tên: **VŨ BÍCH VI**
- Email: **vubi8266@gmail.com**

---

## 1. Tổng quan & Mục tiêu

Hệ thống triển khai các chức năng cơ bản:
- Quản lý người dùng (đăng ký, đăng nhập, JWT authentication)
- Quản lý sản phẩm (CRUD)
- Quản lý đơn hàng (nhận message từ product qua RabbitMQ, lưu order)

## 2. Kiến trúc hệ thống

Services:

1. `api-gateway` — Gateway (port 3003)
2. `auth` — Authentication service (port 3000)
3. `product` — Product service (port 3001)
4. `order` — Order service (port 3002)
5. `mongodb` — MongoDB (port 27017)
6. `rabbitmq` — RabbitMQ (port 5672)

Luồng giao tiếp chính:
- Client -> API Gateway (HTTP, đồng bộ)
- API Gateway -> các service (HTTP, đồng bộ)
- Product <-> Order (RabbitMQ, bất đồng bộ)

## 3. Prerequisites (gợi ý)

- Docker Desktop (phiên bản mới)
- Node.js v16+ (nếu muốn chạy từng service cục bộ không qua Docker)

## 4. Biến môi trường (Environment variables)

Các service có thể cần những biến môi trường sau (ví dụ):

- `PORT` — port service (ví dụ 3001)
- `MONGO_URI` — connection string MongoDB
- `JWT_SECRET` — khóa JWT
- `RABBITMQ_URL` — connection URL cho RabbitMQ

Gợi ý: tạo file `.env` cục bộ (không commit). Bạn có thể thêm một file `env.example` trong repo để liệt kê các biến cần thiết.

## 5. Chạy toàn bộ hệ thống (Docker Compose)

Vào thư mục gốc chứa `docker-compose.yml` rồi chạy:

```bash
# dọn sạch môi trường cũ (tùy chọn)
docker-compose down -v

# build và khởi động tất cả dịch vụ ở background
docker-compose up -d --build

# kiểm tra trạng thái container
docker-compose ps
```

Đợi vài giây để tất cả service sẵn sàng (Mongo & RabbitMQ cần thời gian khởi động).

## 6. Kiểm thử (Postman)

Tất cả request gửi đến API Gateway: `http://localhost:3003`.

1) Đăng ký user

POST http://localhost:3003/auth/register

Body (JSON):

```json
{
  "username": "nh",
  "password": "12345"
}
```

2) Đăng nhập

POST http://localhost:3003/auth/login

Body (JSON):

```json
{
  "username": "nh",
  "password": "12345"
}
```

Lấy token từ response và dùng header `Authorization: Bearer <token>` cho các request cần auth.

3) Tạo sản phẩm

POST http://localhost:3003/products/api/products

Headers: `Authorization: Bearer <token>`

Body (JSON):

```json
{
  "name": "nh",
  "description": "123",
  "price": 300
}
```

4) Đặt hàng (publish message)

POST http://localhost:3003/products/api/products/buy

Headers: `Authorization: Bearer <token>`

Body (JSON):

```json
{
  "ids": ["ID_SẢN_PHẨM"]
}
```

5) Lấy sản phẩm theo id (endpoint demo)

GET http://localhost:3003/products/api/products/:id

Nếu endpoint yêu cầu auth, thêm header `Authorization`.

Nếu bạn cập nhật code service `product`, có thể rebuild và recreate container:

```bash
docker-compose build product
docker-compose up -d --force-recreate product
```

## 7. Git (quy trình)

Các lệnh cơ bản:

```bash
git add .
git commit -m "Mô tả thay đổi"
git push origin main
```

Lưu ý: `/.gitignore` nên bao gồm `.env`, `node_modules/` và các file không cần thiết. KHÔNG commit file chứa secrets.

## 8. Bảo mật & Lưu ý

- Tuyệt đối không đưa `.env` hoặc các khoá, mật khẩu lên GitHub.
- Nếu phát hiện secrets bị commit, phải rotate keys ngay (khóa cũ không an toàn) và xóa lịch sử (BFG hoặc git filter-repo) nếu cần.

## 9. Các lệnh hữu ích

- Xem logs tất cả container:

```bash
docker-compose logs -f
```

- Xem logs của một service:

```bash
docker-compose logs -f product
```

## 10. Liên hệ

- Email: vubi8266@gmail.com

---

