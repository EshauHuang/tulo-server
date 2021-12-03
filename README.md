# Tulo 圖樂-後端

## 使用技術

* 資料庫：posrgreSQL
* Express
* Sequelize
* multer
* dotenv
* JWT
* bcrypt

## 如何執行

### 安裝專案所需套件

`npm install`

### 建置環境

將 `.env.example` 修改成 `.env`，並輸入環境資料

### 執行 server 

`nodemon index.js` 或 `node index.js`

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
