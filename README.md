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

---

## Built With:
  * Javascript
  * React
  * Material UI
  * Express
  * MongoDB

---

## Getting Started
TBC Instructions for setup

---

## Wireframes

![Sign In](/assets/wireframe_sign-in.png)

![Sign Up](/assets//wireframe_sign-up.png)

![Flash Card](/assets/wireframe_flash-cards.png)

![Create Card](/assets/wireframe_create-card.png)

---

## User Stories


---
## Architecture
* Front end: React, CSS, MaterialUI
* Back end: MongoDB, Express

TODO

---

## Database
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
The applications main features include:
- [x] Allow users to create new cards
- [x] Allow users to create cards from predefined tag list
- [x] Allow users to retrieve cards based on tags
- [x] Each flashcard will have 2 states:
  1. For the prompt
  2. For the answer/description
- [x] Users can cycle through a predetermined amount of cards for the specific tag (e.g. 10, 20, 30)

Extension features may include:
* Allowing quizzes
  * Gamification of the application (allow users to get scores and compare scores) - Dependent on implementation of authentication
- [x] Include authentication
* Allowing users to set cards as either private or public
* Including a flip animation for the cards
- [x] Allowing users to create their own tags
* Timer functionaltiy to flip over cards after the predetermined time
* Allow hints for cards (both quizzes and normal flash cards)
