# Equi-Gallery-VR

# for production .env use

```
PORT=3000

MONGODB_URI='mongodb://localhost/eq-gallery-vr'
```


# Notes
-public has front end files

-server has server files

-Create tasks and assign them accordingly in the Projects tab

-if you make important changes please update readme

# Semantic file naming

-Please try and keep file names semantically, like so, and camel case
(subject name) (type of file)

```
user--model-test.js (for test files)
album-model-test.js
album-route-test.js

user-model.js (for schemas)

user-route.js(for routes)

album-controller.js (controllers)

```
# API ROUTES

## User routes
```
/api/signup    POST

/api/login     GET

/api/user/:id  PUT

/api/user/:id  DELETE
```
## Gallery Routes
```
/api/gallery       POST

/api/gallery/:id   GET

/api/gallery/:id   PUT

/api/gallery/:id   DELETE
```
## Photo Routes
```
/api/gallery/:galleryId/photo   POST

/api/gallery/:galleryId/photo/:photoId   DELETE

/api/public/pic   GET

/api/pic    GET (private route)
```

# Landing View

Landing view should be after a user logs in, and should display options for uploading pictures, and picking which Album they want to enter VR in

# CRUD operations

Be able to POST, GET, and DELETE photos and albums. Be able to UPDATE album properties. 

Be able to POST, GET, DELETE, UPDATE users

Upon signup, User automatically gets a GALLERY.


# Model schemas

Parent - User, user will have a child called gallery, and gallery with have sub child of albums.

# State management

Login State - Logout, My Galleries links on Nav Bar 

Non Login State - Login/Register links on Nav bar

# Creating a gallery
To create a gallery a small window should pop up with form inputs, name, description, and a button for multiple file uploads



