/*
dit is een AMD script (want gebruikt define)
require shim werkt niet op amd scripts
*/
define('purchase', [],
	function() {
		var myModule = {
			purchaseProduct: function() {
				console.log('purchaseProduct');
			}
		}
		return myModule;
	}
);
/*
define('purchase', [], function() {
	var purch = {
		function purchaseProduct(){
		  console.log("Function : purchaseProduct");
		}
	};
	return purch;
});*/
