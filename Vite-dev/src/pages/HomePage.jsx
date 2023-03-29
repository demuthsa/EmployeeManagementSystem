function HomePage() {

    return (
        <>
            <h2>Select a link from the nav bar to view a table in our SQL database.</h2>
            <br />
            <h2>Executive Summary:</h2>
            <p>
                Our hospital employee management project streamlines the staffing and scheduling process through an SQL database with a React frontend. This solves scheduling conflicts, staff availability, communication, and staff-to-patient ratio issues, which leads to better care for patients and efficient operations. 
            </p>
            <p>
                Our Draft-One design created eight mirrored tables separated by Day and Night shifts, and tracked Time_off_requests, Employees, Shifts, and Employee_shifts(intersection). Based on feedback, we consolidated our day and night tables and created a Positions table that stores shift information that is an FK reference inside of Employees. This means that each employee has an assigned position, and each position can be assigned to many employees. Other reviews suggested edits to various attributes in the outlines and diagrams. We also added CASCADE operations based upon feedback and testing. Ultimately, the consolidation of Day and Night and the addition of Positions was our most notable change in the design.
            </p>
            <p>
                The final design uses five tables: Positions, Employees, Shifts, Time_off_requests, and Employee_shits. The Positions table has a constraint for the department attribute, and the Employees table has a foreign key referencing Positions. This postition_id FK inside Employees has ON DELETE SET NULL meaning that if a position is deleted, then all the employees with that position will have their position_id  set to NULL. The Shifts table has a constraint for the day_of_week attribute, and the Time_off_requests table has a foreign key referencing the Employees with ON DELETE CASCADE, meaning that if an employee is deleted, their time off requests will also be deleted. Time_off_requests also has a constraint on the status attribute. Finally, the Employee_shifts intersection table has foreign keys referencing both Employees and Shifts, and both have ON DELETE CASCADE operations. If either an employee or a shift is deleted, the corresponding intersection is also deleted. This database design has been through many revisions, and we have experienced a lot of success in its final implementation and deployment.
            </p>
            <p>
                Our project code went through multiple revisions as well, and through the Step-4-Draft we used the HTML/Handlebars tutorial steps. The feedback we received was valuable and helped steer us towards better designs. Alongside this, we also designed a React frontend, which was first deployed in our Step-5-Draft. This is broken up into three sublevel folders: Backend, Vite-dev, and Frontend. The Backend folder is a modular NodeJS/Express server with a “Main App” inside of app.js and various “Mini Apps” inside of routes. These “Mini Apps” hold each table’s CRUD routes and are required inside of the app.js “Main App”. There is also a db-connector.js that creates the mysql pool to connect to our database. This server is running using the forever package. The Vite-dev folder is our Vite developer environment where you can view all of our React frontend code. The command ‘npm run dev’ inside of the Vite-dev folder will start up a develop server to test out any of our code, or changes made to it. Our React code uses the axios package for all CRUD operations, and react-router to set up SPA routes for all pages. We also use the  gridjs package to display our tables. We also created some interesting client-side form data-validation functions using the dayjs package. Finally, the Frontend folder is a very simple NodeJS/Express server called client-server.js that serves our React-vite dist folder on a catch-all app.get(“/*”) route using the forever package. 
            </p>
            <h2>Entity Relationship Diagram</h2>
            <img class="home-image" src="/erd.png" alt="entity relationship diagram" />

            <h2>Schema Diagram</h2>            
            <img class="home-image" src="/schema.png" alt="mysql schema diagram" />

            <h2>Sample Data</h2>
            <img class="home-image" src="/sample-data.png" alt="table of sample data used" />



        </>
    );
}

export default HomePage;