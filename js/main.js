const timeslots = [
	{
		"time": "7:00 AM",
		"available": "true",
		"day_part": "Morning"
	},
	{
		"time": "8:00 AM",
		"available": "true",
		"day_part": "Morning"
	},
	{
		"time": "9:00 AM",
		"available": "false",
		"day_part": "Morning"
	},
	{
		"time": "10:00 AM",
		"available": "true",
		"day_part": "Morning"
	},
	{
		"time": "11:00 AM",
		"available": "true",
		"day_part": "Morning"
	},
	{
		"time": "12:00 PM",
		"available": "true",
		"day_part": "Afternoon"
	},
	{
		"time": "1:00 PM",
		"available": "true",
		"day_part": "Afternoon"
	},
	{
		"time": "2:00 PM",
		"available": "true",
		"day_part": "Afternoon"
	},
	{
		"time": "3:00 PM",
		"available": "true",
		"day_part": "Afternoon"
	},
	{
		"time": "4:00 PM",
		"available": "true",
		"day_part": "Afternoon"
	},
	{
		"time": "5:00 PM",
		"available": "true",
		"day_part": "Evening"
	},
	{
		"time": "6:00 PM",
		"available": "true",
		"day_part": "Evening"
	},
	{
		"time": "7:00 PM",
		"available": "true",
		"day_part": "Evening"
	},
	{
		"time": "8:00 PM",
		"available": "true",
		"day_part": "Evening"
	},
	{
		"time": "9:00 PM",
		"available": "true",
		"day_part": "Evening"
	},
	{
		"time": "10:00 PM",
		"available": "true",
		"day_part": "Night"
	},
	{
		"time": "10:30 PM",
		"available": "true",
		"day_part": "Night"
	},
	{
		"time": "11:00 PM",
		"available": "true",
		"day_part": "Night"
	},
	{
		"time": "11:30 PM",
		"available": "true",
		"day_part": "Night"
	},
	{
		"time": "12:00 AM",
		"available": "true",
		"day_part": "Night"
	},
];

const timeslot = function(currentDay) {
	let dayParts = Array.from(new Set(timeslots.map((slot) => slot.day_part)));
	let dayPartsArr = [];

	dayParts.forEach((dayPart) => {
		let arr = [];
		timeslots.forEach((slot) => (slot.day_part === dayPart) && arr.push(slot));
		dayPartsArr.push(arr);
	});

	function times(slots) {
		return slots.map((slot) => {
			return `
				<button class="datepicker-timeslot__column-time ${slot.available == 'false' ? 'disabled' : '' }">${slot.time}</button>
			`;
		}).join(' ');
	}

	function columns() {
		return dayPartsArr.map((column) => {
			return `
				<div class="datepicker-timeslot__column">
		          <div class="datepicker-timeslot__column-name">${column[0].day_part}</div>
		          <div class="datepicker-timeslot__column-times">
		            ${times(column)}
		          </div>
		        </div>
			`;
		}).join(' ');
	}
	let html = `
		<div class="datepicker-timeslot">
	      <div class="datepicker-timeslot__days">
	        <button class="datepicker-timeslot__day-prev">Previous</button>
	        <button class="datepicker-timeslot__day">${currentDay}</button>
	        <button class="datepicker-timeslot__day-next">Next</button>
	      </div>
	      <div class="datepicker-timeslot__slots">
	        ${columns()}
	      </div>
	    </div>
	`;

	return html;
};

const datepicker = $('.datepicker-2');
datepicker.datepicker({
	onSelect: renderTimeslot,
	showOtherMonths: true,
	selectOtherMonths: true,
});

function convertDate(date) {
	return moment(date, 'MM-DD-YYYY').format('MMMM, D');
}

function renderTimeslot(date) {
	$('#timeslot').html(timeslot(convertDate(date)));
}

function prevDateClick() {
	let date = datepicker.datepicker('getDate');
	date.setTime(date.getTime() - (1000 * 60 * 60 * 24))
	datepicker.datepicker('setDate', date);
	document.getElementsByClassName('ui-datepicker-current-day')[0].click();
}

function nextDateClick() {
	let date = datepicker.datepicker('getDate');
	date.setTime(date.getTime() + (1000 * 60 * 60 * 24))
	datepicker.datepicker('setDate', date);
	document.getElementsByClassName('ui-datepicker-current-day')[0].click();
}

function timeslotPickSlot(el) {
	let time = el.innerText || el.textContent;
	let date = datepicker.datepicker('getDate');
	let actives = document.getElementsByClassName('datepicker-timeslot__column-time active');

	if (!el.classList.contains('disabled')) {
		if (actives.length > 0) {
			actives[0].classList.remove('active');
		}
		el.classList.add('active');
	}
	console.log('Date and time picked:', date, time);
}

function closeTimeslotPickSlot() {
	$('#timeslot').html('');
}

document.addEventListener('click',function(e) {
	let target = e.target;

	if (target && target.classList.contains('datepicker-timeslot__day-prev')) {
		prevDateClick();
	}
	if (target && target.classList.contains('datepicker-timeslot__day-next')) {
		nextDateClick();
	}
	if (target && target.classList.contains('datepicker-timeslot__column-time')) {
		timeslotPickSlot(target);
	}
	if (target && target.classList.contains('datepicker-timeslot__day')) {
		closeTimeslotPickSlot();
	}
});

