# Smart Event Planning Platform

A comprehensive smart event management system designed to allow users to create, join, and explore personalized events, interact socially, and view activities on an interactive map. Built as a full-stack web application with a rule-based recommendation system, real-time conflict detection, messaging, and gamification features.

---

## Features

 **Personalized Event Suggestions**
  Rule-based recommendation engine based on user interests, past participation, and location.

*  **Conflict Detection System**
  Automatically detects time conflicts between joined and new events.

*  **Messaging Panel**
  Users can communicate on a shared message board for each event.

*  **Map and Route Planning**
  Event locations displayed on a map, with suggested routes using API-based real-time calculations.

*  **Gamification**
  Users earn points by creating or attending events, which are shown in their profile.

*  **User Authentication & Roles**
  Login, registration, password reset with secure hashing and role-based authorization (admin/user).

*  **Admin Panel**
  Full control over events and users with moderation features.

---

##  Technologies Used

* **Frontend:** Html, Css, React.js, Bootstrap, 
* **Backend:** Node.js (Express)
* **Database:** MySQL
* **Map Integration:** Google Maps API 
* **Authentication:** JWT-based secure login
* **Recommendation Engine:** Rule-based logic

---

## Key Modules

### Event Suggestion (Rule-Based)

| Rule Type                 | Description                                      |
| ------------------------- | ------------------------------------------------ |
| **Interest Match**        | Events matching user interests are prioritized   |
| **Participation History** | Recommends events similar to previously attended |
| **Location Proximity**    | Nearby events ranked higher for easier access    |

### Time Conflict Detection

| Step | Description                                               |
| ---- | --------------------------------------------------------- |
| 1.   | Check user's current event schedule                       |
| 2.   | Compare new event’s time with existing ones               |
| 3.   | Show warning and alternative options if conflict detected |

### Messaging Panel

* One shared chat per event (not real-time, updated on refresh)
* Message history stored per event
* Notification system for new messages

---

##  Gamification Logic

| Action             | Points |
| ------------------ | ------ |
| First Event Join   | +20    |
| Each Event Joined  | +10    |
| Each Event Created | +15    |

---

##  Project Requirements Summary

* User registration, login, and profile update
* Event create/join/edit/delete
* Conflict detection & map routing
* Messaging per event
* Admin approval system
* Rule-based recommendation engine

---

##  Sample Screenshots

  <h2 > Register/Login Page</h2>

| Register Page | Login Page |
|--------------|-----------|
| ![Register](https://github.com/user-attachments/assets/5460f3e8-993a-49df-9f2b-0f4f8508ce0a) | ![Login](https://github.com/user-attachments/assets/742d4142-b5c4-4adb-b494-c2d93bd6393b) |


<h2 >Homepage</h2>

| Event List | Event List   |
|--------------|-----------|
| ![Register](https://github.com/user-attachments/assets/ad43529e-5752-448c-85d2-5c307ba68fe7a) | ![Login](https://github.com/user-attachments/assets/7ec9bf1b-acc5-43ed-b099-d50398314fac) |


<h2 >Profile</h2>

<img align="center" alt="coding" width="600" src="https://github.com/user-attachments/assets/b106a360-8f98-49d5-b6a3-adb1c3a1815d">
<img align="center" alt="coding" width="600" src="https://github.com/user-attachments/assets/bf0b5619-d13f-4bbe-8b1a-9d141c44fb2f">
<img align="center" alt="coding" width="600" src="https://github.com/user-attachments/assets/8be0beca-5df3-4091-850a-1632947b35f4">

<h2 >Add Event</h2>
<img align="center" alt="coding" width="600" src="https://github.com/user-attachments/assets/ea6a171c-f0c3-49d7-bf28-a96fe94aecbf">
<img align="center" alt="coding" width="600" src="https://github.com/user-attachments/assets/ece45aae-d4aa-46e9-a3e2-217b0555cc9b">

<h2 >Event Detail</h2>
<img align="center" alt="coding" width="600" src="https://github.com/user-attachments/assets/0c7f7969-7a1a-4ba4-8485-4146d3bfbdce">
<img align="center" alt="coding" width="600" src="https://github.com/user-attachments/assets/aea3db24-d52f-48c9-9eff-36723e858d11">

<h2 >Chat Page</h2>
<img align="center" alt="coding" width="600" src="https://github.com/user-attachments/assets/b646b836-5d3a-4422-a7ca-3a447f11ee82">
<h2 >Admin Page</h2>
<img align="center" alt="coding" width="600" src="https://github.com/user-attachments/assets/611c0deb-df4a-472d-b366-ebbb7d738c79">
<img align="center" alt="coding" width="600" src="https://github.com/user-attachments/assets/d0f55cff-a5ba-4c7f-b70f-88af98626267">

<h2 >Not Found Page</h2>
<img align="center" alt="coding" width="600" src="https://github.com/user-attachments/assets/2dfe7ffd-0662-4def-8701-0e50cc7a9bca">

---

