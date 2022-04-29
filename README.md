# Healthcare-Application

A REACT Native Application

There are 3 modules to this application: 
1. Users
2. Chat
3. Device

## Code structure

This repository contains the front end code for the entire healthcare application (REACT-Native). It also contains all the firebase backend code. User authentication in the user module and chat module uses firebase backend. 

The rest of the backend code (Django) is in this repository - https://github.com/mpavithr/Patient-Monitoring-System-with-Django (ECE 530 Project 2 & 3)

Flask version of the above backend code is in this repository - https://github.com/mpavithr/Patient-Monitoring-Platform (ECE 530 Project 2)

```RNFirebase``` folder consists of the chat application.

```screens``` folder consists of the various screens of the healthcare application such as login screen, home screen, sign up screen etc.

```App.js``` consists of the react native application navigation logic.

```Tests``` folder consists of tests.

## API calls

The API calls I created for the project is explained [here](https://github.com/mpavithr/healthcare-platform/wiki/API-explanation)

## Users

The users module of the project consists of:
1. User Authentication
2. API calls used to store and get user info created via Django (refer to [my django repo](https://github.com/mpavithr/Patient-Monitoring-System-with-Django))
3. Conditional rendering in frontend after signing in based on whether the user is a doctor or a patient 

More details with screenshots explained [here](https://github.com/mpavithr/healthcare-platform/wiki/Users)

## Chat

The chat module consists of:
1. Chat application (react-native-gifted-chat)
2. Backend on firebase which stores every chat room and chat messages
3. API calls to get user info to create unique chat rooms (refer to [my django repo](https://github.com/mpavithr/Patient-Monitoring-System-with-Django))

For a detailed explaination and screenshots, click [here](https://github.com/mpavithr/healthcare-platform/wiki/Chat)

## Device

The device module consists of:
1. Conditional rendering based on whether the user using the application is a doctor or a patient
2. Doctors can view patient measurements (API calls made using Django, refer to [my django repo](https://github.com/mpavithr/Patient-Monitoring-System-with-Django))
3. Patients can post their measurements (API calls made using Django, refer to [my django repo](https://github.com/mpavithr/Patient-Monitoring-System-with-Django))

For a detailed explanation and screenshots, click [here](https://github.com/mpavithr/healthcare-platform/wiki/Device)

## Testing
Refer to the ```Test``` Folder

Testing consists of:
1. User module testing: Testing whether conditional rendering works, meaning, if a doctor logs in, does the application render home page for doctors or if a patient logs in, does the application render home page for patients.
2. Chat module testing: Testing whether chats can be sent and whether they can be retreived from the database
3. Device Module testing: Testing whether conditional rendering works and Testing whether appropriate measurements are accepted
4. Database injection testing
5. Tests in [my django repo](https://github.com/mpavithr/Patient-Monitoring-System-with-Django)
