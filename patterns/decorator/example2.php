<?php
session_start();
ob_start();
?>
<style type="text/css">
.formrowHor .data {
	margin-left:140px;
}

.formrowHor .label {
	display:inline-block;
	float:left;
	width:130px;
	padding-right:5px;
}

.formrowHor,
.formrowVert {
	margin-bottom:10px;
}


.inputtext,
.textarea {
	width:100%;
}
</style>
<?php
/*
gebaseerd op http://www.imavex.com/pfbc3.x-php5/examples/views.php
*/
function pr($data) {
	echo '<pre>';
	print_r($data);
	echo '</pre>';	
}

pr($_SESSION);
abstract class FormElement {
	public $name;
	public $label;
	public $attributes = array();
	
	public function __construct($label, $name, array $attributes) {
		$this->label = $label;
		$this->name = $name;
		
		
		if (!empty($name)) {
			$this->attributes['name'] = $name;
		}
		
		$this->attributes += $attributes;		
	}
	
	public function getAttribute($key) {
		$val = isset($this->attributes[$key])?$this->attributes[$key]:'';
		return $val;
	}
	
	public function getAttributes($ignore) {
		$str = '';
		if (!empty($this->attributes)) {
			if (!is_array($ignore)) {
				$ignore = array($ignore);				
			}
			
			foreach($this->attributes as $key => $val) {
				if (!in_array($key, $ignore)) {	
					$str .= ' '.$key.'="'.htmlentities($val).'" ';
				}				
			}
		}
		
		/*
		pr($this->attributes);
		echo $str.'<hr />';
		*/
		return $str;
	}
	
	public function setAttribute($key, $val) {
		$this->attributes[$key] = $val;
	}
	
	public function isValid($value) {
		return true;
	}
						
	public abstract function render();
}

class InputText extends FormElement {
	public $attributes = array('type' => 'text', 'class' => 'inputtext');
	public function render() {
		echo '<input '.$this->getAttributes('').' />';
	}
}

class InputButton extends FormElement {	
	public function __construct($label, $name = '', $type = 'Submit', array $properties = null) {
	
		$properties['type'] = $type;
		if (!empty($label)) {
			$properties['value'] = $label;
		}
		
		if (!empty($name)) {
			$properties['name'] = $name;
		}
		/*
		echo 'label='.$label;
		echo '<br />';
		echo 'name='.$name;
		echo '<br />properties:';		
		pr($properties);
		*/		
		parent::__construct('', '', $properties);
	}
	
	public function render() {
		echo '<input '.$this->getAttributes('').' />';
	}
}

class Textarea extends FormElement {
	public $attributes = array('rows' => 5, 'cols' => 1, 'class' => 'textarea');
	
	public function render() {		
		$attrs = $this->getAttributes('value');
		echo '<textarea '.$attrs.'>';
		if (!empty($this->attributes['value'])) {
			echo htmlentities($this->attributes['value']);
		}
		echo '</textarea>';
	}
}

class Form {
	public $id;
	public $attributes;
	public $elements;	
	private $view;
	private $values = array();
	
	public function __construct($view, $id, $attributes) {
		$this->id = $id;	
		$this->attributes = $attributes;
		$this->view = new $view;
	}
	
	public function addElement(Formelement $element) {
		$id = spl_object_hash($element);
		$this->elements[$id] = $element;
	}
	
	public function getAttributes() {
		$str = '';
		if (!empty($this->attributes)) {			
			foreach($this->attributes as $key => $val) {			
				$str .= ' '.$key.'="'.$val.'" ';
			}
		}
		return $str;
	}
		
	public function render() {		
		$values = $this->getSessionValues($this->id);			
		//pr($values);
		if (!empty($values)) {
			$this->setValues($values);
		}
		$this->applyValues($values);	
		
		$this->view->setForm($this);		
		$this->view->render();	
	}
	
