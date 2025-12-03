// Tip Calculator logic
const billEl = document.getElementById('bill');
const tipBtns = Array.from(document.querySelectorAll('.tip-btn'));
const customTipEl = document.getElementById('custom-tip');
const peopleEl = document.getElementById('people');
const tipPerPersonEl = document.getElementById('tip-per-person');
const totalPerPersonEl = document.getElementById('total-per-person');
const resetBtn = document.getElementById('reset');
const peopleErrorEl = document.getElementById('people-error');

let state = {
	bill: 0,
	tipPercent: 0,
	people: 1
};

function formatMoney(value){
	return '$' + value.toFixed(2);
}

function validatePeople(){
	if (!state.people || state.people < 1) {
		peopleErrorEl.textContent = 'Can\'t be zero';
		return false;
	}
	peopleErrorEl.textContent = '';
	return true;
}

function calculate(){
	if (!validatePeople()) {
		tipPerPersonEl.textContent = formatMoney(0);
		totalPerPersonEl.textContent = formatMoney(0);
		return;
	}

	const tipAmount = state.bill * (state.tipPercent / 100);
	const tipPerPerson = tipAmount / state.people || 0;
	const totalPerPerson = (state.bill / state.people) + tipPerPerson || 0;

	tipPerPersonEl.textContent = formatMoney(tipPerPerson);
	totalPerPersonEl.textContent = formatMoney(totalPerPerson);

	updateResetState();
}

function updateResetState(){
	const isDefault = state.bill === 0 && state.tipPercent === 0 && (state.people === 1 || !state.people);
	resetBtn.disabled = isDefault;
}

// input handlers
billEl.addEventListener('input', e => {
	const v = parseFloat(e.target.value);
	state.bill = isFinite(v) ? v : 0;
	calculate();
});

peopleEl.addEventListener('input', e => {
	const v = parseInt(e.target.value, 10);
	state.people = isFinite(v) ? v : 0;
	calculate();
});

// tip buttons
tipBtns.forEach(btn => {
	btn.addEventListener('click', () => {
		tipBtns.forEach(b=>b.classList.remove('active'));
		btn.classList.add('active');
		customTipEl.value = '';
		state.tipPercent = parseFloat(btn.getAttribute('data-tip')) || 0;
		calculate();
	});
});

customTipEl.addEventListener('input', e => {
	tipBtns.forEach(b=>b.classList.remove('active'));
	const v = parseFloat(e.target.value);
	state.tipPercent = isFinite(v) ? v : 0;
	calculate();
});

resetBtn.addEventListener('click', () => {
	// reset UI and state
	state = { bill:0, tipPercent:0, people:1 };
	billEl.value = '';
	customTipEl.value = '';
	peopleEl.value = '';
	tipBtns.forEach(b=>b.classList.remove('active'));
	calculate();
});

// initial calc
calculate();

