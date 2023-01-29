const container = document.querySelector(".data-container");

var WaitingTime = 300;//Change the speed of Alogrithim here
var arr = [];	//main array to store the values
var maxArrSize = 20;//Max Size of the array

// function to generate bars, display them, and store the values in arr[]
function generatebars(num = maxArrSize) {

	//for loop to generate 20 bars
	clearArray();
	for (let i = 0; i < num; i += 1) {

		// To generate random values from 1 to 100
		const value = Math.floor(Math.random() * 100) + 1;

		// To create element "div"
		const bar = document.createElement("div");

		// To add class "bar" to "div"
		bar.classList.add("bar");

		// Provide height to the bar
		bar.style.height = `${value * 3}px`;

		// Translate the bar towards positive X axis
		bar.style.transform = `translateX(${i * 30}px)`;

		// To create element "label"
		const barLabel = document.createElement("label");

		// To add class "bar_id" to "label"
		barLabel.classList.add("bar_id");

		// Assign value to "label"
		barLabel.innerHTML = value;

		// Add the value to main array
		arr[arr.length] = value;

		// Append "Label" to "div"
		bar.appendChild(barLabel);

		// Append "div" to "data-container div"
		container.appendChild(bar);
	}
	console.log(arr); //Print the array in console
}

// to delete the bars
function deletebars() {
	container.innerHTML = '';
}

function clearArray() {
	arr = [];
	console.log(arr);
}

//To make use of ENTER key to call ADD button.
var input = document.getElementById("userdefined-input");
input.addEventListener("keypress", 
function(event) {
	if (event.key == "Enter") 
		document.getElementById("AddButton").click();
});

//adjusting the speed of the sorting algorithm

var slider = document.getElementById("sortingSpeed");

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  WaitingTime = Math.floor(50000/this.value); // inversing the value so it works opposite to the slider value
}										// Using a large number to set the appropriate value for speed

//Set Array size thru user

var ArrSize = document.getElementById("Size_Input");
ArrSize.addEventListener("keypress",
function(event) {
	if (event.key == "Enter") {
		if (this.value>=1 && this.value<=30){
			console.log("Max Array Size updated: "+this.value);
			document.getElementById("SizeDisplay").innerHTML="Max Size: "+this.value;	//Updating size of array on screen for user
			maxArrSize = this.value;	//updating the array size
			deletebars();				//regenerating the bars
			generatebars();
			this.value = '';			//reseting the value in input field
		}
		else {
			console.log("Size Invalid");
			displayError("Invalid input: enter a number (1-30)",2000);
		}
	}
});

//for add one by one
function AddValueToArray() {
	if(arr.length >= maxArrSize) {
		console.log("Max size reached");
		displayError("Max Size reached, cannot add more..",1000);
	}
	else {
		var inp = document.getElementById('userdefined-input'); 
		if(Number.isInteger(parseInt(inp.value))) //only add if there is an integer value
			arr[arr.length] = inp.value;
		else {
			console.log("Invalid input");
			displayError("Invalid input",2000);
		}
		inp.focus();	//to move the curser focus on this element
		inp.value = '';	//to clear the input field
		console.log(arr);
		createbars();
	}
}

var error = document.getElementById('error'); //used to display error message

function displayError(text, time) {
	error.textContent = text;
	error.style.color = 'red';
	error.style.fontSize = "15px";		
	window.setTimeout(function () {error.innerHTML=''}, time);	//remove the text after time in miliseconds
}

//for add all together
function Add_Whole_Array() {
	
	var inp = document.getElementById('userdefined-input').value; //get values from input
	arr = inp.split(",");
	if(arr.length > maxArrSize) {
		displayError("Array size exceded, Resizing...",2000);	//display this text and remove it after 2 seconds
	}
	while(arr.length > maxArrSize) {							//validation: to shorten the array to the max size
		console.log("Overflow: Removed "+arr[arr.length-1]+" from list");
		arr.pop();
	}
	createbars();
}


function showSingleButtons() {
	//Enable the buttons for single element insertion / removal
	var AddButton = document.getElementById('AddButton');
	var Removebutton = document.getElementById('RemoveButton');

	AddButton.innerHTML = 'Add';
	Removebutton.innerHTML = 'Remove';

	deletebars();
	clearArray();

	AddButton.onclick = AddValueToArray;
	Removebutton.onclick = removeSingleElement;

	AddButton.disabled = false;
	Removebutton.disabled = false;

	AddButton.style.backgroundColor = '#6f459e';
	Removebutton.style.backgroundColor = '#6f459e';

	//enable the input field

	var input = document.getElementById('userdefined-input');

	input.disabled = false;

	input.style.backgroundColor = "white";

	input.size = 5;

	input.placeholder = "Value";

	// console.log("showSingleButtons was called");
}


