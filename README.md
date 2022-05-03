# Healthcare-Application

A REACT Native Application

There are 3 modules to this application: 
1. Users
2. Chat
3. Device

## Requirements

## Birds Eye View of the Application

A web application that virtualizes the clinic experience. Users can register as a doctor or a patient using ther email and other details. Once registered, users can sign in to the application using their email to start using it. 

As a patient, the patient can view all doctors registered in the application and can chat in real-time with any doctor they wish and each chat message will be stored. The patient can also self record various measurements such as temperature, blood pressure etc. at home and post their measurements on the application. 

As a doctor, the doctor can view all patients registered in the system and can choose to help any patient at any time. Doctors can chat in real time with any patient and each chat message between the doctor and patient will be stored. Doctors can view self recorded measurements of any patient they wish.

## Code structure

This repository contains the front end code for the entire healthcare application (REACT-Native). It also contains all the firebase backend code. User authentication in the user module and chat module uses firebase backend. 

The rest of the backend code (Django) is in this repository - https://github.com/mpavithr/Patient-Monitoring-System-with-Django (Check the user folder in the repo for all my APIs used in this project.)

```RNFirebase``` folder consists of the chat application.

```screens``` folder consists of the various screens of the healthcare application such as login screen, home screen, sign up screen etc.

```App.js``` consists of the react native application navigation logic.

```Tests``` folder consists of tests.

## API calls

The API calls I created for the project is explained [here](https://github.com/mpavithr/healthcare-platform/wiki/API-explanation)

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
Refer to the ```Test``` Folder

Testing consists of:
1. User module testing: Testing whether conditional rendering works, meaning, if a doctor logs in, does the application render home page for doctors or if a patient logs in, does the application render home page for patients.
2. Chat module testing: Testing whether chats can be sent and whether they can be retreived from the database
3. Device Module testing: Testing whether conditional rendering works and Testing whether appropriate measurements are accepted
4. Database injection testing
5. Tests in [my django repo](https://github.com/mpavithr/Patient-Monitoring-System-with-Django)
