SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;


-- Create the Positions table which has a constraint for the department attribute
CREATE OR REPLACE TABLE Positions (
    position_id INT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
    position_title VARCHAR(10) NOT NULL,
    shift VARCHAR(10) NOT NULL,
    department VARCHAR(20) NOT NULL,
    CONSTRAINT chk_department CHECK (department IN 
        ('ER', 'ICU', 'OR', 'Pediatrics', 'OBGYN', 'Cardiology', 'Oncology', 'Neurology', 'Radiology', 'Physical_therapy', 'Pharmacy', 'Lab', 'Psychiatry', 'Respiratory_therapy'))
);

-- Create the Employee table, chose ON DELETE SET NULL for position_id FK so that if a 
-- position is deleted from the positions table, the employee is not deleted and their position_id becomes NULL instead
CREATE OR REPLACE TABLE Employees (
    employee_id INT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
    position_id INT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(62) NOT NULL,
    address VARCHAR(100) NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    FOREIGN KEY (position_id) REFERENCES Positions(position_id) ON DELETE SET NULL
);

-- Create the Shifts table which has a constraint for the day_of_week attribute
CREATE OR REPLACE TABLE Shifts (
    shift_id INT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
    day_of_week VARCHAR(5) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    CONSTRAINT chk_day CHECK (day_of_week IN ('mon', 'tues', 'wed', 'thurs', 'fri', 'sat', 'sun'))
);

-- Created the Time_off_requests tables, chose ON DELETE CASCADE for employee_id FK so that if an 
-- employee is deleted from the Employees table (assuming they are no longer an employee), the time off request 
-- in this table is also deleted as it is no longer necessary to keep track of.
CREATE OR REPLACE TABLE Time_off_requests (
    request_id INT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
    employee_id INT NOT NULL,
    date DATE NOT NULL,
    status VARCHAR(10) NOT NULL,
    CONSTRAINT chk_Status CHECK (Status IN ('pending', 'approved', 'denied')),
    FOREIGN KEY (employee_id) REFERENCES Employees(employee_id) ON DELETE CASCADE
);

-- Create the Employee_shifts intersection table, chose ON DELETE CASCADE for employee_id and shift_id FKs so that if an 
-- employee or shift is deleted from the Employees or Shifts tables respectively, the intersection/instances 
-- in this table will also be deleted as they are no longer necessary to keep track of.
CREATE OR REPLACE TABLE Employee_shifts (
    employee_shift_id INT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
    employee_id INT NOT NULL,
    shift_id INT NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES Employees(employee_id) ON DELETE CASCADE,
    FOREIGN KEY (shift_id) REFERENCES Shifts(shift_id) ON DELETE CASCADE
);

-- insert positions first so that position id exists prior to making employees
INSERT INTO Positions (position_title, shift, department)
VALUES  ('charge', 'day', 'ER'),
        ('nurse', 'day', 'ER'),
        ('cna', 'day', 'ER'),
        ('physician', 'day', 'ER'),
        ('charge', 'night', 'ER'),
        ('nurse', 'night', 'ER'),
        ('cna', 'night', 'ER'),
        ('physician', 'night', 'ER'),
        ('charge', 'day', 'ICU'),
        ('nurse', 'day', 'ICU'),
        ('cna', 'day', 'ICU'),
        ('physician', 'day', 'ICU'),
        ('charge', 'night', 'ICU'),
        ('nurse', 'night', 'ICU'),
        ('cna', 'night', 'ICU'),
        ('physician', 'night', 'ICU');

-- insert employees and fk position id
INSERT INTO Employees (position_id, first_name, last_name, email, address, phone_number)
VALUES  ((SELECT position_id FROM Positions WHERE position_title = 'nurse' AND shift = 'day' AND department = 'ICU'), 
            'John', 'Doe', 'john.doe@example.com', '123 Main St, Corvallis, OR 12345', '555-111-5555'),
        ((SELECT position_id FROM Positions WHERE position_title = 'physician' AND shift = 'day' AND department = 'ICU'),
            'Jane', 'Doe', 'jane.doe@example.com', '456 Elm St, Corvallis, OR 12345', '555-222-5556'),
        ((SELECT position_id FROM Positions WHERE position_title = 'cna' AND shift = 'day' AND department = 'ICU'),
            'Bob', 'Smith', 'bob.smith@example.com', '789 Oak St, Corvallis, OR 12345', '555-333-5557'),
        ((SELECT position_id FROM Positions WHERE position_title = 'nurse' AND shift = 'day' AND department = 'ICU'),
            'Tom', 'Lee', 'tom.lee@example.com', '987 Maple St, Corvallis, OR 12345', '555-444-5558'),
        ((SELECT position_id FROM Positions WHERE position_title = 'charge' AND shift = 'day' AND department = 'ICU'),
            'Sarah', 'Johnson', 'sarah.json@example.com', '876 Pine St, Corvallis, OR 12345', '555-555-5559');

