# MVX Bank Fullstack

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

Banking capstone project for my MIT xPro Fullstack course.

## Motivation

This project is a recap of what I've learned throughout the last year in my MERN Fullstack course. I'm coming from a desktop/.NET background with zero knowledge of web development. I started with learning Javascript and slowly progressing to Typescript. Followed by HTML and CSS basics, moving on to React NodeJS and MongoDB. We covered some of the tech leader such as, Docker, OAuth, Firebase, Redis, Graphql Bootstrap, Formik, Yup and many more...

## Description

This is a banking app from my course that has been refactored, each time adding techniques acquired along the way. While this app seems very simple, there is a lot happening in the background, assuring a high quality, quick, responsive, reliable, and safe experience.

In this version, you will find:

- Home page
- User creation
- Login - Logout
- Deposit
- Withdrawal
- Transaction log

## Features

### State management

While learning a lot on react States, I also became aware of state management and different solution available. After reading a lot about React context, Redux, Jotai, Recoil any many other, I was really impressed by the simplicity and flexibility of Zustand. I included the latest in this release and invite you to have a look at the implementation I've made for my data stores. I'm really impressed on how you can structure your store, make use of Async calls and above all, slice your states so you can use only the bare minimum.

### Database

Having experienced the joy and pain of SQL database in the past made me really appreciate the ease of use of the new generation of NoSQL solution such as MongoDB. I've spent a lot of extra time getting acquainted with the inner workings of it. Mongoose npm package was a real joy to use since you can create a relational system on top of Mongo Document base nature, which I believe is a winning combination. I this release, you will also notice that I'm using a lot of database functions such as modifying the account balance and pushing new item to array directly from Mongo. This is helping reduce request traffic and minimize data concurrency.

## Install

Clone or download this repo, go to the root folder of booth **CLIENT** and **SERVER** and run the following commands from a terminal window for each one of them - All dependencies are in their respective package.json

Install dependencies

```
npm install
```

Run project

```
npm run dev
```

**NOTE** If you don't have [MongoDB & Compass](https://www.mongodb.com/docs/compass/master/install/) installed locally you will need to get that up and running. You can also run it from a [Docker](https://www.docker.com/products/docker-desktop/) container from the following terminal command:

```
docker run -p 27017:27017 --name MVX_Bank -d mongo
```

**.ENV FILES**
Create a **.env.development** file at the root of the **server** folder for mapping the database port and connection string.

```
PORT=1337
DB_CONNECTION_STRING=mongodb://localhost:27017/MVX_Bank
```

Create a **.env.development** file at the root of the **client** folder for mapping the nodeJS API base url for Axios.

```
VITE_API_BASE_URL=http://localhost:1337
```

## Licensing

This project is under MIT license.
