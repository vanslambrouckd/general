<?php
abstract class Character {
	public $weaponBehavior;
	
	public function __construct(WeaponBehavior $weaponBehavior) {
		$this->weaponBehavior = $weaponBehavior;
	}
	public function fight() {
		return $this->weaponBehavior->useWeapon();
	}
}

interface WeaponBehavior {
	public function useWeapon();
}

class KnifeBehavior implements WeaponBehavior {
	public function useWeapon() {
		return ' uses knife';
	}
}

class AxeBehavior implements WeaponBehavior {
	public function useWeapon() {
		return ' uses axe';
	}
}

class Fighter extends Character {
	public $name;
	
	public function __construct($name, WeaponBehavior $weaponBehavior) {
		$this->name = $name;
		parent::__construct($weaponBehavior);
	}
}

$king = new Fighter('david', new KnifeBehavior());
echo $king->name.' '.$king->fight();
echo '<br />';

$queen = new Fighter('sofie', new AxeBehavior());
echo $queen->name.' '.$queen->fight();
?>