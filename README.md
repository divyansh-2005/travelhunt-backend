
# API Documentation

This documentation provides details about the available API endpoints, how to use them, and example request/response formats for interacting with the system.

---

## 1. Signup

### POST `/api/auth/signup`
Register a new user with a username and password.

#### Request
```json
{
  "username": "user1",
  "password": "user1"
}
```

#### Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
  "user": {
    "_id": "670f5838e89646381ebeaa5b",
    "username": "user1",
    "password": "$2a$10$MsBeHAtVnHL3KbIET3dB8.CyusV6VU9Nfh/a/ZPfw90KZ/c5m5mRO",
    "createdAt": "2024-10-16T06:07:52.547Z",
    "updatedAt": "2024-10-16T06:07:52.547Z",
    "__v": 0
  }
}
```

---

## 2. Login

### POST `/api/auth/login`
Authenticate a user and return a JWT token.

#### Request
```json
{
  "username": "user1",
  "password": "user1"
}
```

#### Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
  "user": {
    "_id": "670f5838e89646381ebeaa5b",
    "username": "user1",
    "createdAt": "2024-10-16T06:07:52.547Z",
    "updatedAt": "2024-10-16T06:07:52.547Z"
  }
}
```

---

## 3. Image Similarity Check

### POST `/api/image/check-similarity`
Upload an image and check its similarity to a reference image.

#### Headers
- Bearer Token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`

#### Form-data
- `referenceImageUrl`: URL of the reference image.
- `uploadedImage`: The file to upload for comparison.

#### Response
```json
{
  "message": "Image similarity calculated successfully",
  "uploadedImageUrl": "https://res.cloudinary.com/dejzfm6op/image/upload/v1729084485/j2uj9ox1buufoo6rfwkq.jpg",
  "similarityScore": 75.88
}
```

---

## 4. Update User Profile

### PUT `/api/user/update`
Update the user's profile details.

#### Headers
- Bearer Token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`

#### Request
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "city": "Nagpur",
  "age": 25,
  "gender": "Male"
}
```

#### Response
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "username": "user3",
  "city": "Nagpur",
  "locationsTraveled": [],
  "age": 25,
  "gender": "Male",
  "totalPoints": 0,
  "challengesCompleted": [],
  "quizzesCompleted": []
}
```

---

## 5. Get User Profile

### GET `/api/user/profile`
Retrieve the authenticated user's profile details.

#### Headers
- Bearer Token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`

#### Response
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "username": "user3",
  "city": "Nagpur",
  "locationsTraveled": [],
  "age": 25,
  "gender": "Male",
  "totalPoints": 0,
  "challengesCompleted": [],
  "quizzesCompleted": []
}
```

---

## 6. Create Hidden Location (Admin Only)

### POST `/api/locations`
Create a new hidden location in the system (admin access only).

#### Headers
- `Content-Type`: `application/json`
- `admin-password`: `ADMIN_PASSWORD` (admin password)

#### Request
```json
{
  "locationName": "Nagpur",
  "coordinates": { "lat": 21.1458, "lng": 79.0882 },
  "description": "A hidden gem in Nagpur",
  "culturalSignificance": "Historical site",
  "challenges": [],
  "quizzes": []
}
```

#### Response
```json
{
  "locationName": "Nagpur",
  "coordinates": { "lat": 21.1458, "lng": 79.0882 },
  "description": "A hidden gem in Nagpur",
  "culturalSignificance": "Historical site",
  "challenges": [],
  "quizzes": [],
  "_id": "671049eaf498578817629d0b",
  "createdAt": "2024-10-16T23:19:06.636Z",
  "updatedAt": "2024-10-16T23:19:06.636Z",
  "__v": 0
}
```

---

## 7. Get Hidden Locations by City

### GET `/api/locations/:city`
Retrieve hidden locations based on the specified city.

#### Response
```json
[
  {
    "coordinates": { "lat": 21.1458, "lng": 79.0882 },
    "_id": "671049eaf498578817629d0b",
    "locationName": "Nagpur",
    "description": "A hidden gem in Nagpur",
    "culturalSignificance": "Historical site",
    "challenges": [],
    "quizzes": [],
    "createdAt": "2024-10-16T23:19:06.636Z",
    "updatedAt": "2024-10-16T23:19:06.636Z",
    "__v": 0
  }
]
```

