## Database Name:
 * `study-buddy`

## Users collection
* Name: `users`
* Structure:
```
{
  _id: ___,
  email: ___,
  password: ___,
}
```
Example:
```
{
  _id: Object(12345),
  email: jane@doe.com,
  password: <hashed password>,
}
```

## Cards collection
* Name: `global_cards`
* Structure: 
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

Example:
* Public Tag:
```
{
  _id: Object(23456),
  tag: 'tagOne',
  owner: public,
  cards: [
    {
      prompt: promptOne,
      resposnse: answerOne,
    },
    {
      prompt: promptTwo,
      response: answerTwo,
    }
  ]
}
```
* Private Tag:
```
{
  _id: Object(23456),
  tag: 'tagOne',
  owner: <user._id>,
  cards: [
    {
      prompt: promptOne,
      resposnse: answerOne,
    },
    {
      prompt: promptTwo,
      response: answerTwo,
    }
  ]
}
```
Note: tags that are viewable without logging in (i.e. public tags/cards) are denoted by `owner: public`, if the owner attribute is not set to `public`, they will inherently be private. 