-- insert shifts
INSERT INTO Shifts (day_of_week, start_date, end_date, start_time, end_time)
VALUES  ('mon', '2023-02-13', '2023-02-13', '8:00:00', '20:00:00'),
        ('tues', '2023-02-14', '2023-02-14', '8:00:00', '20:00:00'),
        ('wed', '2023-02-15', '2023-02-15', '8:00:00', '20:00:00'),
        ('thurs', '2023-02-16', '2023-02-16', '8:00:00', '20:00:00'),
        ('fri', '2023-02-17', '2023-02-17', '8:00:00', '20:00:00');

-- insert time off requests
INSERT INTO Time_off_requests (employee_id, date, status)
VALUES
    ((SELECT employee_id FROM Employees WHERE first_name = 'John' AND last_name = 'Doe'), '2023-02-17', 'approved'),
    ((SELECT employee_id FROM Employees WHERE first_name = 'John' AND last_name = 'Doe'), '2023-02-18', 'denied'),
    ((SELECT employee_id FROM Employees WHERE first_name = 'Jane' AND last_name = 'Doe'), '2023-02-19', 'pending'),
    ((SELECT employee_id FROM Employees WHERE first_name = 'Bob' AND last_name = 'Smith'), '2023-02-20', 'approved'),
    ((SELECT employee_id FROM Employees WHERE first_name = 'Tom' AND last_name = 'Lee'), '2023-02-20', 'denied');

-- insert into Employee_shifts intersection table
INSERT INTO Employee_shifts (employee_id, shift_id)
VALUES ((SELECT employee_id FROM Employees WHERE first_name = 'John' AND last_name = 'Doe'),
        (SELECT shift_id FROM Shifts WHERE start_date = '2023-02-13' AND start_time = '08:00:00')),

       ((SELECT employee_id FROM Employees WHERE first_name = 'Jane' AND last_name = 'Doe'),
        (SELECT shift_id FROM Shifts WHERE start_date = '2023-02-13' AND start_time = '08:00:00')),

       ((SELECT employee_id FROM Employees WHERE first_name = 'Bob' AND last_name = 'Smith'),
        (SELECT shift_id FROM Shifts WHERE start_date = '2023-02-13' AND start_time = '08:00:00')),

       ((SELECT employee_id FROM Employees WHERE first_name = 'John' AND last_name = 'Doe'),
        (SELECT shift_id FROM Shifts WHERE start_date = '2023-02-14' AND start_time = '08:00:00')),

       ((SELECT employee_id FROM Employees WHERE first_name = 'Tom' AND last_name = 'Lee'),
        (SELECT shift_id FROM Shifts WHERE start_date = '2023-02-14' AND start_time = '08:00:00')),

       ((SELECT employee_id FROM Employees WHERE first_name = 'Bob' AND last_name = 'Smith'),
        (SELECT shift_id FROM Shifts WHERE start_date = '2023-02-15' AND start_time = '08:00:00')),

       ((SELECT employee_id FROM Employees WHERE first_name = 'Sarah' AND last_name = 'Johnson'),
        (SELECT shift_id FROM Shifts WHERE start_date = '2023-02-16' AND start_time = '08:00:00'));



SET FOREIGN_KEY_CHECKS=1;
COMMIT;

-- Test that the tables were created
DESCRIBE Employees;
DESCRIBE Positions;
DESCRIBE Shifts;
DESCRIBE Time_off_requests;
DESCRIBE Employee_shifts;


-- Leave the queries below untouched. These are to test your submission correctly.
select * from Employees;
select * from Positions;
select * from Shifts;
select * from Time_off_requests;
select * from Employee_shifts;


