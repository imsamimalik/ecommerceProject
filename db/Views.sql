USE MASTER 
GO

USE Ecommerce
GO

create view uidName
as
	select ID, username
	from [Users]
go


---------------------------------------------------------------
---------------------------   PRODUCTS   ----------------------
---------------------------------------------------------------

create view homeProductsView
as
	select ID as productID, name as productName, unitPrice, catID, imgURL
	from Product
go


create view singleProductView
as
	select P.ID as productID, P.name as productName, P.description as productDescription,
	P.quantityInStock as productQuantity, P.imgURL, C.ID as catID, C.name as catName
	from Product P join Category C on P.catID = C.ID
go


create view productReviewsView
as 
	select R.ID as reviewID, R.userID, U.username, R.productID, R.rating, R.description as reviewText, R.reviewDate
	from Reviews R join Product P on R.productID = P.ID join uidName U on R.userID = U.ID
go

---------------------------------------------------------------
---------------------------   USER   --------------------------
---------------------------------------------------------------

create view userReviewsView
as
	select R.ID as reviewID, R.userID,U.username, R.productID, R.rating, R.description as reviewText, R.reviewDate
	from Reviews R join uidName U on R.userID = U.ID
go


create view userOrdersView
as
	select D.orderID, D.ID as orderDetailsID, O.userID, U.username, D.productID, D.originalPrice, D.quantity as productQuantity, D.discount,
	D.retailPrice, O.paymentMethod, O.orderPlacementDate, O.deliveryStatus, O.dispatchDate, O.receiveDate, O.paymentStatus
	from Orders O join Users U on O.userID = U.ID join OrderDetails D on O.ID = D.orderID
go


---------------------------------------------------------------
---------------------------   Wishlist   ----------------------
---------------------------------------------------------------

create view wishlistView
as
	select W.ID as wishlistID, W.userID, W.productID, P.name as productName, P.imgURL, P.catID, P.unitPrice
	from Wishlist W join Product P on W.productID = P.ID
go


