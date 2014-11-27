//require gebruiken als je modules wil oproepen
//define gebruiken om module te maken
/*
require([dependency] =>
dependency = de naam van het bestand waarin de module gedefinieerd staat (zonder js)
*/

require(["purchase", 'module1'],function(purchase, mod){				  
  purchase.purchaseProduct();
  console.log(mod);
// console.log(dispatcher);
});