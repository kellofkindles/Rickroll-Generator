# Rickroll-Generator
 
 A rick roll generator that can disguise links to bait potential victims! With rich preview to deceive your victims even more, rick rolling has never been this easy.
 
# Link
Go here for the hosted version - https://news.rr.nihalnavath.com
 
# Development
 The title below shows you how you can clone the repository and have a local version running.  
 
# setup
 Follow the steps to have it running on your local machine.
 #### 1. Initial Setup
 Create a `.env` in the root directory, and fill the values using this template.
```
port=
mongourl=
```
#### 2. Requirements
To install the requirements for the project, run `npm install` and wait for it to finish installing all packages.

#### 3. Database
Run `node setup db` to set the collections in the database automatically for you. Make sure you have passed in the correct mongo url in theenv or it will throw an error.

#### 4. Running
Now run `node index.js` or `node.` to have it running and you're done!


# Hosting
Feel free to host one yourself, but it should be open sourced and should provide a link to the original website and/or repository.