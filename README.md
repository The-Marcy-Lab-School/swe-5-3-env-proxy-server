# Securing API Keys

Deployment Link: <<<<<< PUT YOUR DEPLOYMENT LINK HERE >>>>>>

In this assignment, you will be given a working frontend application that attempts to fetch gifs. You'll use Express as a middleman for API requests, allowing us to deploy the project while keeping the API key secure.

Refer to the associated [GitBook Chapter (Environment Variables and Deployment)](https://marcylabschool.gitbook.io/marcy-lab-school-docs/mod-5-servers/6-environment-variables-deployment) for support.

**Table of Contents**
- [Setup](#setup)
  - [Starter Code](#starter-code)
- [Grading](#grading)
- [Server Side](#server-side)
  - [Step 1 — Create an Endpoint and Controller](#step-1--create-an-endpoint-and-controller)
  - [Step 2 — Create an Environment Variable for the API Key](#step-2--create-an-environment-variable-for-the-api-key)
- [Client Side](#client-side)
  - [Step 3 — Update the Frontend Application](#step-3--update-the-frontend-application)
- [Deployment](#deployment)
  - [Step 4 — Deploy](#step-4--deploy)

## Setup

For guidance on setting up and submitting this assignment, refer to the Marcy lab School Docs How-To guide for [Working with Short Response and Coding Assignments](https://marcylabschool.gitbook.io/marcy-lab-school-docs/fullstack-curriculum/how-tos/working-with-assignments#how-to-work-on-assignments).

After cloning your repository, make sure to run the following commands:

```sh
git checkout -b draft
```

### Starter Code

In this repo, you are provided with two folders, `frontend/` and `server/`. Inside of `frontend/` is a "Giphy Search" vanilla JavaScript application and inside of `server/` is the code for a static web server that serves this application.

Install dependencies and start the server by running the following commands inside of the `server/` directory:

```sh
# make sure to cd into server/
npm i
npm start
```

Visit [http://localhost:8080](http://localhost:8080) to see the application. As you can see, the frontend application tries to use the Giphy API to show trending gifs of the day, but it's not quite working — we get a 401 status code (unauthorized).

Look into the code provided in `frontend/src/` and see why:
- `main.js` — the entry point; handles the search form event and calls `getTrendingGifs` on load
- `fetch-helpers.js` — contains `getTrendingGifs` and `getGifsBySearch`, which send fetch requests directly to the Giphy API
- `dom-helpers.js` — handles rendering gifs and errors to the page

The problem is in `fetch-helpers.js`: the `API_KEY` variable has no valid value. But we can't just paste in a real key here — this file is sent directly to every user's browser, which means anyone could read it and steal the key. Instead, we need to set up our server to perform this fetch request and have our frontend request that data from the server.

In the end, this is the flow of data that we are looking for:

![](img/express-api-middleman.svg)

As a result, only the server will know the API key and the frontend (which is ultimately what our users will see) only interacts with our own server.

## Grading

Your grade on this assignment will be determined by the number of tasks you are able to complete. This assignment has 10 requirements:
- 3 environment variable requirements
- 5 server-side requirements
- 1 client-side requirement
- 1 deployment task

**Environment Variable Requirements**

Before submitting, make sure that these tasks are completed!

- [ ] Environment variables are stored in the `.env` file
- [ ] `dotenv` is installed as a dependency
- [ ] `process.env` is used to access the environment variable

**Server-Side Technical Requirements**

- [ ] A `GET /api/gifs` endpoint exists with a controller.
- [ ] The controller for the `/api/gifs` endpoint sends a request to the Giphy API using the API key.
- [ ] If an error occurs when fetching, a `503` status is sent to the client along with the `error` object.
- [ ] If the Giphy API fetch is successful, the fetched data is sent to the client.
- [ ] The `/api/gifs` endpoint can parse the `req.query` parameters to get the search term and make a request to the Giphy API's search endpoint.

**Client-Side Technical Requirements**
- [ ] The frontend sends a request to `/api/gifs` instead of directly to the Giphy API

**Deployment Technical Requirements**

- [ ] Your server is deployed and the link is added to this repo's README

You got this!

## Server Side
### Step 1 — Create an Endpoint and Controller

> ✅ You will know that you've completed this step once you can send a request to [http://localhost:8080/api/gifs](http://localhost:8080/api/gifs) and get back the top trending gifs from the Giphy API. This can be done with, or without storing the API key in an environment variable (that is the next step).

Before you begin, you'll need to log into your [Giphy Developer Dashboard](https://developers.giphy.com/dashboard/) and copy your API Key.

The provided server application can currently serve static assets in the `frontend/` folder. Your first task is to add a `GET /api/gifs` endpoint and controller that sends a request to the trending endpoint of the Giphy API and responds with the fetched data.

Use the Giphy API endpoint below:

```
https://api.giphy.com/v1/gifs/trending?limit=3&rating=g&api_key=API_KEY
```

When the server receives a `GET /api/gifs` request, it should:
- Send the fetched data OR
- Send an `error` object and a 503 status code if an error occurred

Test this out by sending a GET request to `http://localhost:8080/api/gifs` using `curl` or your browser. 

You should see the fetched gifs with no authorization errors!

### Step 2 — Create an Environment Variable for the API Key

> ✅ You will know that you've completed this step once you can push to your GitHub repository without including the `.env` file AND that your API key is not included in any of your repository's files.

To safely store and use your API key, it should be stored as an environment variable in a `.env` file. You'll then use the `dotenv` module to access it. Do the following:

1. In the `server` folder, create a `.env` file and store your Giphy API key inside as an environment variable
2. Then, create a `.gitignore` file with `.env` listed
3. Next, install the `dotenv` module as a dependency of the server
4. Make sure that your server uses `process.env` to access your API key and does not include the API key anywhere in the source code

Once you've completed these steps, go ahead and add, commit, and push your code. Since you've listed the `.env` file in your `.gitignore` file, it should be hidden from the public repository. Confirm that you CANNOT see the `.env` file in your repository and that your API key is not listed in any of your source code before moving on.

> When it comes time to deploy this project, you will be able to provide the server hosting service with environment variables that will be securely stored and hidden from the public but that your server will have access to.

## Client Side
### Step 3 — Update the Frontend Application

> ✅ You will know that you've completed this step once you refresh the page at [http://localhost:8080](http://localhost:8080) and see trending gifs loading successfully.

Now that your server has an `/api/gifs` endpoint, our frontend no longer needs to directly interact with the Giphy API. Instead, it can use the `/api/gifs` endpoint and let the server send the request to Giphy.

Remember, this is what we're looking for:

![](img/express-api-middleman.svg)

Do the following:
* Rewrite the `getTrendingGifs` function in `frontend/src/fetch-helpers.js` so that it sends a request to `/api/gifs` instead of directly to the Giphy API.
* Refresh the page at [http://localhost:8080](http://localhost:8080) — no rebuild needed!
* Open the Developer Tools Network Tab and refresh the page
* You should see a request sent to `gifs` and there should NOT be a request sent to the Giphy API (see below)

![](./img/localhost-fetch.png)

## Deployment

### Step 4 — Deploy

> ✅ You will know that you've completed this step once your server is deployed and functional!

When you're done, push your code to github and [follow these steps to deploy using Render](https://marcylabschool.gitbook.io/marcy-lab-school-docs/projects/6-deploying-using-render). Make sure to add environment variables for your API key!

Then, add the deployed link to the top of this README.
