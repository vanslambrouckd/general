numberSold = (salePrice) ->
  50 + 20/10 * (200 - salePrice)

console.log numberSold 10
console.log numberSold 20
console.log numberSold 200
console.log numberSold 1

numberSold = 5
calculateNumberSold = (salePrice) ->
  #console.clear
  #console.log 'clear'
  #console.log numberSold
  numberSold = 50+20/10 * (200 - salePrice)

#console.log calculateNumberSold 220

calculateRevenue = (salePrice) ->
  numberSold * salePrice

console.clear
for price in [140..145]
  calculateNumberSold price
  console.log calculateRevenue price

#numberSold is shared by all functions in the program
numberSold = 0 
calculateNumberSold = (salePrice) ->
  numberSold = 50 + 20/10 * (200 - salePrice)

calculateRevenue = (salePrice, callback) ->
  callback numberSold * salePrice

revenueBetween = (start, finish) ->
  #totals is local to revenueBetween function, kan van nergens anders veranderd worden
  totals = [] 
  for price in [start..finish]
    calculateNumberSold price
    addToTotals = (result) ->
      totals.push result
    calculateRevenue price, addToTotals
   totals

console.log revenueBetween 140,145

#encapsulating state with objects
###
example1
no properties set on the object; its all method cals
none of the method calls change any properties on the object
=> good
###
class Camera3
  overhead: -> 140
  costPrice: -> 100
  profit: (salePrice) ->
    (@revenue salePrice) - (@cost salePrice)
  numberSold: (salePrice) ->
    50+20/10*(200-salePrice)
  revenue: (salePrice) ->
    (@numberSold salePrice) * salePrice
  cost: (salePrice) ->
    @overhead() + (@numberSold salePrice) + @costPrice()

console.clear
console.log "jaaa"
phototake500 = new Camera3
console.log phototake500.profit 162

###
example2
-> bad: avoid state in variables
###

revenue = 0
cost = 0
sold = 0

calculateRevenue = (salePrice) ->
  revenue = sold * salePrice

calculateCost = (salePrice) ->
  cost = 140 + sold *100

calculateNumberSold = (salePrice) ->
  sold = 50 + 20/10 * (200-salePrice)

calculateProfit = (salePrice) ->
  calculateNumberSold salePrice
  calculateRevenue salePrice
  calculateCost salePrice
  revenue - costPrice

#avoid state in functions or objects wherever possible

#abstraction
loadUserData = (user, callback) ->
  users.get user, (data) ->
    callback data

loadProductData = (product, callback) ->
  products.get product, (data) ->
    callback data

makeLoadData = (db) ->
  (entry, callback) ->
    db.get entry, (data) ->
      callback data

makeSaveData = (type) ->
  (entry, value, callback) ->
    db.set entry, value, callback?()

loadUserData = makeLoadData 'user'

makeDbOperator = (db) ->
  (operation) ->
    (entry, params...) ->
      db[operation] entry, params...

loadProductData = (makeDbOperator 'product') 'get'
saveProductData = (makeDbOperator 'product') 'set'

###
when functions are the basic building block, 
abstractions are done with the same basic function glue:
invoking a function, passing a function as an argument
and returning a function
###


#general cache
withCachedCallback = (fn) ->
  cache = Object.create null
  (params...) ->
    key = params[0]
    callback = params[params.length - 1]
    if key of cache
      callback cache[key]...
    else
      paramsCopy = params[..]
      paramsCopy[params.length-1] = (params...) ->
        cache[key] = params
        callback params
      fn paramsCopy

loadProductData = withCachedCallback ((makeDbOperator products) 'get')

###
memoization:
caching the evaluation of a function with specific arguments is called memoization
###

factorial = (n) ->
  if n is 0 then 1
  else
    n * (factorial n - 1)

for nr in [3..5]
	console.log factorial nr

#recursion
#retry database request until success

class User
  @get = () ->

logUserDataFor = (user) ->
  dbRequest = ->
    user.get user, (error, data) ->
      if error then dbRequest()
      else console.log 'Got the data'
  dbRequest()

#logUserDataFor 'fred'

#compose

profit = ->

tax = (amount) ->
  amount / 3

###
netProfit = (products) ->
  profits = (profit product) for product in products
  profits.reduce(acc, p) ->
    acc + p
	
netProfitForProducts = netProfit products
taxForProducts = tax NetProfitForProducts

userSpend = (user) ->
  spend = 100
  
loyalDiscount = (spend) ->
  if spend < 1000 then 0
  else if spend < 5000 then 5
  else if spend < 10000 then 10  
  else if spend < 50000 then 20    
  else if spend > 50000 then 40    
  
fredSpend = userSpend 'fred'
loyaltyDiscountForFred = loyaltyDiscount fredSpend
##p169
console.log loyaltyDiscountForFred
###