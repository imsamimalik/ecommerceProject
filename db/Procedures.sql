
---------------------------------------------------------------
---------------------------   PRODUCTS   ----------------------
---------------------------------------------------------------

create procedure addProduct
@name varchar(50),
@description varchar(50),
@unitPrice int,
@quantityInStock int,
@catID int,
@imgURL varchar(50),
@out integer output
as
begin
	if(exists(Select ID from Product where @name = name and @catID = catID and @description = [description]))
	begin
		set @out = 1
		print 'product already exists'
	end
	else
	begin
		set @out = 0
		Insert into Product (name, [description], unitPrice, quantityInStock, catID, imgURL)
		values(@name, @description, @unitPrice, @quantityInStock,@catID, @imgURL)
	end
end
go

create procedure deleteProduct
@pid int,
@out integer output
as
begin
	if exists(select * from Product where ID = @pid)
	begin
		Delete from Product where ID=@pid
		set @out = 0
	end
	else
	begin
		set @out =1
	end
	
end
go

create procedure changeQuantity
@pid int,
@QuantityToAdd integer,
@out integer output
as
begin
	if(exists(Select ID from Product where ID=@pid))
	begin
		Update Product set quantityInStock = @QuantityToAdd where ID=@pid
		print 'Quantity changed'
		set @out = 0
	end
	else
	begin
		set @out = 1
		print 'product does not exist' 
	end
end
go


create procedure UpdateUnitPrice
@pid int,
@newUnitPrice integer,
@out integer output
as
begin
	if(exists(Select ID from Product where ID = @pid))
	begin
		Update Product set unitPrice = @newUnitPrice where  ID = @pid
		print 'Unit price updated'
		set @out = 0
	end
	else
	begin
		set @out = 1
		print 'product does not exist' 
	end
end
go


create procedure addCategory
@name varchar(50),
@out integer output
as
begin
	if(exists(Select name from Category where name = @name))
	begin
		print 'This category already exists!'
		set @out = 1
	end
	else
	begin
		insert into category(name) values (@name)
		print 'Category added successfully.'
		set @out = 0
	end
end
go

create procedure deleteCategory
@name varchar(50),
@out integer output
as
begin
	if(exists(Select name from Category where name = @name))
	begin
		delete from Category
		where name = @name
		print 'Category deleted successfully'
		set @out = 0
	end
	else
	begin
		print 'Deletion failed. This category does not exist'
		set @out = 1
	end
end
go


create procedure searchCategroy
@catID integer
as
begin
	select *
	from homeProductsView
	where catID=@catID
end
go



create procedure getReviewsOfProduct
@pid integer,
@out int output
as
begin
	if(@pid IN (Select productID from Reviews))
	begin
		select *
		from productReviewsView
		where productID=@pid
		set @out = 0
	end
	else
	begin
		set @out = 1
		print 'no review of the product was found'
	end
end
go




create procedure searchProduct
@text varchar(50)
as
select @text = '%' + @text + '%'
begin
	select *
	from homeProductsView
	where productName like @text
end
go



---------------------------------------------------------------
---------------------------   USER   --------------------------
---------------------------------------------------------------


create procedure registerUser
@uname varchar(50),
@username varchar(25),
@uemail varchar(50),
@upassword varchar(50),
@uaddress varchar(50),
@upostalCode integer,
@uWarningCount integer,
@uWalletBalance integer,
@out integer output
as
begin

	if exists(
		select username
		from [Users]
		where username=@username or email=@uemail
	)
	begin
		set @out = 1
		print 'user already exists'
	end
	else
	begin
		insert into [Users] (name, username, email, [password], [address], postalCode, warningCount, walletBalance) values 
		(@uname,@username,@uemail,@upassword,@uaddress,@upostalCode,@uWarningCount,@uWalletBalance)
		set @out = 0
		print 'user registered'
	end

end
go

create procedure loginUser
@username varchar(25),
@password varchar(50),
@out integer output
as
begin
	if exists (
		select username
		from [Users]
		where username=@username and password=@password
	)
	begin
		set @out = 0
		print 'user logged in'
	end
	else
	begin
		set @out = 1 
		print 'incorrect username or password'
	end
end
go


create procedure getReviewsOfUser
@username varchar(25)
as
begin
	select * 
	from userReviewsView
	where username=@username
end
go


create procedure getOrdersOfUser
@username varchar(25)
as
begin
	select *
	from userOrdersView
	where username=@username
end
go


create procedure isUserBlacklisted
@uid integer,
@out integer output
as
begin
	if exists(
		select *
		from BlackList
		where userID=@uid
	)
	begin
		print 'user is blacklisted'
		set @out = 1
	end
	else
	begin
		print 'user is not blacklisted'
		set @out = 0
	end
end
go


