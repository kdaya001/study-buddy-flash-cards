# Study Buddy - A Flash Card App

## About The Project
This is a study buddy app to help you study. It allows you to create and use pre-defined Flashcards for the purpose of studying.

Features include:
* Users have the ability to create new cards
* Users have the ability to create tags and create cards from their tag list
* Users have the ability to retrieve cards based on tags (both public cards/tags and their own)
* Each flashcard will have 2 states:
  1. For the prompt
  2. For the answer/response
* Users can cycle through a predetermined amount of cards for the specific tag (e.g. 10,20, 30)

Genearl Assembly Software Engineering - Project 4 - Live Version

---

## Built With:
  * Javascript
  * React
  * Material UI
  * Express
  * MongoDB

---

## Getting Started
* Clone the repository
```
git clone <project_name>
```

* Install dependencies
```
cd <project_name>
npm install

cd /<project_name>/client
npm install

cd /<project_name>/server
npm install
```
* Create MongoDB database using struture in `/server/database/schema.md`

* Create enviornment variables using `.env.example` in `/server/`

* Build and run the project locally
```
cd <project_name>
npm run dev
Navigate to http://localhost:3000
```


---

## Wireframes

![Sign In](/assets/wireframe_sign-in.png)

![Sign Up](/assets//wireframe_sign-up.png)

![Flash Card](/assets/wireframe_flash-cards.png)

![Create Card](/assets/wireframe_create-card.png)


---
## App Screenshots
![Home](/assets/app_home.png)

![Home Dark](/assets//app_home-dark.png)

![Create](/assets/app_create.png)

![Create Dark](/assets/app_create-dark.png)

![Card](/assets/app_card.png)

![Card Dark](/assets/app_card-dark.png)
---
## Architecture
* Front end: React, CSS, MaterialUI
* Back end: MongoDB, Express

---

## Database Architecture
Users:
```
{
  _id: ___,
  email: ___,
  password: ___,
}
```

Global Cards:
```
{
  _id: ___,
  tag: ___,
  owner: ___,
  cards: [
    {
      prompt: ___,
      resposnse: ___,
    },
  ]
}
```
---

## Roadmap
#### The applications main features include:
- [x] Allow users to create new cards
- [x] Allow users to create cards from predefined tag list
- [x] Allow users to retrieve cards based on tags
- [x] Each flashcard will have 2 states:
  1. For the prompt
  2. For the answer/description
- [x] Users can cycle through a predetermined amount of cards for the specific tag (e.g. 10, 20, 30)

#### Extension features may include:
- [ ] Allowing quizzes
  - [ ] Gamification of the application (allow users to get scores and compare scores) - Dependent on implementation of authentication
- [x] Include authentication
- [ ] Allowing users to set cards as either private or public
- [ ] Including a flip animation for the cards
- [x] Allowing users to create their own tags
- [ ] Timer functionaltiy to flip over cards after the predetermined time
- [ ] Allow hints for cards (both quizzes and normal flash cards)

---
## User Stories
* As a student I want the ability to view fash cards so that I can reinforce my studies
* As a student I want the ability to log into the service so that I can create my own cards
* As a student I want the ability to create my own tags and cards for studying purposes

---
## General Approach
This project was produced from the need to further my learning in my studies throughout the General Assembly Software Engineering Immersive bootcamp. Whilst studying, I found myself wanting to refinforce the knowledge I gained and found I wanted to make flash cards to help do that - that's where `Study Buddy` came in.

To implement this project I wanted to use knowledge I had gained throughout the entire General Assembly course that I hadn't yet worked on from a project perspective. Because of this I decided to use `MongoDB`/Non Relational Databses, `React` and CSS frameworks (`Material UI`).

General User Flow:
![Genreal Flow](/assets/general-approach_basic-flow.png)
![Update Flow](/assets/general-approach_update-flow.png)


---

## Necessary Deliverables
- [ ] A link to your hosted working app in the URL section of your GitHub repo
- [x] A git repository hosted on GitHub, with a link to your hosted project, and frequent commits dating back to the very beginning of the project
A readme.md file with:
  - [x] An embedded screenshot of the app
  - [x] Explanations of the technologies used
  - [x] A couple paragraphs about the general approach you took
  - [x] Installation instructions for any dependencies
  - [x] User stories – who are your users, what do they want, and why?
  - [x] Wireframes – sketches of major views / interfaces in your application
  - [x] Link to your pitch deck – documentation of your wireframes, user stories, and proposed architecture
  - [ ] Descriptions of any unsolved problems or major hurdles you had to overcome