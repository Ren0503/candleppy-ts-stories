# Candleppy

![Candleppy](https://github.com/Ren0503/candleppy-ts-stories/blob/master/client/src/assets/header.png)

> Trang kể truyện kinh dị với M.E.R.N Stack (dùng TypeScript). Repo được chia làm hai phần chính:
- **server** chứa API cho Candleppy sử dụng Node.js, Express và MongoDB.
- **client** là trang giao diện dùng React và Redux.

## Tính năng

1. Đăng ký/Đăng nhập
2. Viết bài
3. Tìm kiếm bài theo tiêu đề hay thể loại
4. Tìm kiếm bài theo tác giả
5. Đánh giá câu chuyện
6. Thêm câu chuyện vào bộ sưu tập
7. Chỉnh sửa hồ sơ
8. Chuyển văn bản thành giọng nói

### Server

| Plugin | README |
| ------ | ------ |
| bcrypt | [plugins/bcryptjs/README.md](https://github.com/kelektiv/node.bcrypt.js/blob/master/README.md) |
| express | [plugins/express/README.md](https://github.com/expressjs/express/blob/master/Readme.md) |
| jsonwebtoken | [plugins/jsonwebtoken/README.md](https://github.com/auth0/node-jsonwebtoken/blob/master/README.md) |
| mongoose | [plugins/mongoose/README.md](https://github.com/Automattic/mongoose/blob/master/README.md) |
| morgan | [plugins/morgan/README.md](https://github.com/expressjs/morgan/blob/master/README.md) |
| nodemon | [plugins/nodemon/README.md](https://github.com/remy/nodemon/blob/master/README.md) |

### Client

| Plugin | README |
| ------ | ------ |
| axios | [plugins/axios/README.md](https://github.com/axios/axios/blob/master/README.md) |
| react | [plugins/react/README.md](https://github.com/facebook/react/blob/master/README.md) |
| react-bootstrap | [plugins/react-bootstrap/README.md](https://github.com/react-bootstrap/react-bootstrap/blob/master/README.md) |
| react-redux | [plugins/react-redux/README.md](https://github.com/reduxjs/react-redux) |
| react-router-dom | [plugins/react-router/README.md](https://github.com/ReactTraining/react-router/blob/master/README.md) |
| react-quill | [plugins/react-quill/README.md](https://github.com/zenoamaro/react-quill/blob/master/README.md) |
| redux | [plugins/redux/README.md](https://github.com/reduxjs/redux)|
| redux-thunk | [plugins/redux-thunk/README.md](https://github.com/reduxjs/redux-thunk/blob/master/README.md) |

## Core Structure
    code
      ├── package.json
      ├── server
      │   ├── dist
      │   ├── src
      │   │   ├── config
      │   │   ├── controllers
      │   │   ├── middleware
      │   │   ├── routes
      │   │   ├── types
      │   │   ├── utils
      │   │   └── server.ts
      │   └── package.json
      │
      ├── client
      │   ├── public
      │   ├── src
      │   │   ├── actions
      │   │   ├── assets
      │   │   ├── components
      │   │   ├── error
      │   │   ├── layouts
      │   │   ├── reducers
      │   │   ├── routes
      │   │   ├── screens
      │   │   ├── styles
      │   │   ├── types
      │   │   ├── App.tsx
      │   │   ├── store.ts
      │   │   └── index.ts
      │   │
      │   └── package.json
      │
      ├── .gitignore
      └── README.md

### Screenshots
|                                        Home                                        |                                        Detail                                        |                                        Author                                        |
| :--------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------: |
| ![](https://github.com/Ren0503/thoth-js-blogpost/blob/master/client/src/assets/screenshots/home.png) | ![](https://github.com/Ren0503/thoth-js-blogpost/blob/master/client/src/assets/screenshots/category.png) | ![](https://github.com/Ren0503/thoth-js-blogpost/blob/master/client/src/assets/screenshots/author.png) |

|                                        Add                                        |                                        Collection                                        |                                        Collection                                        |
| :--------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------: |
| ![](https://github.com/Ren0503/thoth-js-blogpost/blob/master/client/src/assets/screenshots/my_story.png) | ![](https://github.com/Ren0503/thoth-js-blogpost/blob/master/client/src/assets/screenshots/detail.png) | ![](https://github.com/Ren0503/thoth-js-blogpost/blob/master/client/src/assets/screenshots/edit.png) |
