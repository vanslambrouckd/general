#6.4.2 before and after functions

console.clear

sale = (user, product) ->
  auditLog = "Sold #{product} to #{user}"
  #some other stuff happens here
  
before = (decoration) ->
  (base) ->
    (params...) ->
	  decoration params...
	  base params...

withAuditLog = before (params...) ->
  auditLogs params...
  
after = (decoration) ->
  (base) ->
    (params...) ->
	  result = base params...
	  decoration params...
	  result
	  
#console.log withAuditlog "david", "pc"

around = (decoration) ->
  