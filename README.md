# DACN_FE
-------------Frontend-------
npm install     (cài đặt lại các dependencies từ package.json )
npx expo start


---------------Backend login, sign up----------------------
1. connect mongodb
   1.1 kết nối tới	mongodb://localhost:27017
   1.2 tạo database mới tên recycling_app

2. sửa API_URL đoạn YOUR_IP_ADDRESS dưới thành ipv4 của laptop (cmd -> ipconfig xem)

const API_URL = 'http://YOUR_IP_ADDRESS:5000/api'; 

3. chạy 2 terminal
  3.1 cd backend
      npm run dev

  3.2 npx expo start --clear    (có thêm clear để xóa cache cũ, dùng "npx expo star" như bình thường vẫn được)