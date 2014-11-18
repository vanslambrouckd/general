<?php
/*
http://prathapgivantha.wordpress.com/2012/09/14/strategy-pattern/
*/
interface PaymentMethod {
	public function pay($amount);
}

class PayPal implements PaymentMethod {
	public $name;
	public $cardNumber;
	public $expireDate;

	public function __construct($name, $cardNumber, $expireDate) {
		$this->name = $name;
		$this->cardNumber = $cardNumber;
		$this->expireDate = $expireDate;
	}
	
	public function pay($amount) {
		return (strtotime($this->expireDate) > time());
	}
}

class Visa implements PaymentMethod {
	public function pay($amount) {
		return TRUE;
	}
}

class Item {
	public $name;
	public $price;
	
	public function __construct($name, $price) {
		$this->name = $name;
		$this->price = $price;		
	}
}

class ShoppingCart {
	private $items;
	
	public function __construct() {
		$this->items = array();
	}
	
	public function addItem(Item $item) {
		array_push($this->items, $item);
	}
	
	public function calcTotal() {
		$total = 0;
		if (!empty($this->items)) {
			foreach($this->items as $item) {
				$total += $item->price;
			}
		}
		return $total;
	}
	
	public function pay(PaymentMethod $method) {
		$total = $this->calcTotal();
		return $method->pay($total);
	}
}

$instance = new ShoppingCart();
$instance->addItem(new Item('prod1', 10.5));
$instance->addItem(new Item('prod2', 13.5));
$success = $instance->pay(new PayPal('david vanslam', '123456-13', '2014-02-20'));
assert($success);

$success = $instance->pay(new PayPal('david vanslam', '123456-13', '2025-02-20'));
?>