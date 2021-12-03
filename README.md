## Tulo 圖樂-後端

## 使用技術

* 資料庫：posrgreSQL
* Express
* Sequelize
* multer
* dotenv
* jsonwebtoken
* bcrypt

## 如何執行

### 安裝專案所需套件

`npm install`

### 建置環境

將 `.env.example` 修改成 `.env`，並輸入環境資料

```
DB_USERNAME= // 資料庫使用者
DB_PASSWORD= // 資料庫密碼
DB_DATABASE= // 資料庫名稱
DB_PORT= // 資料庫在那個 port
ACCESS_TOKEN_SECRET= // 驗證 JWT 的通行碼
PORT= // 此 server 要開在哪個 port
SALT= // 網站使用者密碼加鹽
```

### 建立資料庫欄位

`npm run create`

### 執行 server 

`npm run start`

## 目錄結構說明

```
├── config                      
│   └── config.js
├── controllers                      
│   ├── art.js     
│   ├── comic.js         
│   ├── user.js         
│   └── work.js   
├── migrations 
├── models                      
│   ├── index.js                
│   ├── art.js       
│   ├── comic.js 
│   ├── user.js
|   └── work.js
├── routes                      
│   ├── art.js                
│   ├── comic.js       
│   ├── image.js 
│   ├── user.js
|   └── work.js
├── .env
├── .prettierrc.json
├── index.js
├── package-lock.json
├── package.json
├── README.md
├── .gitignore
```
