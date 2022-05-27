USE MASTER 
GO

USE Ecommerce
GO

-----	registerUser	-------
declare @out integer
Exec registerUser 'A', 'A', 'A@gmail.com', 'aabcdefg', 'xyz', 1234, 0, 0, @out output
Exec registerUser 'B', 'B', 'B@gmail.com', 'babcdefg', 'xyz', 1234, 1, 5000, @out output
Exec registerUser 'C', 'C', 'C@gmail.com', 'cabcdefg', 'qwe', 6789, 2, 1000, @out output
Exec registerUser 'D', 'D', 'D@gmail.com', 'dabcdefg', 'asd', 4455, 0, 10066, @out output
Exec registerUser 'E', 'E', 'E@gmail.com', 'eabcdefg', 'xyz', 1234, 0, 10, @out output
Exec registerUser 'F', 'F', 'F@gmail.com', 'fabcdefg', 'asd', 4455, 0, 200, @out output
Exec registerUser 'G', 'G', 'G@gmail.com', 'gabcdefg', 'xyz', 1234, 0, 100, @out output
Exec registerUser 'H', 'H', 'H@gmail.com', 'habcdefg', 'xyz', 1234, 3, 100, @out output
Exec registerUser 'I', 'I', 'I@gmail.com', 'iabcdefg', 'xyz', 1234, 0, 900, @out output
Exec registerUser 'J', 'J', 'J@gmail.com', 'jabcdefg', 'qwe', 6789, 0, 1000, @out output
Exec registerUser 'K', 'K', 'K@gmail.com', 'kabcdefg', 'xyz', 1234, 0, 10000, @out output
Exec registerUser 'L', 'L', 'L@gmail.com', 'labcdefg', 'qwe', 6789, 1, 10224, @out output
Exec registerUser 'M', 'M', 'M@gmail.com', 'mabcdefg', 'asd', 4455, 2, 10020, @out output
Exec registerUser 'N', 'N', 'N@gmail.com', 'nabcdefg', 'xyz', 1234, 0, 1007, @out output
Exec registerUser 'O', 'O', 'O@gmail.com', 'oabcdefg', 'qwe', 6789, 0, 10088, @out output
Exec registerUser 'P', 'P', 'P@gmail.com', 'pabcdefg', 'xyz', 1234, 1, 1050, @out output


-----	loginUser	------
declare @out1 integer
Exec loginUser 'A', 'aabcdefg', @out1 output --Correnct
Exec loginUser 'A', 'aabcdef', @out1 output	 --Incorrect


--Add category
declare @out19 integer
Exec addCategory 'Electronics', @out19 output
Exec addCategory 'Furniture', @out19 output
Exec addCategory 'Sports Eq uipment', @out19 output
Exec addCategory 'Clothes', @out19 output

--Search Category
Exec searchCategroy 2


--Add Product
declare @out18 integer
Exec addProduct 'Racket', 'Yonex', 25000, 45, 3, 'URL', @out18 output
Exec addProduct 'Racket', 'Grapower',50000, 45, 3, 'URL', @out18 output
Exec addProduct 'Charger', 'Samsung',500, 50, 1, 'URL', @out18 output
Exec addProduct 'EarPhones', 'Samsung', 1230, 40, 1, 'URL', @out18 output
Exec addProduct 'Mobile', 'Samsung', 100000, 45, 1, 'URL', @out18 output
Exec addProduct 'Power Bank', 'Samsung',12000,45, 1, 'URL', @out18 output
Exec addProduct 'Air Pods', 'Apple',50000, 45, 1, 'URL', @out18 output
Exec addProduct 'MacBook', 'Apple',355500, 45, 1, 'URL', @out18 output
Exec addProduct 'Sofa', 'IKEA',75000, 45, 2, 'URL', @out18 output
Exec addProduct 'Bed', 'IKEA', 145000, 45, 2, 'URL', @out18 output
Exec addProduct 'Chair', 'INDEX FURNITURE',45000, 45, 2, 'URL', @out18 output
Exec addProduct 'Study Table', 'Furniture Point',30000, 45, 2, 'URL', @out18 output
Exec addProduct 'Dining Table', 'INDEX FURNITURE',80000, 45, 2, 'URL', @out18 output
Exec addProduct 'Book Shelf', 'IKEA',25000 ,45, 2, 'URL', @out18 output
Exec addProduct 'Mirror', 'Furniture Point', 4500,45, 2, 'URL', @out18 output
Exec addProduct 'Side Table', 'IKEA', 10000, 45, 2, 'URL', @out18 output
Exec addProduct 'Kurta', 'NishatLinen', 1500, 45, 4, 'URL', @out18 output
Exec addProduct 'Trousers', 'NishatLinen', 1500,45, 4, 'URL', @out18 output
Exec addProduct 'Shirt', 'NishatLinen', 1500,45, 4, 'URL', @out18 output
Exec addProduct 'Dupatta', 'J.',1500, 45, 4, 'URL', @out18 output
Exec addProduct 'Scarf', 'J.',1500, 45, 4, 'URL', @out18 output
Exec addProduct 'Shirt', 'NishatLinen',5000, 45, 4, 'URL' , @out18 output
Exec addProduct 'Top', 'LimeLight', 1000, 45, 4, 'URL', @out18 output
Exec addProduct 'Top', 'LimeLight', 1000, 45, 4, 'URL' , @out18 output
Exec addProduct 'Kurta', 'LimeLight',1500, 45, 4, 'URL', @out18 output
Exec addProduct 'Pant Coat', 'G2100', 20000, 45, 4, 'URL', @out18 output
Exec addProduct 'Dress Shirt', 'G2100', 4500, 45, 4, 'URL', @out18 output
Exec addProduct 'Waist Coat', 'G2100', 6000, 45, 4, 'URL', @out18 output
Exec addProduct 'Tie', 'G2100', 1200, 45, 4, 'URL', @out18 output


