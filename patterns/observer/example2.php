<?php
/* 
observer pattern 
http://arup-barua.blogspot.be/2012/07/a-real-world-example-of-observer-pattern.html
http://wwwswt.informatik.uni-rostock.de/deutsch/Lehre/Uebung/Beispiele/PatternExamples/patexamples.htm
*/

class Post implements \SplSubject {
	private $title;
	
	private $observers = array();
	
	public function attach(\SplObserver $o) {
		$id = spl_object_hash($o);
		$this->observers[$id] = $o;
	}
	
	public function detach(\SplObserver $o) {
		$id = spl_object_hash($o);
		unset($this->observers[$id]);
	}
	
	public function __construct($title) {
		$this->title = $title;
	}
	
	public function save() {
		$this->notify();
	}
	
	public function notify() {
		if (!empty($this->observers)) {
			foreach($this->observers as $o) {
				$o->update($this);
			}
		}
	}
	
	public function getTitle() {
		return $this->title;
	}
}

class User implements \SplObserver {
	private $name;
	
	public function __construct($name) {
		$this->name = $name;
	}
	
	public function getName() {
		return $this->name;
	}
	
	public function update(\SplSubject $item) {
		//if ($item->getType == 'post')
		echo 'send mail to '.$this->getName().': new post: '.$item->getTitle();
		echo '<br />';
	}
}

$post = new Post('bericht1');
$user = new User('david');
$user2 = new User('sofie');
$post->attach($user);
$post->attach($user2);
$post->save();

echo '<hr />';
$post2 = new Post('bericht2');
$post2->attach($user2);
$post2->save();
echo '<hr />';
$post->attach($user);
$post->save();
?>