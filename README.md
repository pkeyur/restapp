restapp 

Used Node.js, MySQL

Used express, mysql, express-myconnection packages

Rest API that provides following endpoints

GET /users                          -- returns all users in the database |
GET /users/:id                      -- gets the info about a specific user |
POST /users                         -- creates a new user (send uName, uAddress in POST request) |
DELETE /users/:id                   -- deletes a user gracefully |

GET /groups                         -- returns all groups with its members in the database |
GET /groups/:id                     -- gets the info about a specific group |
POST /groups                        -- creates a new group (send gName in POST request) |
POST /groups/:id/user/:userId       -- adds a user to a group |
DELETE /groups/:id                  -- deletes a group |
DELETE /groups/:id/user/:userId     -- removes a user from a group 

