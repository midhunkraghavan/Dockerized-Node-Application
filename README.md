# Nodejs-Test

### Tech

* [node.js] -  for backend APIs.
* [Express] - fast node.js network app framework.
* [postgreSQL] -  for Database.


### Installation 

* Step 1 : Install the dependencies and devDependencies.
              
            ### npm install
  
* step 2 : Need to create postgres database  
             
            * After database creation you can configure "database.json" with new   database name

 * step 3 : Need to run Migration          
        
            ### node node_modules/db-migrate/bin/db-migrate up

 ### To Run Server 

 * step 1 : npm start 

            
###  To Run Test Case

* step 1 : npm test


### Password And UserName For Login

  *  method : post
  *  path : '/login'

  * "userName" : admin
  * "password" : password

  ### Paths for contact
 
   * To Create contact
              *  method : post
              *  path : '/contact'

    * To Update contact
              *  method : put
              *  path : '/contact' 

    * To List all contact
              *  method : get
              *  path : '/contact' 
    * To Delete contact
              *  method : delete
              *  path : '/contact/{id}'
    * To get contact
              *  method : get
              *  path : '/contact/{id}'          

         



*  you can change NODE_ENV in the .env file.
*  NODE_ENV can be local,development or production.