	public function setValues(array $values) {
        $this->_values = array_merge($this->values, $values);
    }
	
	public function validate() {
		if (isset($_SESSION[$this->id])) {
			unset($_SESSION[$this->id]);
		}
		if($_SERVER['REQUEST_METHOD'] == 'POST') {
			$data = $_POST;
		} else {
			$data = $_GET;
		}
		
		$bIsValid = TRUE;
		foreach($this->elements as $el) {
			//pr($el);
			/*
			if (!$el->isValid()) {
				$bIsValid = FALSE;
			}
			*/
			//echo $value;
			
			if (!$el instanceof InputButton) {
				$name = $el->name;
				if (substr($name, -2) == '[]') {
					$name = substr($name, 0, -2);
				}

				if (isset($data[$name])) {
					$this->setValue($this->id, $name, $data[$name]);
				}
			}
		}
		
		
		//return $bIsValid;
		
		//pr($_SESSION);
		
		return array();
	}
	
	private function setValue($formId, $elementName, $value) {
		$_SESSION[$formId][$elementName] = $value;
	}
	
	private function getSessionValues($formId) {
		if (isset($_SESSION[$formId])) {
			return $_SESSION[$formId];
		} else {
			return array();
		}
	}
	
	public function applyValues() {
		if (!empty($this->elements)) {
			foreach($this->elements as $key => $el) {
				$name = $el->name;
				if (substr($name, -2) == '[]') {
					$name = substr($name, 0, -2);
				}
				//echo 'name='.$name.'<br />';
				
				if (!$el instanceof InputButton) {				
					if (isset($this->_values[$name])) {
						$val = $this->_values[$name];					
						$el->setAttribute('value', $val);
						$this->elements[$key] = $el;
					}			
				}
			}
		}
	}
	
	public function populate($data) {
		if (!empty($data)) {
			foreach($data as $key => $val) {
				$_SESSION[$this->id][$key] = $val;
			}
		}
	}
}

abstract class View {
	protected $form;

	public abstract function render();
	
	public function setForm(Form $form) {
		$this->form = $form;	
	}
	
	public abstract function renderLabel(FormElement $element);
}

class Horizontal extends View {
	public function render() {
		echo '<form '.$this->form->getAttributes('').'>';		
			echo '<input type="hidden" name="'.$this->form->id.'" />';
			if (!empty($this->form->elements)) {
				foreach($this->form->elements as $el) {
					echo '<div class="formrowHor">';
						$this->renderLabel($el);
							echo '<div class="data">';
								$el->render();
							echo '</div>';
					echo '</div>';
				}
			}		
		echo '</form>';
	}
	
	public function renderLabel(FormElement $element) {
		if (!empty($element->label)) {
			echo '<label class="label">'.$element->label.'</label>';
		}
	}
}

class Vertical extends View {
	public function render() {
		echo '<form '.$this->form->getAttributes('').'>';		
			if (!empty($this->form->elements)) {
				$elTeller = 0;
				foreach($this->form->elements as $el) {
					if ($el instanceof InputButton) {
						if ($elTeller > 0) {
							$tmpEl = array_slice($this->form->elements, $elTeller-1, 1, false);
							$tmpEl = array_values($tmpEl)[0]; //reset array keys
							$prevIsButton = $tmpEl instanceof InputButton;
						} else {
							$prevIsButton = FALSE;
						}
						
						if (!$prevIsButton) {
							echo '<div class="formrowVert">';
						}
						$el->render();
					} else {			
						echo '<div class="formrowVert">';
							$this->renderLabel($el);
							echo '<div class="data">';
								$el->render();
							echo '</div>';
						echo '</div>';
					}
					$elTeller++;
				}
			}		
		echo '</form>';
	}
	
	public function renderLabel(FormElement $element) {
		if (!empty($element->label)) {
			echo '<label class="label">'.$element->label.'</label>';
		}
	}
}

