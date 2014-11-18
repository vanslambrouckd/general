<?php
/*
strategy pattern

*/
error_reporting(E_ALL);
ini_set('display_erors', TRUE);
interface QuackBehavior {
	public function quack();
}

interface FlyBehavior {
	public function fly();
}

abstract class Duck {  
	/*
	abstract class: kan je geen instance van maken, dus $duck = new Duck() => Fatal error: Cannot instantiate abstract class Duck
	*/
	public $quackBehavior;	
	public $flyBehavior;
	
	function __construct(QuackBehavior $quackBehavior, FlyBehavior $flyBehavior) {
		//print 'duck constructor';
		$this->quackBehavior = $quackBehavior;
		$this->flyBehavior = $flyBehavior;
	}
		
	public function swim() {
		echo 'All ducks float, even decoys!<br />';
	}
	
	public function display() {
	}
	
	public function performQuack() {
		$this->quackBehavior->quack();
	}
	
	public function setQuackBehavior(QuackBehavior $quackBehavior) {
		$this->quackBehavior = $quackBehavior;
	}
	
	public function performFly() {
		$this->flyBehavior->fly();
	}
	
	public function setFlyBehavior(FlyBehavior $flyBehavior) {
		$this->flyBehavior = $flyBehavior;
	}
}

class Quacks implements QuackBehavior {
	public function quack() {
		echo 'quack<br />';
	}
}

class MuteQuack implements QuackBehavior {
	public function quack() {
		echo 'mute quack<br />';
	}
}

class MallardDuck extends Duck {
	public function __construct() {
		parent::__construct(new Quacks(), new FlyRocketPowered());		
	}
}

class MutedDuck extends Duck {
	public function __construct() {
		parent::__construct(new MuteQuack(), new NoFly());		
	}
}

class FlyNormal implements FlyBehavior {
	public function fly() {
		echo "I'm flying normally<br />";
	}
}

class FlyRocketPowered implements FlyBehavior {
	public function fly() {
		echo "I'm flying with a rocket<br />";
	}
}

class NoFly implements FlyBehavior {
	public function fly() {
		echo "I cannot fly<br />";
	}
}

$t = new MallardDuck();
//$t->swim();
$t->performQuack();
$t->performFly();


$t = new MutedDuck();
//$t->swim();
$t->performQuack();
$t->performFly();

$t->setQuackBehavior(new Quacks());
$t->setFlyBehavior(new NoFly());
$t->performQuack();
$t->performFly();
?>