# Equi-Gallery-VR

# for production .env use

PORT=3000

MONGODB_URI='mongodb://localhost/eq-gallery-vr'


# Notes
-public has front end files
-server has server files, obviously

-if you make important changes please update readme

# Landing View

Landing view should be after a user logs in, and should display options for uploading pictures, and picking which Album they want to enter VR in

# CRUD operations

Be able to POST, GET, and DELETE photos and albums. Be able to UPDATE album properties. 

Be able to POST, GET, DELETE, UPDATE users

Upon signup, User automatically gets a GALLERY.


# Model schemas

Parent - User, user will have a child called gallery, and gallery with have sub child of albums.

