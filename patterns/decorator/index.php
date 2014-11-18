<?php
/* decorator pattern */

abstract class Drank {
	protected $description = 'Onbekende drank';
	
	public function getDescription() {
		return $this->description;
	}
	
	public abstract function cost();
}

abstract class Toevoeging extends Drank {
	//public abstract function getDescription(); //werkt niet?
}

class Espresso extends Drank {
	public function __construct() {
		$this->description = 'Espresso';
	}
	
	public function cost() {
		return 1.99;
	}
}

class Decaf extends Drank {
	public function __construct() {
		$this->description = 'Decaf';
	}
	
	public function cost() {
		return 0.89;
	}
}

class Melk extends Toevoeging {
	private $drank;
	
	public function __construct(Drank $drank) {
		$this->drank = $drank;
	}
	
	public function getDescription() {
		return $this->drank->getDescription().', met melk';
	}
	
	public function cost() {
		return $this->drank->cost() + 0.50;
	}
}

class Suiker extends Toevoeging {
	private $drank;
	
	public function __construct(Drank $drank) {
		$this->drank = $drank;
	}
	
	public function getDescription() {
		return $this->drank->getDescription().', met suiker';
	}
	
	public function cost() {
		return $this->drank->cost() + 0.05;
	}
}

$espresso = new Espresso();
echo $espresso->getDescription();
echo '<hr />';

$decaf = new Decaf();
echo $decaf->getDescription();
echo '<br />';
echo $decaf->cost();
echo '<hr />';

$decaf = new Melk($decaf);
echo $decaf->getDescription();
echo '<br />';
echo $decaf->cost();
echo '<hr />';

$decaf = new Suiker($decaf);
echo $decaf->getDescription();
echo '<br />';
echo $decaf->cost();
echo '<hr />';
?>