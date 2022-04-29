# Healthcare-Application

A REACT Native Application

There are 3 phases to this application: 
1. Users
2. Chat
3. Device

Work on each phase will be done in sprints. 

This repository contains the front end code for the entire application (REACT-Native) + Backend for the chat application within the healthcare application + user authentication.

The rest of the backend code (Django) is in this repository - https://github.com/mpavithr/Patient-Monitoring-System-with-Django

## API calls

The API calls I created for the project is explained [here](https://github.com/mpavithr/healthcare-platform/wiki/API-explanation)

## Users

This part consists of the home page of the application.

### User Authentication

Within the home page, a user can use their email adress and password to sign in. There will be a button to sign in. When the button is pressed, it will take them to the homepage. 
If they do not have an account, they can create an account by filling in their user details after clicking the register button. Registering will store the email id and password in user authentication table on Firebase. Now when a user signs in, Firebase will check if the particular sign in details are registered in the system.

<img width="960" alt="signup" src="https://user-images.githubusercontent.com/42751267/165420526-1c1b8343-4f1e-42a9-89cd-a6de39d64f83.PNG">

<img width="960" alt="login" src="https://user-images.githubusercontent.com/42751267/165420554-c7a6986e-35a5-4087-b3f6-6ae986a7c8cf.PNG">

### Backend 

When registering, an API will be used to post the user data using django to a database located on AWS. This database will be the user database.
After logging in, an API will be used to get the user data using django from the user database located on AWS.
After logging in, an API will be used to get the list of all patients using django from the user database.
After logging in, an API will be used to get the list of all doctors using django from the user database.

### After signing in

The user will be taken to an appropriate user page (the second page of the application) depending on whether the user is a doctor or a patient.

If the user is a doctor, he will be able to view all the patients. If the user is a patient, he will be able to view all the doctors. There will be chat and device buttons and when clicking on their buttons, the user will be taken to different pages corresponding to the button clicked.

<img width="375" alt="doctor_homepage" src="https://user-images.githubusercontent.com/42751267/165420596-88afc2fb-a7d4-43bc-b878-21a30e0beceb.PNG">

<img width="378" alt="doctor_2" src="https://user-images.githubusercontent.com/42751267/165420613-b7d9dbdc-754c-4f89-98c3-1abd007c9b42.PNG">

## Chat

This part consists of the chat module. 

<img width="378" alt="chat" src="https://user-images.githubusercontent.com/42751267/165420633-54ec4c89-7080-467d-9c88-9dcc860f606d.PNG">

### User is a doctor

A doctor can click on the chat button with any patient he wishes to chat to. When he or she clicks on a patient's chat, a unique room will be created using django primary keys and thus the doctor and patient can chat with each other in this room. Every time a chat is sent, it will be stored on the chat database on Firebase. Every time the doctor revisits a particular room, an API call will be made to GET the previous chats which are stored in the chat database on Firebase.

### User is a patient

A patient can click on the chat button with any doctor he or she wishes to consult. When he or she clicks on a doctor's chat, a unique room will be created using django primary keys and thus the doctor and patient can chat with each other in this room. Everytime a chat is sent, it will be stored on the chat database on Firebase. Every time the patient revisits a particular room, an API call will be made to GET the previous chats which are stored in the chat database on Firebase.

### Backend

There will be a chat database on Firebase.

API call to GET the chats stored on Firebase database.

## Device

This part consists of the device module. 

### User is a patient

The device page will consist of fields where the user can POST measurement data which will be handled by the backend code and placed in the device database on AWS server via Django.

### User is a doctor

From the home page, the doctor can click on any patient's device button and will be taken to a device page where the doctor can GET measurement data associated with the patient from the database on AWS via an API call made through Django.

### Backend

API call to POST measurement data on the device database on AWS server via Django.
API call to GET measurement data from the device database on AWS server via Django.
