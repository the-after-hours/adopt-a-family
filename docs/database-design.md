# Database table design for PostgreSQL

Here's a table design for a relational database to manage users, wishlists, donors, organizers, families, and matches between donor and families using PostgreSQL, with the added feature that wishlists can have multiple items:

## Users table

| Column Name   | Data Type    | Constraints            |
| ------------- | ------------ | ---------------------- |
| user_id       | SERIAL       | PRIMARY KEY            |
| first_name    | VARCHAR(50)  | NOT NULL               |
| last_name     | VARCHAR(50)  | NOT NULL               |
| username      | VARCHAR(50)  | NOT NULL               |
| email         | VARCHAR(320) | NOT NULL               |
| password_hash | VARCHAR(50)  | NOT NULL               |
| created_at    | TIMESTAMP    | NOT NULL DEFAULT NOW() |
| user_type     | VARCHAR(50)  | NOT NULL               |
| phone_number  | VARCHAR(20)  | NOT NULL               |
| address       | VARCHAR(255) | NOT NULL               |

Users table: This table stores information about all users in the system, including their first and last name, username, email, password hash, created timestamp, user type, phone number, and address.

## Families table

| Column Name | Data Type | Constraints                         |
| ----------- | --------- | ----------------------------------- |
| family_id   | SERIAL    | PRIMARY KEY                         |
| family_size | INTEGER   | NOT NULL                            |
| created_at  | TIMESTAMP | NOT NULL DEFAULT NOW()              |
| user_id     | INTEGER   | UNIQUE, FOREIGN KEY (Users.user_id) |

Families table: This table stores information about families in the system, including their family size, created timestamp, and a foreign key to the Users table.

## Donors table

| Column Name | Data Type      | Constraints                         |
| ----------- | -------------- | ----------------------------------- |
| donor_id    | SERIAL         | PRIMARY KEY                         |
| budget      | NUMERIC(10, 2) | NOT NULL                            |
| created_at  | TIMESTAMP      | NOT NULL DEFAULT NOW()              |
| user_id     | INTEGER        | UNIQUE, FOREIGN KEY (Users.user_id) |

Donors table: This table stores information about donors in the system, including their organization name, budget, created timestamp, and a foreign key to the Users table.

## Organizers table

| Column Name       | Data Type | Constraints                         |
| ----------------- | --------- | ----------------------------------- |
| organizer_id      | SERIAL    | PRIMARY KEY                         |
| organization_name | VARCHAR   | NOT NULL                            |
| created_at        | TIMESTAMP | NOT NULL DEFAULT NOW()              |
| user_id           | INTEGER   | UNIQUE, FOREIGN KEY (Users.user_id) |

Organizer Table: Gives an org name to the organizer. This could be used to give different privileges to the Organizer user.

## Matches table

| Column Name | Data Type | Constraints                       |
| ----------- | --------- | --------------------------------- |
| matches_id  | SERIAL    | PRIMARY KEY,                      |
| year        | INTEGER   | NOT NULL,                         |
| created_at  | TIMESTAMP | NOT NULL DEFAULT NOW(),           |
| family_id   | INTEGER   | UNIQUE, FOREIGN KEY families(id), |
| donor_id    | INTEGER   | UNIQUE, FOREIGN KEY donors(id)    |

Matches table: The matches table is used to track which donors are matched with which families in a given year. Each row in the matches table represents a single match between a donor and a family in a specific year.

## Wishlists table

| Column Name   | Data Type | Constraints                              |
| ------------- | --------- | ---------------------------------------- |
| wishlist_id   | SERIAL    | PRIMARY KEY                              |
| wishlist_name | VARCHAR   | NOT NULL                                 |
| created_at    | TIMESTAMP | NOT NULL DEFAULT NOW()                   |
| family_id     | INTEGER   | UNIQUE, FOREIGN KEY (Families.family_id) |

## Items table

| Column Name      | Data Type | Constraints                         |
| ---------------- | --------- | ----------------------------------- |
| item_id          | SERIAL    | PRIMARY KEY                         |
| item_name        | VARCHAR   | NOT NULL                            |
| item_description | VARCHAR   | NOT NULL                            |
| created_at       | TIMESTAMP | NOT NULL DEFAULT NOW()              |
| wishlist_id      | INTEGER   | FOREIGN KEY (Wishlists.wishlist_id) |

Items table: This table stores information about items in the system, including their item name, description, created timestamp, and a foreign key to the Wishlists table. Each wishlist can have multiple items on it.
