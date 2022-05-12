USE MASTER 
GO

DROP DATABASE Ecommerce
GO

CREATE DATABASE Ecommerce
GO

USE Ecommerce
GO

CREATE TABLE [Category] (
	ID integer IDENTITY(1, 1) primary key,
	name varchar(50) NOT NULL,
)
GO
CREATE TABLE [Product] (
	ID integer IDENTITY(1, 1) primary key,
	name varchar(50) NOT NULL,
	[description] varchar(50) NOT NULL,
	unitPrice int NOT NULL,
	quantityInStock int NOT NULL,
	catID int NOT NULL,
	imgURL varchar(50) NOT NULL,
	FOREIGN KEY (catID) REFERENCES [Category]([ID]) ON DELETE CASCADE ON UPDATE CASCADE
)
GO


CREATE TABLE [Users] (
	ID integer IDENTITY(1, 1) primary key,
	name varchar(50) NOT NULL,
	username varchar(25) NOT NULL,
	email varchar(50) NOT NULL,
	password varchar(50) NOT NULL,
	address varchar(50) NOT NULL,
	postalCode integer NOT NULL,
	warningCount integer NOT NULL default 0,
	walletBalance integer
)
GO

CREATE TABLE [Coupon] (
	ID integer IDENTITY(1, 1) primary key,
	name varchar(50) NOT NULL,
	discount float NOT NULL,
	code varchar(15) NOT NULL
)
GO

CREATE TABLE [Orders] (
	ID integer IDENTITY(1, 1) primary key,
	userID integer NOT NULL,
	paymentMethod varchar(20),
	orderPlacementDate datetime,
	deliveryStatus integer default 0,
	dispatchDate datetime,
	receiveDate datetime,
	paymentStatus integer default 0,
	FOREIGN KEY (userID) REFERENCES [Users](ID) ON DELETE CASCADE ON UPDATE CASCADE
)
GO

CREATE TABLE [OrderDetails](
	ID integer IDENTITY(1, 1) primary key,
	orderID int FOREIGN KEY (orderID) REFERENCES [Orders](ID) ON DELETE CASCADE ON UPDATE CASCADE,
	productID int FOREIGN KEY (productID ) REFERENCES [Product](ID) ON DELETE CASCADE ON UPDATE CASCADE,
	originalPrice float NOT NULL,
	quantity integer NOT NULL,
	discount float NOT NULL default 0,
	retailPrice float NOT NULL
)
GO


CREATE TABLE [Wishlist] (
	ID integer IDENTITY(1, 1),
	userID integer,
	productID integer NOT NULL,
	primary key(ID, userID),
	FOREIGN KEY (userID) REFERENCES [Users](ID) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (productID ) REFERENCES [Product](ID) ON DELETE CASCADE ON UPDATE CASCADE
)
GO

CREATE TABLE [Cart] (
	ID integer IDENTITY(1, 1),
	userID integer,
	productID integer NOT NULL,
	productQuantity integer NOT NULL,
	primary key(ID, userID),
	FOREIGN KEY (userID) REFERENCES [Users](ID) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (productID) REFERENCES [Product](ID) ON DELETE CASCADE ON UPDATE CASCADE
)
GO

CREATE TABLE [Reviews] (
	ID integer IDENTITY(1, 1) primary key,
	userID integer NOT NULL,
	productID integer NOT NULL,
	rating integer NOT NULL,
	description varchar(200) NOT NULL,
	reviewDate datetime NOT NULL,
	FOREIGN KEY (userID) REFERENCES [Users](ID) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (productID ) REFERENCES [Product](ID) ON DELETE CASCADE ON UPDATE CASCADE
)
GO

CREATE TABLE [BlackList] (
	userID integer primary key,
	description varchar(50) NOT NULL,
	FOREIGN KEY (userID) REFERENCES [Users](ID) ON DELETE CASCADE ON UPDATE CASCADE
)
GO