function showAllButtons() {
	//Enable the buttons for single element insertion / removal
	var AddButton = document.getElementById('AddButton');
	var Removebutton = document.getElementById('RemoveButton');

	AddButton.innerHTML = 'Create Array';
	Removebutton.innerHTML = 'Clear Array';

	deletebars();
	clearArray();

	AddButton.onclick = Add_Whole_Array;
	Removebutton.onclick = deletebars;

	AddButton.disabled = false;
	Removebutton.disabled = false;

	AddButton.style.backgroundColor = '#6f459e';
	Removebutton.style.backgroundColor = '#6f459e';

	//enable the input field

	var input = document.getElementById('userdefined-input');

	input.disabled = false;

	input.style.backgroundColor = "white";

	input.size = 23;

	input.placeholder = "Values Separated by commas";

	// console.log("showAllButtons was called");
}


function selectoption() {
	var Selection = document.getElementById('Selection').value;
	if (Selection == "one-by-one") showSingleButtons();
	else if (Selection == "all-together") showAllButtons();
}

function removeSingleElement() {
	arr.pop();
	createbars();
	console.log(arr);
	// console.log("removeSingleElement was called");
}

function checkInt() {
	for(var element of arr) {
		if(!Number.isInteger(parseInt(element))){//not an int?
			return false;//false ret ext
		}
    }
	return true;
}


function createbars() {
	
	if(checkInt()) { //checks if the array has only integer elements
		deletebars();
		
		num = arr.length;//array length
		//for loop to generate bars
		for (let i = 0; i < num; i += 1) {
			
			//get a value from array
			const value = arr[i];
			
			// To create element "div"
			const bar = document.createElement("div");
			
			// To add class "bar" to "div"
			bar.classList.add("bar");
			
			// Provide height to the bar
			bar.style.height = `${value * 3}px`;
			
			// Translate the bar towards positive X axis
			bar.style.transform = `translateX(${i * 30}px)`;
			
			//// To further get transform look at this website: https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin
	
			// To create element "label"
			const barLabel = document.createElement("label");
			
			// To add class "bar_id" to "label"
			barLabel.classList.add("bar_id");
			
			// Assign value to "label"
			barLabel.innerHTML = value;
			
			// Append "Label" to "div"
			bar.appendChild(barLabel);
			
			// Append "div" to "data-container div"
			container.appendChild(bar);
		}
		
	}
	else {
		console.log("The entered values are not valid");
		displayError("Invalid Value in list",2000);
		
	}
}

// asynchronous function to perform "Selection Sort"
async function SelectionSort() {
	let bars = document.querySelectorAll(".bar");
	// Assign 0 to min
	var min = 0;
	for (var i = 0; i < bars.length; i += 1) {
		// Assign i to min
		min = i;
		// Provide darkblue color to the ith bar
		bars[i].style.backgroundColor = "skyblue";
		for (var j = i + 1; j < bars.length; j += 1) {

			// Provide red color to the jth bar
			bars[j].style.backgroundColor = "red";

			// To pause the execution of code for 300 milliseconds
			await new Promise((resolve) =>
				setTimeout(() => {
					resolve();
				}, WaitingTime)
			);

			// To store the integer value of jth bar to var1
			var val1 = parseInt(bars[j].childNodes[0].innerHTML);

			// To store the integer value of (min)th bar to var2
			var val2 = parseInt(bars[min].childNodes[0].innerHTML);

			// Compare val1 & val2
			if (val1 < val2) {//if j is less than current min
				if (min !== i) {
					// Provide skyblue color to the (min-idx)th bar
					bars[min].style.backgroundColor = " rgb(24, 190, 255)";
				}
				min = j;
			} else {
				// Provide skyblue color to the jth bar
				bars[j].style.backgroundColor = " rgb(24, 190, 255)";
			}
		}

		// To swap ith and (min)th bar
		var temp1 = bars[min].style.height;
		var temp2 = bars[min].childNodes[0].innerText;
		bars[min].style.height = bars[i].style.height;
		bars[i].style.height = temp1;
		bars[min].childNodes[0].innerText = bars[i].childNodes[0].innerText;
		bars[i].childNodes[0].innerText = temp2;

		// To pause the execution of code for 300 milliseconds
		await new Promise((resolve) =>
			setTimeout(() => {
				resolve();
			}, WaitingTime)
		);

		// Provide skyblue color to the (min-idx)th bar
		bars[min].style.backgroundColor = " rgb(24, 190, 255)";

		// Provide lightgreen color to the ith bar
		bars[i].style.backgroundColor = " rgb(49, 226, 13)";
	}

	enable();		//Enable the buttons
}

