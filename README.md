# MVX Bank Fullstack

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

Banking capstone project for my MIT xPro Fullstack course.

## Motivation

This project is a recap of what I've learned throughout the last year in my MERN Fullstack course. I'm coming from a desktop/.NET background with zero knowledge of web development. I started with learning Javascript and slowly progressing to Typescript. Followed by HTML and CSS basics, moving on to React NodeJS and MongoDB. We covered some of the tech leader such as, Docker, OAuth, Firebase, Redis, Graphql, Bootstrap, Formik, Yup and many more...

## Description

This is a banking app from my course that has been refactored, each time adding techniques acquired along the way. While this app seems very simple, there is a lot happening in the background, assuring a high quality, quick, responsive, reliable, and safe experience.

In this version, you will find:

- Home page
- User creation
- Login - Logout
- Deposit
- Withdrawal
- Transaction log

<img src="https://github.com/Mike-Veilleux/MVX_Bank_Fullstack/blob/main/screenshots/mvx_bank_allshots.png">

# Technology Stack

### Front-End

| Package                 | Version | Description                 |
| :---------------------- | :-----: | :-------------------------- |
| Axios                   |  1.4.0  | HTTP requests               |
| Bootstrap               |  5.2.3  | UI component Style          |
| Date-fns                | 2.30.0  | Date manipulation           |
| Formik                  |  2.2.9  | Form validation             |
| React                   | 18.2.0  | Front-end framework         |
| React-bootstrap         |  2.7.4  | UI component Library        |
| React-dom               | 18.2.0  | DOM management              |
| React-router-dom        | 18.2.0  | Single page router          |
| React-uuid              |  2.0.0  | Unique ID generator         |
| Typescript              |  5.0.4  | Javascript support for Type |
| Simple-zustand-devtools |  1.1.0  | State management tool       |
| Yup                     |  1.0.2  | Data validation             |
| Zustand                 |  4.3.8  | State management            |

### Back-End

| Package      | Version | Description                     |
| :----------- | :-----: | :------------------------------ |
| Concurrently |  7.6.0  | Runtime library                 |
| Cors         |  2.8.5  | Cross origin manager            |
| Dotenv       | 16.0.3  | Environnement variables library |
| Express      | 4.18.2  | Routing framework               |
| Mongoose     |  6.8.2  | MongoDB framework               |
| Node JS      | 18.2.0  | Back-end runtime                |
| Nodemon      | 2.0.20  | Runtime library                 |
| Typescript   |  5.0.4  | Javascript support for Type     |

### Toolchain Stack

| Package | Version | Description      |
| :------ | :-----: | :--------------- |
| Vite    |  4.3.8  | Back-end runtime |

# Features

### State management

While learning a lot on react States, I also became aware of state management and different solution available. After reading a lot about React context, Redux, Jotai, Recoil any many other, I was really impressed by the simplicity and flexibility of [Zustand](https://github.com/pmndrs/zustand). I've included it in this release and invite you to have a look at the implementation I've made for my data stores. I'm really impressed on how you can structure your store, make use of Async calls and above all, slice your states so you can use only the bare minimum.

### Database

Having experienced the joy and pain of SQL database in the past made me really appreciate the ease of use of the new generation of NoSQL solution such as [MongoDB](https://www.mongodb.com/). I've spent a lot of extra time getting acquainted with the inner workings of it. [Mongoose](https://mongoosejs.com/) npm package was a real joy to use since you can create a relational system on top of Mongo Documents, which I believe is a winning combination. I this release, you will also notice that I'm using a lot of database functions such as modifying the account balance and pushing new items to array directly from Mongo. This is helping reduce request traffic and minimize data concurrency.

### Authentication

I'm presently implementing OAuth for Google authentication, but it is not ready yet. It should be done before the end of June 2023.

### UI

I'm planning to refactor the UI from Bootstrap to Radix. I'm very interested in headless components and plan to develop my own stylized component library. The implementation should happen during summer 2023.

# Installation

Clone or download this repo, go to the root folder of both **client** and **server** and run the following commands from a terminal window for each one of them - All dependencies are in their respective package.json

Install dependencies

```
npm install
```

Run project

```
npm run dev
```

## Database

If you don't have [MongoDB & Compass](https://www.mongodb.com/docs/compass/master/install/) installed locally you will need to get that up and running. You can also run it from a [Docker](https://www.docker.com/products/docker-desktop/) container from the following terminal command:

```
docker run -p 27017:27017 --name MVX_Bank -d mongo
```

## Environnement files

Create a **.env.development** file at the root of the **server** folder for mapping the database port and connection string.

```
PORT=1337
DB_CONNECTION_STRING=mongodb://localhost:27017/MVX_Bank
```

Create a **.env.development** file at the root of the **client** folder for mapping the nodeJS API base url for Axios.

```
VITE_API_BASE_URL=http://localhost:1337
```

# Licensing

This project is under MIT license.
