# Healthcare-Application

A REACT Native Application

There are 3 modules to this application: 
1. Users
2. Chat
3. Device

Click [here](https://github.com/mpavithr/healthcare-platform/wiki/Bird's-eye-view-of-the-application) for a birds eye view of the application.

## Code structure

This repository contains the front end code for the entire healthcare application (REACT-Native). It also contains all the firebase backend code. User authentication in the user module and chat module uses firebase backend. 

The rest of the backend code (Django) is in this repository - https://github.com/mpavithr/Patient-Monitoring-System-with-Django (Check the user folder in the repo for all my APIs used in this project.)

```RNFirebase``` folder consists of the chat application.

```screens``` folder consists of the various screens of the healthcare application such as login screen, home screen, sign up screen etc.

```App.js``` consists of the react native application navigation logic.

```Tests``` folder consists of tests.

## API calls + Database

The API calls I created for the project is explained [here](https://github.com/mpavithr/healthcare-platform/wiki/API-explanation)

Click [here](https://github.com/mpavithr/healthcare-platform/wiki/Database) for the database explanation and schemas.

## Screens 

1. Login Screen - ```screens/Login.js```
2. Signup Screen - ```screens/Signup.js```
3. Homepage Screen - ```screens/Homescreen.js```
4. Chat Screen - ```screens/Chat.js```
5. Screen to post measurements - ```screens/Device.js```
6. Screen to view measurements - ```screens/ViewMeasurements.js```

## User Module

The users module of the project consists of:
1. User Authentication
2. API calls used to store and get user info created via Django (refer to [my django repo](https://github.com/mpavithr/Patient-Monitoring-System-with-Django))
3. Conditional rendering in frontend after signing in based on API calls that determine whether the user is a doctor or a patient 

More details with screenshots explained [here](https://github.com/mpavithr/healthcare-platform/wiki/Users)

## Chat Module
 
The chat module consists of:
1. Chat application (react-native-gifted-chat)
2. Backend on firebase which stores every chat room and chat messages
3. API calls to get user info to create unique chat rooms (refer to [my django repo](https://github.com/mpavithr/Patient-Monitoring-System-with-Django))

For a detailed explaination and screenshots of this module, click [here](https://github.com/mpavithr/healthcare-platform/wiki/Chat)

## Device Module

The device module consists of:
1. Conditional rendering based on API calls that determine whether the user using the application is a doctor or a patient
2. Doctors can view patient measurements (API calls made using Django, refer to [my django repo](https://github.com/mpavithr/Patient-Monitoring-System-with-Django))
3. Patients can post their measurements (API calls made using Django, refer to [my django repo](https://github.com/mpavithr/Patient-Monitoring-System-with-Django))

For a detailed explanation and screenshots of this module, click [here](https://github.com/mpavithr/healthcare-platform/wiki/Device)

## Testing 

Testing consists of:

1. Unit Tests for backend in [my django repo](https://github.com/mpavithr/Patient-Monitoring-System-with-Django). Go to ```user/tests/``` folder in that repo.

2. User module testing: Testing whether conditional rendering works, meaning, if a doctor logs in, does the application render home page for doctors or if a patient logs in, does the application render home page for patients. Works - check screenshots

3. Chat module testing: Testing whether chats can be sent and whether they can be retreived from the database. Works - check screenshots

4. Device Module testing: Testing whether conditional rendering works. Works - check screenshots

5. Handling invalid user input in ```Login.js```, ```Signup.js``` and ```Device.js```. Manual testing.

   a. User enters invalid email id. Response -> Popup telling user to enter valid email id.
   
   b. User enters invalid number for role. Response -> Popup telling user to enter valid role.
   
   c. User enters wrong credentials for logging in. Response -> Popup telling user to enter valid credentials.
   
   d. User enters invalid machine id. Response -> Popup telling user to enter valid machine id.
   
   e. User enters invalid date for date assigned or date returned. Response -> Popup telling user to enter date in valid format.
   
   f. User logs in with empty credentials. Response -> Popup telling user to enter login credentials.
   
   g. User signs up with empty fields. Response -> Popup telling user to enter all sign up details.
   
   h. User sends empty measurement details. Response -> Popup telling user to enter all device measurement details.
   
   i. User logs in with unregistered credentials. Response -> Popup saying user not found.
   
   j. User logs in with wrong password. Response -> Popup saying wrong password.

## Database Injection Prevention

This application uses django for backend. I have used Django’s Object Relational Mapping (ORM) layer. Within that layer, Django protects itself from SQL injection by using query parameterization. Within the ORM layer, Django defines SQL queries separated from the query’s parameters, and the database driver is in charge of escaping each of the parameters. Also, I am not using RAW SQL in the application. And since all the queries and user input are sanitized by Django, SQL injections are prevented. 
Moreover, this application uses firebase to authenticate users. This means that only known users can access the application. This prevents unknown users from accessing my application.
