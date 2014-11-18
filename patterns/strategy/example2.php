<?php
/* strategy pattern */
class Person {
	public $name;
	public $age;
	private $ruleAgent;
	
	public function __construct($name, $age, RuleAgent $ruleAgent) {
		$this->name = $name;
		$this->age = $age;
		$this->ruleAgent = $ruleAgent;
	}
	
	public function isApproved() {
		return $this->ruleAgent->isApproved($this);
	}
}

interface RuleAgent {
	public function isApproved(Person $person);
}

class AgeRule implements RuleAgent {
	public function isApproved(Person $person) {
		return ($person->age > 31);
	}
}

class NameRule implements RuleAgent {
	public function isApproved(Person $person) {
		return ($person->name == 'david');
	}
}

$p1 = new Person('david', 32, new AgeRule());
if ($p1->isApproved()) {
	echo $p1->name.' is approved';
} else {
	echo $p1->name.' is NOT approved';
}
echo '<br />';

$p1 = new Person('david', 32, new NameRule());
if ($p1->isApproved()) {
	echo $p1->name.' is approved';
} else {
	echo $p1->name.' is NOT approved';
}
echo '<br />';

$p1 = new Person('david', 25, new AgeRule());
if ($p1->isApproved()) {
	echo $p1->name.' is approved';
} else {
	echo $p1->name.' is NOT approved';
}
echo '<br />';
?>