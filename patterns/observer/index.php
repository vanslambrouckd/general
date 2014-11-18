<?php
/* observer pattern */
/*
SplSubject {
	abstract public void attach ( SplObserver $observer )
	abstract public void detach ( SplObserver $observer )
	abstract public void notify ( void )
}
*/
/*
interface Observer {	
	public function update(float $temp, float $humidity, float $pressure);
}

interface displayElement {
	public function display();
}
*/
class WeatherData implements \SplSubject {
	private $observers;
	private $temperature;
	private $humidity;
	private $pressure;
	
	public function __construct() {
		$this->observers = array();
	}
	
	public function attach(\SplObserver $o) {
		$id = spl_object_hash($o);
		$this->observers[$id] = $o;
	}
	
	public function detach(\SplObserver $o) {
		$id = spl_object_hash($o);
		unset($this->observers[$id]);
	}
	
	
	public function notify() {
		foreach($this->observers as $o) {
			$o->update($this);
		}
	}
	
	public function setTemperature($temp) {
		$this->temperature = $temp;
		$this->notify();
	}
	
	public function getTemperature() {
		return $this->temperature;
	}
}

/*
SplObserver {
	abstract public void update ( SplSubject $subject )
}
*/
class CurrentConditionsDisplay implements \SplObserver {
	public function update(\SplSubject $weatherData) {
		echo 'temperature updated to '.$weatherData->getTemperature();
		echo '<br />';
	}
}


$station = new WeatherData();
$display = new CurrentConditionsDisplay();
$station->attach($display);
$station->setTemperature(10);
$station->setTemperature(15);
?>