$form = new Form('Vertical', 'form1', array('method' => 'post', 'action' => $_SERVER['PHP_SELF']));

$txtVoornaam = new InputText('voornaam', 'voornaam', array('id' => 'voornaam'));
$form->addElement($txtVoornaam);

$txtNaam = new InputText('naam', 'naam', array('id' => 'naam'));
$form->addElement($txtNaam);

$txtVraag = new TextArea('vraag', 'vraag', array('id' => 'txtVraag'));
$form->addElement($txtVraag);


abstract class OptionElement extends FormElement {
	public $options;
	
	public function __construct($label, $name, $options, $properties) {
		$this->options = $options;
		
		if (substr($name, -2) != '[]') {
			$name .= '[]';			
		}
		
		parent::__construct($label, $name, $properties);	
	}	
}

class Checkbox extends OptionElement {
	public $attributes = array('type' => 'checkbox');
		
	
	public function render() {
		$chkValues = isset($this->attributes['value'])?$this->attributes['value']:null;
		$chkValues = !is_array($chkValues)?array($chkValues):$chkValues;
		
		foreach($this->options as $val => $lbl) {
			$strChk = in_array($val, $chkValues)?' checked="checked"':'';	
			
			echo '<input value="'.$val.'" name="'.$this->name.'" '.$strChk.' '.$this->getAttributes(array('name',  'value', 'checked')).' />'.$lbl;
			echo '<br />';
		}
	}
}

class Radio extends OptionElement {
	public $attributes = array('type' => 'radio');
	
	public function render() {
		$chkValues = isset($this->attributes['value'])?$this->attributes['value']:null;
		$chkValues = !is_array($chkValues)?array($chkValues):$chkValues;
		
		foreach($this->options as $val => $lbl) {
			$strChk = in_array($val, $chkValues)?' checked="checked"':'';	
			
			echo '<input value="'.$val.'" name="'.$this->name.'" '.$strChk.' '.$this->getAttributes(array('name',  'value', 'checked')).' />'.$lbl;
			echo '<br />';
		}
	}
}

$chk = new Checkbox('groepen', 'groepen', array('3' => 'waarde1', '5' => 'waarde2'), array('class' => 'testje'));
$form->addElement($chk);

$radio = new Radio('personen', 'personen', array('6' => 'waarde6e', '7' => 'waarde7'), array('class' => 'testje'));
$form->addElement($radio);

$submit = new InputButton('opslaan', 'toevoegen', 'submit', array());
$form->addElement($submit);

$edit = new InputButton('reset', 'reset', 'submit', array('class' => 'jsDelete'));
$form->addElement($edit);

/*
$edit = new InputButton('verwijderen', 'delete', 'button', array('class' => 'jsDelete'));
$form->addElement($edit);

$edit = new InputButton('wijzigen', 'edit', 'button', array('class' => 'jsDelete'));
$form->addElement($edit);

$txtStraat = new InputText('straat', 'form1[straat]', array('id' => 'straat'));
$form->addElement($txtStraat);

$edit = new InputButton('wijzigen', 'edit', 'button', array('class' => 'jsDelete'));
$form->addElement($edit);

$edit = new InputButton('wijzigen', 'edit', 'button', array('class' => 'jsDelete'));
$form->addElement($edit);
*/


if (!isset($_SESSION['form1'])) {
	$form->populate(array('naam' => 'test"ea', 'groepen' => array(5)));
}

if (isset($_POST['toevoegen'])) {
	$errors = $form->validate();
	if (empty($errors)) {
		header('Location:'.$_SERVER['PHP_SELF']);
		exit;
	} 
	pr($errors);
} elseif (isset($_POST['reset'])) {
	if (isset($_SESSION['form1'])) unset($_SESSION['form1']);
	header('Location:'.$_SERVER['PHP_SELF']);
	exit;
}

$form->render();
ob_end_flush();
?>