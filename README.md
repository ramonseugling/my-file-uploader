# My File Uploader


Application to upload files in Amazon S3 Storage (S3) using [RedwoodJS](https://redwoodjs.com)!
## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)

## Introduction

My application enables effortless file management in the cloud. You can easily upload, view, download, and delete your files stored in Amazon S3 Storage.

## Features

- Upload your files
- Download your files
- See your uploaded files
- Delete your files

## Getting Started

### Prerequisites


> - Redwood requires [Node.js](https://nodejs.org/en/) (=18.x)
> - [Yarn](https://yarnpkg.com/) (>=1.15)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ramonseugling/my-file-uploader.git

2. Add the values to the .env file, following the .env.example.


3. Install the dependencies
    ```bash
    yarn install

4. Run migration
    ```bash
    yarn redwood prisma migrate dev

5. Start the development server
    ```bash
    yarn redwood dev

6. Your browser should automatically open to [http://localhost:8910](http://localhost:8910) where you'll see the Login Page, where you must create an account to access the application.

7. That's all! :)