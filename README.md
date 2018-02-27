# crashPad 
----
## crashPad web app
----
![CrashPadLogo](/public/assets/images1/crashpad_logo_transparent.png)
----
[CrashPad Website](http://www.studentcrashpads.com/)

* Potential tenants can search for properties to live in for college
* They can apply to live in that property
* Landlords can make create their property and list it for potential tenant to apply to.
* Landlords can accept or decline all the applications to their property.

HowTo:

You can view crashpad listings without an account, however if you are a student looking for housing, you won't be able to apply unless you have created and are logged into a student account. You can do this by navigating to the log in page, and creating a new student user there. 

Because StudentCrashPads is still in development, it is likely that your search may not yeild any results (due to a small number of listings being held in the database). To ensure that your search yeilds results, you can do a blank search, or Search area code 84123. There are is also a list of most recent listings on the home page.

If you are a landlord, you will need to create a landlord account in order to create listings for your housing. You can do this by navigating to the log in page, creating a new account, and checking the landlord check box. This will give you access to the landlord dashboard, where you can create and manage all of your properties. You can also view applications that have been sent in by students, and accept or deny them.


Stack:

### 1.1 Front-End </br>
HTML/CSS </br>
Bootstrap Framework </br>
Javascript </br>
JQuery </br>
HandleBars.js </br>


### 1.2 Back-End </br>
body-parser ^1.18.2</br>
Express ^4.16.2</br>
cookie-session ^2.0.0-beta.3 </br>
mysql ^2.15.0 </br>
mysql2 ^2.15.0 </br>
node-localstorage ^1.3.0</br>
passport ^0.4.0 </br>
passport-auth0 ^0.6.1 </br>
sequelize ^4.29.2 </br>

### 1.2 Testing </br>
chai ^4.1.2 </br>
mocha ^5.0.0 </br>
nightmare ^2.10.0 </br>



