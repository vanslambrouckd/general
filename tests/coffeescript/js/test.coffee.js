#tests van coffeescript in action.pdf ISBN 9781617290626
naam = "davied"
data = 
  X100:
    description: " Arealy cool camera"
    stock: 5
  X1:
    description: "an awesome camera"
    stock: 6
	
purchase = (product) ->
  console.log product
  
for own name, info of data
  elem = document.createElement "li"
  elem.innerHTML = "#{name}: #{info.description} (#{info.stock} in stock)"
  elem.onclick = purchase name
  document.getElementById('products').appendChild elem


class Product
  products = []
  @find = (query) ->
    (product for product in products when product.name is query)
  constructor: (name, info) ->
    products.push @
    @name = name
    @info = info
    @view = document.createElement 'div'
    @view.className = 'product'
    document.querySelector('.page').appendChild @view
    @render()
  render: ->
    console.log 'product render'
    @view.innerHTML = "#{@name}: #{@info.stock}"    
  purchase: (product) ->
    @render  
	

#new Product "Green", {}
#console.log Product.find 'Green'

class Gallery
  constructor: (@photos) ->
  render: ->
    images = for photo in @photos?
      '<li><img src="#{photo}" alt="sample photo" /></li>'
    "<ul class='gallery'>#{images.join ''}</ul>"

class Camera extends Product
  constructor: (name, info) ->
    @gallery = new Gallery info.gallery
    #super name, info	
    super
  purchaseCategory: 'camera'
  megapixels: ->
    @info.megapixels || 'Unknown'
  render: ->
    "#{@name} (#@info.stock}) #{@gallery.render()}"
	
pixelmatic = new Camera 'The pixelmatic 5000', {}
#console.log pixelmatic.name
#console.log 'pixel render'
#console.log pixelmatic.render()
	
class Skateboard extends Product
  purchaseCategory: 'skateboard'
  length: -> @info.length || 'Unknown'

class Shop
  constructor: (data) ->
    @view = document.createElement 'input'
    @view.oninput = ->
      prod = Product.find @value
      console.log prod
      Product.find @value
    document.body.appendChild @view
	#for own categorie of data
    #  alert categorie
  products = []
  for own name, info of data
    products.push new Product(name, info)
  console.log products
  
  find = (query) ->
    (product for product in products when product.name is query)  
  
shop = new Shop data

x12 = new Camera 'X12', { description: 'An awesome camera', stock: 5 }
#alert x12.name
#alert x12.render()

products = [ name: "Shark repellant",
name: "Duct tape"
]

find = (query) ->
  (product for product in products when product.name is query)

console.log find("Duct Tape")
skateOMatic = new Skateboard "Skate-o-matic", { description: "it's a skateboard", stock: 1 }
skateOMatic.render()

x11 = new Camera 'x11', {
	description: "the futur of photography",
	stock: 4,
	megapixels: 20
}

#console.log x11.megapixels?
#console.log x11.megapixels()
#console.log skateOMatic.megapixels?

class Human
Human.rights = ['Life', 'Liberty', 'The pursuit of happiness']
Human.rights = Human.rights.concat ['To party']
#console.log Human.rights

console.log ['yin', 'yang'].join 'and'

#modify built in objects slecht: niet doen
#Array::join = -> "Array::join was redefined"
#console.log ['yin', 'yang'].join 'and'

#modify built in objects slecht: niet doen
#Date::daysFromToday = ->
#  millisecondsInDay = 86400000
#  today = new Date
#  diff = @ - today
#  Math.floor diff/millisecondsInDay

#christmas = new Date "December 25, 2014, 00:00"
#console.log christmas.daysFromToday()

###
ipv modify built in, maak extended class
class ExtendedDate extends Date
  daysFromToday: ->
    millisecondsInDay = 86400000
    today = new Date
    diff = @ - today
    Math.floor diff/millisecondsInDay
  
christmas = new ExtendedDate "December 25, 2014, 00:00"
christmas.daysFromToday()
###