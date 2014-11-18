<?php
class Registry {
	public $data = array();
	public $persistable;
	
	public function __construct(SaveData $s) {		
		$this->persistable = $s;
	}	
	
	public function save() {
		$this->persistable->save($this->data);
	}
	
	public function setPersistable(SaveData $s) {
		$this->persistable = $s;
	}
}

interface SaveData {
	public function save($data);
}

class SaveCSV implements SaveData {
	public function save($data) {
		foreach($data as $item) {
			echo $item.';';
		}
	}
}

class SaveHtml implements SaveData {
	public function save($data) {
		foreach($data as $item) {
			echo '<p style="color:red;">'.$item.'</p>';
		}
	}
}

class SaveJSON implements SaveData {
	public function save($data) {
		echo json_encode($data);
	}
}

class SaveDB implements SaveData {
	public function save($data) {
		foreach($data as $item) {
			echo 'INSERT INTO table (cel1) VALUES ('.$item.');<br />';
		}
	}
}

$reg = new Registry(new SaveCSV());
array_push($reg->data, 'item1');
array_push($reg->data, 'item2');
array_push($reg->data, 'item3');
$reg->save();

$reg->setPersistable(new SaveHTML());
$reg->save();

$reg->setPersistable(new SaveJSON());
$reg->save();

echo '<br />';
$reg->setPersistable(new SaveDB());
$reg->save();

/* http://www.phptherightway.com/pages/Design-Patterns.html */
interface OutputInterface {
	public function load($data);
}

class JsonOutput implements OutputInterface {
	public function load($data) {
		return json_encode($data);
	}
}

class SerializedOutput implements OutputInterface {
	public function load($data) {
		return serialize($data);
	}
}

class SomeClient {
	private $output;
	public $data;
	
	public function setOutput(OutputInterface $outputType) {
		$this->output = $outputType;
	}
	
	public function setData($str) {
		$this->data = $str;
	}
	
	public function loadOutput() {
		return $this->output->load($this->data);
	}
}

$client = new SomeClient();
$client->setData('david');
$client->setOutput(new SerializedOutput());
$data = $client->loadOutput();
echo $data;
echo '<hr />';
$client->setOutput(new JsonOutput());
$data = $client->loadOutput();
echo $data;
?>