---------------------------------------------------------------
---------------------------   WISHLIST   ----------------------
---------------------------------------------------------------

create procedure addToWishlist
@pid integer,
@uid integer,
@out integer output
as
begin

	if(not exists(select ID from Wishlist where productID = @pid and userID= @uid))
	begin
		insert into Wishlist (productID, userID) values
		(@pid,@uid)
		print 'added to wishlist'
		set @out = 0
	end
	else
	begin
		print 'already there'
		set @out = 1
	end
end
go




create procedure removeFromWishlist
@pid integer,
@uid integer,
@out integer output
as
begin

	if exists (
		select ID
		from Wishlist
		where productID = @pid
	)
	begin
		delete from Wishlist
		where userID = @uid and productID = @pid
		print 'removed from wishlist'
		set @out = 0
	end
	else
	begin
		print 'product not found in wishlist'
		set @out = 1
	end

end
go


---------------------------------------------------------------
---------------------------   REVIEWS   ----------------------
---------------------------------------------------------------

create procedure insertReview
@uid integer,
@pid integer,
@rating integer,
@desc varchar(200),
@out integer output
as
begin
	declare @reviewDate datetime
	if (exists(select ID from Product where ID = @pid) 
		and
		exists(select ID from [Users] where ID = @uid)
	)
	begin
		set @reviewDate = (Select GETDATE())
		insert into Reviews values
		(@uid,@pid,@rating,@desc,@reviewDate)
		print 'review added'
		set @out = 0
	end
	else if(not exists(select ID from Product where ID = @pid))
	begin
		print 'product not found'
		set @out = 1
	end
	else
	begin
		print 'user not found'
		set @out = 1
	end

end
go



create procedure deleteReview
@pid integer,
@uid integer,
@out integer output
as
begin

	if exists (
		select ID
		from Reviews
		where productID = @pid and userID=@uid
	)
	begin
		delete from Reviews
		where userID = @uid and productID = @pid
		print 'review deleted'
		set @out = 0
	end
	else
	begin
		print 'review not found'
		set @out = 1
	end

end
go


---------------------------------------------------------------
---------------------------   CART   --------------------------
---------------------------------------------------------------


create procedure insertToCart
@uid integer,
@pid integer,
@quantity integer,
@out integer output
as
begin
	if (exists(select ID from Product where ID = @pid) 
		and
		exists(select ID from [Users] where ID = @uid)
	)
	begin
		-- if product already exists update it's quantity
		if exists (select ID from Cart where userID = @uid and productID = @pid)
		begin

		-- get old quantity
		declare @oldQuantity integer
		select @oldQuantity = productQuantity from Cart where userID = @uid and productID = @pid
		
		-- update quantity
		update Cart
		set productQuantity = @quantity + @oldQuantity
		where userID = @uid and productID = @pid
		print 'product quantity updated'
		set @out = 0
		
		end

		else 
		begin

		insert into Cart values
		(@uid,@pid,@quantity)
		print 'added to cart'
		set @out = 0

		end
		
	end
	else if(not exists(select ID from Product where ID = @pid))
	begin
		print 'product not found'
		set @out = 1
	end
	else
	begin
		print 'user not found'
		set @out = 1
	end
end
go


create procedure deleteFromCart
@pid integer,
@uid integer,
@out integer output
as
begin

	if exists (
		select ID
		from Cart
		where productID = @pid and userID=@uid
	)
	begin
		delete from Cart
		where productID = @pid and userID=@uid
		print 'product deleted'
		set @out = 0
	end
	else
	begin
		print 'product not found in cart'
		set @out = 1
	end

end
go

-- changed count to sum
create procedure countCart
@uid integer,
@out integer output
as
begin
	select @out = sum(productQuantity)
	from Cart
	where userID = @uid
end
go


---------------------------------------------------------------
---------------------------   ORDER   -------------------------
---------------------------------------------------------------

create procedure placeOrder
@uid integer,
@oid integer output,
@out integer output
as 
begin
	declare @blacklist integer
	Exec isUserBlacklisted @uid, @blacklist output

	if(@blacklist = 1)
	begin
		print 'user is blacklisted'
		set @out = 1
	end
	else
	begin
	insert into [Orders] (userID) values (@uid)
	set @oid = SCOPE_IDENTITY()
	set @out = 0
	end
end
GO

create procedure addProductsToOrder
@oid integer,
@pid integer,
@quantity integer,
@discount float,
@out integer output
as
begin
		if (exists(select ID from Product where ID = @pid))
		begin
			
			declare @originalPrice float
			declare @retailPrice float

			set @originalPrice = (Select unitPrice from [Product] where id = @pid)
			set @retailPrice = @originalPrice -(@originalPrice * @discount / 100)
			
				update [Product]
				set quantityInStock = quantityInStock - @quantity
				where ID = @pid

				insert into OrderDetails (orderID, productID, originalPrice, quantity, discount, retailPrice)
				values(@oid, @pid, @originalPrice, @quantity, @discount, @retailPrice)
		end

		else
		begin
			print 'order insertion failed! Product not found'
			set @out = 1
		end