---

## 8. Get All Hidden Locations

### GET `/api/locations`
Retrieve all hidden locations in the system.

#### Response
```json
[
  {
    "coordinates": { "lat": 21.1702, "lng": 79.0956 },
    "_id": "671041e94f8fd0503dba1b1e",
    "locationName": "Dragon Palace Temple",
    "description": "A serene Buddhist temple with beautiful architecture.",
    "culturalSignificance": "It is a place of worship and peace, offering a glimpse into Buddhist culture.",
    "challenges": [],
    "quizzes": [],
    "createdAt": "2024-10-16T22:44:57.450Z",
    "updatedAt": "2024-10-16T22:44:57.450Z",
    "__v": 0
  },
  {
    "coordinates": { "lat": 21.1458, "lng": 79.0882 },
    "_id": "671049eaf498578817629d0b",
    "locationName": "Nagpur",
    "description": "A hidden gem in Nagpur",
    "culturalSignificance": "Historical site",
    "challenges": [],
    "quizzes": [],
    "createdAt": "2024-10-16T23:19:06.636Z",
    "updatedAt": "2024-10-16T23:19:06.636Z",
    "__v": 0
  }
]
```
## 9. POST http://localhost:5000/api/quiz 
Headers: Content-Type: application/json  
        admin-password: ADMIN_PASSWORD (admin)  
Body:
```json
{
  "title": "Festivals Quiz",
  "city": "Nagpur",
  "points": 50,
  "questions": [
    {
      "questionText": "What is the most popular sweet during Diwali?",
      "options": ["Ladoo", "Barfi", "Jalebi", "Kaju Katli"],
      "correctAnswer": "Ladoo"
    },
    {
      "questionText": "Which festival is known as the Festival of Lights?",
      "options": ["Diwali", "Holi", "Navratri", "Eid"],
      "correctAnswer": "Diwali"
    }
  ]
}
```

Response:
```json
{
  "_id": "6710f6a95f6e4e2b9d0bc0a6",
  "title": "Festivals Quiz",
  "city": "Nagpur",
  "points": 50,
  "questions": [
    {
      "questionText": "What is the most popular sweet during Diwali?",
      "options": ["Ladoo", "Barfi", "Jalebi", "Kaju Katli"],
      "correctAnswer": "Ladoo",
      "_id": "6710f6a95f6e4e2b9d0bc0a7"
    },
    {
      "questionText": "Which festival is known as the Festival of Lights?",
      "options": ["Diwali", "Holi", "Navratri", "Eid"],
      "correctAnswer": "Diwali",
      "_id": "6710f6a95f6e4e2b9d0bc0a8"
    }
  ],
  "createdAt": "2024-10-16T10:40:15.728Z",
  "updatedAt": "2024-10-16T10:40:15.728Z",
  "__v": 0
}
```

### 10. GET http://localhost:5000/api/quiz/:city  
Response:
```json
[
    {
        "_id": "671053940fc85fdbc6a99cbc",
        "title": "Festivals Quiz",
        "city": "Nagpur",
        "points": 50,
        "questions": [
            {
                "questionText": "What is the most popular sweet during Diwali?",
                "options": [
                    "Ladoo",
                    "Barfi",
                    "Jalebi",
                    "Kaju Katli"
                ],
                "correctAnswer": "Ladoo",
                "_id": "671053940fc85fdbc6a99cbd"
            },
            {
                "questionText": "Which festival is known as the Festival of Lights?",
                "options": [
                    "Diwali",
                    "Holi",
                    "Navratri",
                    "Eid"
                ],
                "correctAnswer": "Diwali",
                "_id": "671053940fc85fdbc6a99cbe"
            }
        ],
        "__v": 0
    }
]
```

## 11. GET http://localhost:5000/api/quiz
gives all quizezs

## 12. POST http://localhost:5000/api/challenge
Headers: Content-Type: application/json  
        admin-password: ADMIN_PASSWORD (admin)  
