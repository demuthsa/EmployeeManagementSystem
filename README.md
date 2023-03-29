# Tegridy Timetable
#### CS340 SQL Portfolio Project
#### Zac Maes and Sam DeMuth  



## Table of Contents
- [Executive Summary](#Executive-Summary)
- [Citations](#Citations)
- [Individual Git Work Cycle](#Individual-Git-Work-Cycle)
- [Finish a Feature](#Finish-a-Feature)



## Executive Summary
Our hospital employee management project streamlines the staffing and scheduling process through an SQL database with a React frontend. This solves scheduling conflicts, staff availability, communication, and staff-to-patient ratio issues, which leads to better care for patients and efficient operations. 
Our Draft-One design created eight mirrored tables separated by Day and Night shifts, and tracked Time_off_requests, Employees, Shifts, and Employee_shifts(intersection). Based on feedback, we consolidated our day and night tables and created a Positions table that stores shift information that is an FK reference inside of Employees. This means that each employee has an assigned position, and each position can be assigned to many employees. Other reviews suggested edits to various attributes in the outlines and diagrams. We also added CASCADE operations based upon feedback and testing. Ultimately, the consolidation of Day and Night and the addition of Positions was our most notable change in the design.
The final design uses five tables: Positions, Employees, Shifts, Time_off_requests, and Employee_shits. The Positions table has a constraint for the department attribute, and the Employees table has a foreign key referencing Positions. This postition_id FK inside Employees has ON DELETE SET NULL meaning that if a position is deleted, then all the employees with that position will have their position_id  set to NULL. The Shifts table has a constraint for the day_of_week attribute, and the Time_off_requests table has a foreign key referencing the Employees with ON DELETE CASCADE, meaning that if an employee is deleted, their time off requests will also be deleted. Time_off_requests also has a constraint on the status attribute. Finally, the Employee_shifts intersection table has foreign keys referencing both Employees and Shifts, and both have ON DELETE CASCADE operations. If either an employee or a shift is deleted, the corresponding intersection is also deleted. This database design has been through many revisions, and we have experienced a lot of success in its final implementation and deployment.
Our project code went through multiple revisions as well, and through the Step-4-Draft we used the HTML/Handlebars tutorial steps. The feedback we received was valuable and helped steer us towards better designs. Alongside this, we also designed a React frontend, which was first deployed in our Step-5-Draft. This is broken up into three sublevel folders: Backend, Vite-dev, and Frontend. The Backend folder is a modular NodeJS/Express server with a “Main App” inside of app.js and various “Mini Apps” inside of routes. These “Mini Apps” hold each table’s CRUD routes and are required inside of the app.js “Main App”. There is also a db-connector.js that creates the mysql pool to connect to our database. This server is running using the forever package. The Vite-dev folder is our Vite developer environment where you can view all of our React frontend code. The command ‘npm run dev’ inside of the Vite-dev folder will start up a develop server to test out any of our code, or changes made to it. Our React code uses the axios package for all CRUD operations, and react-router to set up SPA routes for all pages. We also use the  gridjs package to display our tables. We also created some interesting client-side form data-validation functions using the dayjs package. Finally, the Frontend folder is a very simple NodeJS/Express server called client-server.js that serves our React-vite dist folder on a catch-all app.get(“/*”) route using the forever package. 



## Citations
These are the various resources we used. Most functions from these sources where NOT copied directly, but instead ADAPTED and CHANGED to fit our specific needs for the project. Care was taken to also write comments in the code where they were used when applicaple.  

1. Stackoverflow post about splitting date return to get rid of Time appended at end of dates:
- This source was adapted in all React UI pages that display a date. The method '.toISOString().split('T')[0];' from the source was changed to '.split('T')[0];' as the source method did not work properly.
- Date: October 25, 2022
- Source: https://stackoverflow.com/questions/74193747/mysql-returns-the-date-in-this-format-yyyy-mm-ddt000000-000z-i-want-it-in-y

2. Stackoverflow post about useNavigate: 
- This source was adapted to get useNavigate in an onClick function to link to to the various forms used in Shifts and Employeeshifts.
- Date: November 17, 2021
- Source: https://stackoverflow.com/a/70010073

3. Gridjs docs - the '_' allows you to import components inside a gridjs cell:
- This source was used to import the edit and delete components in all of our UI tables.  
- Date: Last updated on January 16, 2023
- Source: https://gridjs.io/docs/examples/react-cells

4. Docs for uses of react input mask in telephone forms:
- This source was Adapted to set up telephone input validation on the EmployeeForm (update) and EmployeeNew forms. 
- Date: "Published 5 years ago on NPM" - No clear date found
- Source: https://www.npmjs.com/package/react-input-mask

5. Cors module add a list of allowed origins - MIA ADJEI:
- This source was adapted to set up a list of allowed cors origins inside of our backend app.js server. 
- Date: April 07, 2021
- Source: https://www.twilio.com/blog/add-cors-support-express-typescript-api

6. Vite Docs - Evan You & Vite Contributors:
- This source was used to learn and interact with Vite dev environment
- Date: 2019
- Source: https://vitejs.dev/guide/

7. How To Serve A React App From A Node Express Server - Fullstack Development Youtube:
- Created express server to run vite react build (/dist) using this video tutorial
- This source was copied and adapted later on to set up a frontend server for our react build because PM2 was causing us issues.
- Date: October 08, 2019
- Source: https://www.youtube.com/watch?v=QBXWZPy1Zfs

8. My team's Git CS340 workflow Ed Post - James Cole:
- This source was copied and adapted into our Readme sections [Individual Git Work Cycle](#Individual-Git-Work-Cycle) and [Finish a Feature](#Finish-a-Feature)
- Date: February 13, 2023
- Source: https://edstem.org/us/courses/32532/discussion/2582497

9. React Web Deployment Guide - Michael Curry & Andrew Bassam Kamand:
- These sources were studied and used to set up our initial react build. It is unclear how much has been changed from their original walkthrough as the code has evolved a lot since their use.
- Date: February 15, 2023 and May 31, 2022
- Source: https://edstem.org/us/courses/32532/discussion/2594940
- Source: https://github.com/abkamand/cs340-react-test-app-v2/

10. PedroTech React Youtube React Guide:
- This source was also used to set up our initial react build. Most of the backend has changed since its use, but the frontend may still be somewhat similar witht he use of Axios. It is unclear how much has been changed from their original walkthrough as the code has evolved a lot since its use.
- Date: August 29, 2020
- Source: https://youtu.be/T8mqZZ0r-RA

11. Used day.js to manipulate various date objects easily:
- This source was used and adapted inside of shifts to manipulate date objects and help build a date/time validation inside the Shifts forms.
- Date: 2023
- Source: https://day.js.org/docs/en/display/format

12. Grij.js Button css style code
- This source was copied directly from the css in the chrome devtools when inspecting the sorting button on the gridjs docs
- Date: 2023
- Source: https://gridjs.io/docs/examples/loading-state



## Individual Git Work Cycle
#### Remember to code only on your dev-branch
1. Inform your teammate what feature you are going to work on in discord.
2. Pull main and update your dev-branch:\
    &emsp;`git checkout main`       
    &emsp;&emsp;| checkout the main branch
    
    &emsp;`git pull --all`          
    &emsp;&emsp;| update the main branch code from the most recent github repo main branch code
    
    &emsp;`git checkout dev-branch`  
    &emsp;&emsp;| Switch the active branch to your dev-branch
    
    &emsp;`git merge main`          
    &emsp;&emsp;| Merges the main branch into your dev-branch.  
    &emsp;&emsp;| It is important that the active branch is your dev-branch before you merge main into it.

3. Work on your new feature inside the dev-branch.
4. Save all files (CMD+S)  
**REPEAT STEPS 3 and 4 While you are working**  
.  
.  
**READY TO MAKE A COMMIT for dev-branch?**  
5. Stage changes  
    &emsp;`git add .`  
    &emsp;&emsp;| If you don't want to add all files with "`.`" other commands include:  
    &emsp;&emsp;&emsp;`git status`  
    &emsp;&emsp;&emsp; or  
    &emsp;&emsp;&emsp;`git add <name of file here>`

6. Commit changes  
    &emsp;`git commit -m "message"`

7. Push changes (git push)  
    &emsp;`git push`  
    &emsp;&emsp;| Pushes your local branch to the online branch so that it is available to your teammate to view on github.

**- Repeat steps 3 through 7 as needed until your feature is completed.**  
**- When both teammates have reviewed your new code, you will follow the "FINISH A FEATURE" section below.**

## Finish a Feature
- We should probably merge features together while on a discord call to avoid any errors 
- Once the feature is complete, initiate a merge request.   
- Note: The feature branch should be working before it is merged with The source of truth (main).  

1. Switch to main  
    &emsp;`git checkout main`   
    &emsp;&emsp;| Switch the active branch to the main branch.   
    &emsp;&emsp;| Note: Before you merge your personal branch into main, the active branch must be "main".

2. Update main to check for most recent changes from repo  
    &emsp;`git pull`           
    &emsp;&emsp;| Downloads the most updated version of the main branch.

3. Merge dev-branch into the main branch  
    &emsp;`git merge dev-branch`  
    &emsp;&emsp;| Merges dev-branch into the main branch in the local repository.

4. Complete any necessary changes if a merge conflict happens!  
    &emsp;&emsp;| I will add more instructions to this later...

5. Push the newly merged main branch to github repo  
    &emsp;`git push`  
    &emsp;&emsp;| Pushes the updated main branch to the online repository

- Now that the feature is done, go back to the "INDIVIDUAL GIT WORK CYCLE" section to start your new feature on your own dev-branch.
