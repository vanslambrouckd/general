#tests van coffeescript in action.pdf ISBN 9781617290626

#mixins
###
htmlRenderer =
  render: ->
    @view = document.createElement 'div'
    document.body.appendChild @view
	@view.innerHTML = '
	#{@name}
	#{@info}
	'
	
class Donut
  constructor: (name, info) ->
    @name = name
	@info = info
	
Donu::render = htmlRenderer.render #works but tedous

#mixis is collection of related functions that can be attached as methods to objects

dwarves = 
  bashful: -> 'Bashful'
  doc: -> 'Doc'
  dopey: -> 'Dopey'
### 

class Mixin1
  constructor: (methods) ->
    for name, body of methods
      @[name] = body
  include: (klass) ->
    for key, value of @
      klass::[key] = value	
	  
htmlRenderer = new Mixin1
  render: -> "rendered"
  
class Camera2
  construct: (@name, @info) ->
    @view = document.createElement 'div'
    @view.className = 'product'
    document.getElementById('test2').appendChild @view
  htmlRenderer.include @
  
leica = new Camera2()
console.log leica.render()

#juiste manier
class ViewMixin
  @:: = null
  @include = (to, className) =>
    for key, val of @
      to::[key] = val
  @handler = (event, fn) ->
    @node[event] = fn
  @update = ->
    unless @node?
      @node = document.createElement 'div'
      @node.className = @constructor.name.toLowerCase()
      document.getElementById('test2').appendChild @node
    @node.innerHTML = @template()
	
class Prod
  ViewMixin.include @
  products = []
  constructor: (@name, @info) ->
    products.push @
    @template = =>
      "product: 
      #{@name}
	  "
    @update()
    @handler "onclick", @purchase
  purchase: =>
    alert 'purchase'
	
fiets = new Prod 'fiets', {}
auto = new Prod 'auto', {}