--Delete Product
declare @out99 integer
Exec deleteProduct 3,@out99 output
Exec deleteProduct 2,@out99 output


--Change quantity
declare @out2 integer
Exec changeQuantity 2, 10, @out2 output
Exec changeQuantity 1, 25, @out2 output


--Update Unit price
declare @out3 integer
Exec UpdateUnitPrice 2, 1500, @out3 output
Exec UpdateUnitPrice 3, 80000, @out3 output


--Search Product
Exec searchProduct 'hir'


--Get orders of user
Exec getOrdersOfUser 'B'


--Is User Blacklisted
declare @out7 integer
Exec isUserBlacklisted 2, @out7 output


--Add to wishlist
declare @out8 integer
Exec addToWishlist 25, 3, @out8 output
Exec addToWishlist 2, 2, @out8 output

--Remove from Wishlist
declare @out9 integer
Exec removeFromWishlist 2, 2, @out9 output


--Add Coupon
declare @out10 integer
Exec addCoupon 'abc', 100, '765D', @out10 output
Exec addCoupon 'fgh', 150, 'e345', @out10 output
Exec addCoupon 'def', 10, 'IQ', @out10 output
Exec addCoupon 'ghi', 10, 'EESHA', @out10 output
Exec addCoupon 'jkl', 10, 'BLUE', @out10 output
Exec addCoupon 'mno', 10, 'RAE', @out10 output
Exec addCoupon 'pqr', 10, 'TINA', @out10 output

--Delete coupon
Exec deleteCoupon '765D'

--Validate Coupon
declare @out11 integer
Exec validateCoupon 2, @out11 output


--Get coupon discount
declare @discount integer, @out12 integer
Exec getDiscountOfCoupon 2, @discount output, @out12 output


--Get coupon ID
declare @id integer
Exec getCouponID 'TINA', @id output
Exec getCouponID '765D', @id output
Select @id

--Insert review
declare @out13 integer
Exec insertReview 1, 3, 4.2, 'I had a good experience overall', @out13 output
Exec insertReview 2, 6, 3.2, 'I had an okay experience overall', @out13 output
Exec insertReview 4, 19, 2.2, 'I had a bad experience overall', @out13 output
Exec insertReview 15, 19, 1.2, 'I had a horrible experience overall', @out13 output

--Problematic and detected
Exec insertReview 19, 5, 4, 'I had a good experience overall', @out13 output
Exec insertReview 3, 33, 5, 'I had a terriffic experience overall', @out13 output


--Delete Review
declare @out14 integer
Exec deleteReview 6, 2, @out14 output
--Problematic and detected
Exec deleteReview 6, 1, @out14 output
Exec deleteReview 15, 1, @out14 output

--Get reviews of user
Exec getReviewsOfUser 'D'


--Get Product Review
declare @out4 integer
Exec getReviewsOfProduct 19, @out4 output
Exec getReviewsOfProduct 28, @out4 output


--Insert to Cart
declare @out15 integer
Exec insertToCart 4, 3, 3, @out15 output
Exec insertToCart 5, 2, 2,@out15 output


--Count cart
declare @out17 integer
Exec countCart 4, @out17 output


--Delete from Cart
declare @out16 integer
Exec deleteFromCart  3, 4, @out16 output
Exec deleteFromCart 2, 2, @out16 output


--Add order
--successful
Exec placeOrder 4
declare @out23 int
Exec addProductsToOrder 1, 3, 1, 'abc', @out23 output
declare @out24 int
Exec finalizeOrder 1, 4, 'cash', @out24 output

declare @orderdate datetime
set @orderdate = sysdatetime()
Exec updateDispatchDate 1, @orderdate
Exec updateReceiveDate 1, @orderdate
Exec updateDeliveryStatus 1, 1
Exec updatePaymentStatus 1, 1
Select * from Orders


--unsuccessful
Exec placeOrder 2
declare @out21 int
Exec addProductsToOrder 2, 2, 2, 'abc', @out21 output 
declare @out22 int
Exec finalizeOrder 2, 2, 'wallet', @out22 output


--Remove order
Exec placeOrder 2
declare @out27 int
Exec addProductsToOrder 3, 3, 2, 'abc', @out27 output
declare @out25 int
Exec removeProductFromOrder 1, 3, @out25 output

--Delete category
declare @out20 integer
Exec deleteCategory 'Electronics', @out20