end
go 

create procedure finalizeOrder
@oID int,
@uid int,
@paymentMethod varchar(20),
@out int output
as 
begin 

		declare @totalAmount float, @orderPlacementDate datetime
		declare @walletBalance int
		set @walletBalance = isnull((Select walletBalance from Users where ID = @uid),0)
		set @totalAmount = (Select sum(retailPrice * quantity) from OrderDetails where orderID = @oid)

		if (@paymentMethod = 'wallet')
		begin
			if(@totalAmount > @walletBalance)
			begin
				print 'Insufficient wallet balance. Order not placed'

				update [Product]
				set quantityInStock = quantityInStock + (Select quantity from OrderDetails where orderID = @oid and productID = [Product].ID)
				where ID in (Select productID from OrderDetails where orderID = @oid)

				Delete from [OrderDetails]
				where orderID = @oid

				Delete from [Orders]
				where ID = @oid
				
				set @out = 1
			end
			else
			begin
				update [Users]
				set walletBalance = walletBalance - @totalAmount
				where ID = @uid

				update Orders
				set paymentStatus = 1
				where ID = @oid

				set @out = 0

				set @orderPlacementDate = SYSDATETIME()
				update [Orders]
				set paymentMethod = @paymentMethod, orderPlacementDate = @orderPlacementDate
				where ID = @oid
				delete from Cart where userID = @uid

			end	
		end
		else
		begin
		    set @orderPlacementDate = SYSDATETIME()
			update [Orders]
			set paymentMethod = @paymentMethod, orderPlacementDate = @orderPlacementDate
			where ID = @oid
			delete from Cart where userID = @uid
			set @out = 0
		end
end
go

--dispatchdate
create procedure updateDispatchDate 
@oid int, @dispatchDate datetime
as
begin
	update [Orders]
	set dispatchDate = @dispatchDate
	where ID = @oid
end
go

create procedure updateReceiveDate 
@oid int, @receiveDate datetime
as
begin
	update [Orders]
	set receiveDate = @receiveDate
	where ID = @oid
end
go

create procedure updateDeliveryStatus
@oid int, @status int
as
begin
	update [Orders]
	set deliveryStatus = @status
	where ID = @oid
end
go


create procedure updatePaymentStatus
@oid int, @status int
as
begin
	update [Orders]
	set paymentStatus = @status
	where ID = @oid
end
go

create procedure removeProductFromOrder
@oid integer,
@pid integer,
@out integer output
as
begin
	if exists (
		select ID
		from OrderDetails
		where orderID=@oid and productID = @pid
	)
	begin
		update [Product]
		set quantityInStock = quantityInStock + (Select quantity from OrderDetails where orderID = @oid and productID = [Product].ID)
		where ID in (Select productID from OrderDetails where orderID = @oid)
		delete from OrderDetails
		where orderID=@oid and productID = @pid
		print 'product deleted from order'
		set @out = 0
	end
	else
	begin
		print 'product deletion from order failed!'
		set @out = 1
	end

end
go





---------------------------------------------------------------
---------------------------   Coupon   ------------------------
---------------------------------------------------------------

create procedure addCoupon
@name varchar(50),
@discount float,
@code varchar(15),
@out integer output
as
begin
	if(exists(Select ID from Coupon where @name = name and @code = code))
	begin
		set @out = 1
		print 'coupon already exists'
	end
	else
	begin
		set @out = 0
		Insert into Coupon (name, discount, code) values (@name, @discount, @code)
	end
end
go


create procedure deleteCoupon
@code varchar(15)
as
begin
	Delete from Coupon where @code = code
end
go

create procedure validateCoupon
@id integer,
@out integer output
as
begin
	if exists (
		select ID
		from Coupon
		where ID=@id
	)
	begin
		print 'valid coupon'
		set @out = 0
	end
	else
	begin
		print 'invalid coupon'
		set @out = 1
	end

end
go

create procedure getDiscountOfCoupon
@id integer,
@out integer output,
@discount integer output
as
begin
	
	declare @isValid integer
	execute validateCoupon @id, @isValid output

	if(@isValid = 0)
	begin
		select @discount = discount
		from Coupon
		where ID  = @id

		print 'got discount'
		set @out = 0
	end
	else
	begin
		print 'invalid discount'
		set @out = 1
	end

end
go



create procedure getCouponID
@code varchar(15),
@id integer output
as
begin
	select @id = ID
	from Coupon
	where code = @code
end
go