// bubble sort
async function BubbleSort() {
	let bars = document.querySelectorAll(".bar");

	var swapMade = true;

	for (var i = 0; (i < bars.length - 1) && (swapMade); i += 1) {

		swapMade = false;
		for(var j = 0; j < bars.length - 1; j += 1) {

			// Provide red color to the jth and j+1 th bar as they are being compared
			bars[j].style.backgroundColor = "red";
			bars[j + 1].style.backgroundColor = "red";

			// To pause the execution of code for 300 milliseconds
			await new Promise((resolve) =>
				setTimeout(() => {
					resolve();
				}, WaitingTime)
			);

			// To store the integer value of jth bar to var1
			var val1 = parseInt(bars[j].childNodes[0].innerHTML);

			// To store the integer value of (min)th bar to var2
			var val2 = parseInt(bars[j + 1].childNodes[0].innerHTML);

			if (val1 > val2) { // need to swap
				// To swap jth and (j+1)th bar
				swapMade = true;
				var temp1 = bars[j].style.height;
				var temp2 = bars[j].childNodes[0].innerText;
				bars[j].style.height = bars[j + 1].style.height;
				bars[j + 1].style.height = temp1;
				bars[j].childNodes[0].innerText = bars[j + 1].childNodes[0].innerText;
				bars[j + 1].childNodes[0].innerText = temp2;
			}

			//return to skyblue after checking
			bars[j].style.backgroundColor = "rgb(24, 190, 255)";

		}


		// To pause the execution of code for 300 milliseconds
		await new Promise((resolve) =>
			setTimeout(() => {
				resolve();
			}, WaitingTime)
		);

		// Provide skyblue color to the last bar
		bars[bars.length - 1].style.backgroundColor = "rgb(24, 190, 255)";

	}

	bars.forEach(function(bar) {
		bar.style.backgroundColor = "rgb(49, 226, 13)";//	set all bars to green
	});

	enable();		// Enable the buttons
}

async function InsertionSort() {
	let bars = document.querySelectorAll(".bar");


	for (var i = 0; (i < bars.length - 1); i++) {
		var j = i + 1;

		var val1, val2;
		val1 = parseInt(bars[j].childNodes[0].innerHTML);
		val2 = parseInt(bars[j - 1].childNodes[0].innerHTML);

		while (true) {

			val1 = parseInt(bars[j].childNodes[0].innerHTML);
			val2 = parseInt(bars[j - 1].childNodes[0].innerHTML);

			//set color of element that will go to its correct spot
			bars[j - 1].style.backgroundColor = "red";
			//set color of comparision element
			bars[j].style.backgroundColor = "red";

			if (val1 < val2) {	//if the element is in the incorrect spot
				//swap j and j-1
				var temp1 = bars[j].style.height;
				var temp2 = bars[j].childNodes[0].innerText;
				bars[j].style.height = bars[j - 1].style.height;
				bars[j - 1].style.height = temp1;
				bars[j].childNodes[0].innerText = bars[j - 1].childNodes[0].innerText;
				bars[j - 1].childNodes[0].innerText = temp2;

			}
			//delay so it looks noice
			await new Promise((resolve) =>
				setTimeout(() => {
					resolve();
				}, WaitingTime)
			);
			//set color to green
			bars[j].style.backgroundColor = "rgb(49, 226, 13)";
			bars[j - 1].style.backgroundColor = "rgb(49, 226, 13)";
			j--;

			if (!(j > 0 && val1 < val2)) {
				break;
			}
		}

		// To pause the execution of code for 300 milliseconds
		await new Promise((resolve) =>
			setTimeout(() => {
				resolve();
			}, WaitingTime)
		);


	}

	enable();
}


// Create a random array when the site loads
generatebars();

function generate() {
	deletebars();
	generatebars();
}

// function to disable the button
function disable() {
	// To disable the buttons while sort is being executed
	let button = document.querySelectorAll("[id = 'Button1']")
	
	for (var i = 0; i < button.length; i++) {
		button[i].disabled = true;
        button[i].style.backgroundColor = "#d8b6ff";
    }

	document.getElementById("AddButton").disabled = true;
	document.getElementById("AddButton").style.backgroundColor = "#d8b6ff";

	document.getElementById("RemoveButton").disabled = true;
	document.getElementById("RemoveButton").style.backgroundColor = "#d8b6ff";

	document.getElementById("userdefined-input").disabled = true;
	document.getElementById("userdefined-input").style.backgroundColor = "#b0afaf9c";

	document.getElementById("Selection").disabled = true;

	document.getElementById("SetArrSize").hidden = true;
}

function enable() {
	// To enable the buttons after sort has been executed
	let button = document.querySelectorAll("[id = 'Button1']")
	
	for (var i = 0; i < button.length; i++) {
		button[i].disabled = false;
        button[i].style.backgroundColor = "#6f459e";
	}
	document.getElementById("Selection").disabled = false;

	if (document.getElementById("Selection").value != "unselected") {
		
		document.getElementById("AddButton").disabled = false;
		document.getElementById("AddButton").style.backgroundColor = "#6f459e";
	
		document.getElementById("RemoveButton").disabled = false;
		document.getElementById("RemoveButton").style.backgroundColor = "#6f459e";
	
		document.getElementById("userdefined-input").disabled = false;
		document.getElementById("userdefined-input").style.backgroundColor = "white";

	}

	document.getElementById("SetArrSize").hidden = false;


}

