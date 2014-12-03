###
functies (coffeescript in action ISBN 9781617290626 p144)
keywords:
partial application
###

overhead = 140
costPrice = 100

numberSold = (salePrice) -> 
  50 + 20/10 * (200-salePrice)
  
revenue = (salePrice) -> 
  (numberSold salePrice) * salePrice
  
cost = (salePrice) ->
  overhead + (numberSold salePrice) * costPrice

profit = (salePrice) ->
  (revenue salePrice) - (cost salePrice)


console.log profit 100

#functions accepting functions

add = (a,b) ->
  console.log(a+b)
  
add 1,2

bindFirstArg = (fn, a) ->
  (b) ->
    fn(a,b)
	
addOne = bindFirstArg(add, 1)
addOne(1)
addOne(2)

multiply = (a, b) ->
  console.log a*b
  
multiplyByTen = bindFirstArg(multiply, 10)

multiplyByTen(3)

###
currying:
http://cedricruiz.me/blog/functional-coffeescript-for-the-impatient/
simple concept where you transform a function 
that takes two or more arguments into a function
of one argument that keeps returning a function 
of one argument untill all arguments have been passed
###

#not curried
mul = (x,y) -> x*y

#curried
mul = (x) -> 
  (y) -> 
    x * y
  
console.log mul(1)(2)
# returns a function that expects one argument
# calls that function with 2 and returns the result

sum = (x,y) ->
  x+y
  
#partially applied sum with 2
sum2 = (x) ->
  sum 2, x

console.log sum2 2

###
partial application
http://www.drdobbs.com/open-source/currying-and-partial-functions-in-javasc/231001821
###


getProfit = (overhead, costPrice, numberSold) ->
  revenue = (salePrice) ->
    console.log('test')
    console.log (numberSold salePrice) * salePrice
	
getProfit(15,20,30)