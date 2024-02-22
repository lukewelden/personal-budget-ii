# Personal Budget II 
[![Build Status](https://app.travis-ci.com/lukewelden/personal-budget-ii.svg?branch=main)](https://app.travis-ci.com/lukewelden/personal-budget-ii)
[![Coverage Status](https://coveralls.io/repos/github/lukewelden/personal-budget-ii/badge.svg?branch=main)](https://coveralls.io/github/lukewelden/personal-budget-ii?branch=main)
<a href="https://codeclimate.com/github/lukewelden/personal-budget-ii/maintainability"><img src="https://api.codeclimate.com/v1/badges/9068ff6dbfcdbe1a63bf/maintainability" /></a>
<a href="https://codeclimate.com/github/lukewelden/personal-budget-ii/test_coverage"><img src="https://api.codeclimate.com/v1/badges/9068ff6dbfcdbe1a63bf/test_coverage" /></a>
[![Build status](https://ci.appveyor.com/api/projects/status/r6m0c2ou0f84rrdi?svg=true)](https://ci.appveyor.com/project/lukewelden/personal-budget-ii)

## 🚀 Project Intro 
In this project, I've crafted a robust API that empowers you to efficiently manage your personal budget using the principles of [Envelope Budgeting](https://www.investopedia.com/envelope-budgeting-system-5208026#:~:text=The%20envelope%20budgeting%20system%20is%20one%20option%20for,be%20adapted%20for%20use%20with%20mobile%20budgeting%20apps.). With this API you can create, customise, and closely monitor your budget envelopes! 

## 🤝 Getting Started 
Here's what you can do to get started:
1. *Clone the Repository:* Get your hands on the code by cloning the repository: `git clone https://github.com/your-username/personal-budget-api.git`
2. *Navigate and Install:* Hop into the project directory and install the necessary dependencies: `cd personal-budget-api && npm install`
3. *Start Building:* Fire up the development server and start building your budgeting masterpiece: `npm start`

### Database 
> This is a bring your own database project. You can use a local DB running on your machine or a publicly hosted DB. Just ensure that you have the following environment variables set in a `.env` file in the root of you project. Remember to add your `.env` file to a `.gitignore` file so you don't publish your username and password to the internet! 

## 🌐 API Endpoints
- `GET /envelopes` Retrieve a list of all budget envelopes.
- `GET /envelopes/:envelopeId` Retrieve details of a specific envelope by its ID.
- `POST /envelopes` Create a new budget envelope by sending a body of:
```json
{
  "category": string,
  "budget": int  
}
```
- `PUT /envelopes/:envelopeId` Updates a single envelope using the following payload:
```json
{
  "category": <category_name>,
  "budget": '450.000'
}
```
- `DELETE /envelopes/:id` Delete a budget envelope.
- `POST /envelopes/transfer` Transfers money from one envelope to another using the following payload.
```json
{
  "from": <envelope_id>,
  "to": <envelope_id>,
  "amount": int
}
```

You can then fire up your favourite API tool and start querying the endpoints. I use [Postman](https://www.postman.com/downloads/) and I have provided a postman collection in the root of the project [TODO:Make postman collection and provide link]().

## Tools and Technologies 
- *Languages and libraries:* JavaScript, Node.js, Express.js
- *Testing:* Mocha, Chai, Supertest
- *Database:* PostgreSQL
- *CI:* Travis, Coveralls, Code Climate, AppVeyor
