<?php
class ShoppingCart {
	public $price;
	public $products;
	public $ruleShippingCosts;
	
	public function __construct(ruleCalculateShippingCosts $ruleShippingCosts) {
		$this->products = array();
		$this->ruleShippingCosts = $ruleShippingCosts;
	}
	
	public function addProduct(Product $product) {
		array_push($this->products, $product);
	}
	
	public function getShippingCosts() {
		return $this->ruleShippingCosts->getShippingCosts($this);
	}
	
	public function setShippingCostsBehavior(ruleCalculateShippingCosts $ruleShippingCosts) {
		$this->ruleShippingCosts = $ruleShippingCosts;
	}
	
	public function getTotalPrice() {
		$totalPrice = 0;
		if (!empty($this->products)) {
			foreach($this->products as $product) {
				$totalPrice += $product->price;
			}
		}
		return $totalPrice;
	}
}

class Product {
	public $name;
	public $price;
	
	public function __construct($name, $price) {
		$this->name = $name;
		$this->price = $price;	
	}
}

interface ruleCalculateShippingCosts {
	public function getShippingCosts(ShoppingCart $cart);
}

class RuleNameShippingCosts implements ruleCalculateShippingCosts {
	public function getShippingCosts(ShoppingCart $cart) {
		if (!empty($cart->products)) {
			foreach($cart->products as $product) {
				if ($product->name == 'Imac') {
					return 50;
				}
			}
		}
		return 0;
	}
}

class RulePriceShippingCosts implements ruleCalculateShippingCosts {
	public function getShippingCosts(ShoppingCart $cart) {
		if ($cart->getTotalPrice() < 500) {
			return 20;
		} else {
			return 0;
		}
	}
}

$shoppingCart = new ShoppingCart(new RuleNameShippingCosts());
$shoppingCart->addProduct(new Product('Imac', 1599));

echo $shoppingCart->getShippingCosts();
echo '<br />';

$shoppingCart->setShippingCostsBehavior(new RulePriceShippingCosts());
echo $shoppingCart->getShippingCosts();
echo '<br />';
?>