Body:
```json
{
  "title": "Explore Hidden Temple",
  "city": "Nagpur",
  "points": 100,
  "locationCoordinates": { "lat": 21.1458, "long": 79.0882 },
  "description": "Visit the hidden temple near the lake and take a photo",
  "required": false
}
```

Response:
```json
{
    "title": "Explore Hidden Temple",
    "city": "Nagpur",
    "points": 100,
    "locationCoordinates": {
        "lat": 21.1458,
        "long": 79.0882
    },
    "description": "Visit the hidden temple near the lake and take a photo",
    "required": false,
    "_id": "671059c379dbb52bd33984b7",
    "__v": 0
}
```

## 13. GET http://localhost:5000/api/challenge/:city  
Response:
```json
[
    {
        "locationCoordinates": {
            "lat": 21.1458,
            "long": 79.0882
        },
        "_id": "671059c379dbb52bd33984b7",
        "title": "Explore Hidden Temple",
        "city": "Nagpur",
        "points": 100,
        "description": "Visit the hidden temple near the lake and take a photo",
        "required": false,
        "__v": 0
    }
]
```

## 14. GET http://localhost:5000/api/challenge  
Response:
```json
[
    {
        "locationCoordinates": {
            "lat": 21.1458,
            "long": 79.0882
        },
        "_id": "671059c379dbb52bd33984b7",
        "title": "Explore Hidden Temple",
        "city": "Nagpur",
        "points": 100,
        "description": "Visit the hidden temple near the lake and take a photo",
        "required": false,
        "__v": 0
    },
    {

    },
    {

    }
]
```

### **15. Complete a Challenge**

**Endpoint**:  
`POST http://localhost:5000/api/challenge/complete`

**Authentication**:  
Bearer Token: `token`

**Headers**:
```
Content-Type: application/json
```

**Body** (Example):
```json
{
  "challengeId": "6710742719fe153c4e568281",
  "pointsEarned": 50
}
```

**Response**:
```json
{
    "message": "Challenge completed successfully",
    "totalPoints": 50,
    "challengesCompleted": [
        {
            "challengeId": "6710742719fe153c4e568281",
            "status": "completed",
            "completedAt": "2024-10-17T02:30:04.347Z",
            "pointsEarned": 50,
            "_id": "671076ac305d1abadbc460f8"
        }
    ]
}
```
### **16. Complete a Quiz**

**Endpoint**:  
`POST http://localhost:5000/api/quiz/complete`

**Authentication**:  
Bearer Token: `token`

**Headers**:
```
Content-Type: application/json
```

**Body** (Example):
```json
{
  "quizId": "671053940fc85fdbc6a99cbc",
  "userAnswers": ["Ladoo", "Diwali"]  // User's answers for the questions in order
}
```

**Response**:
```json
{
    "message": "Quiz completed successfully",
    "score": 50,
    "totalPoints": 100,
    "quizAttempts": [
        {
            "quizId": "671053940fc85fdbc6a99cbc",
            "score": 50,
            "completedAt": "2024-10-17T04:01:54.374Z",
            "_id": "67108c328bcdac1315fa1738"
        }
    ]
}
```
Here’s the formatted version for your README:

---

### **17. Get Global Leaderboard**

**Endpoint**:  
`GET http://localhost:5000/api/leaderboard/global`

**Response** (Example):
```json
[
    {
        "_id": "670fca0525b1a3befd1c023e",
        "username": "user3",
        "totalPoints": 100
    },
    {
        "_id": "670fc741ed671d0bea6374e7",
        "username": "user2",
        "totalPoints": 0
    },
    {
        "_id": "670f5838e89646381ebeaa5b",
        "username": "user1",
        "totalPoints": 0
    }
]
```
### **18. Get City Leaderboard**

**Endpoint**:  
`GET http://localhost:5000/api/leaderboard/city/:city`

**Response** (Example):
```json
[
    {
        "_id": "670fca0525b1a3befd1c023e",
        "username": "user3",
        "city": "Nagpur",
        "totalPoints": 100
    },
    {
        "_id": "670fc741ed671d0bea6374e7",
        "username": "user2",
        "totalPoints": 0,
        "city": "Nagpur"
    }
]
```