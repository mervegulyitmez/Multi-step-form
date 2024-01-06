// Declare variables and store elements
const sidebarStep = document.querySelectorAll('.indecater__num');
const formStep = document.querySelectorAll('.step');
const form = document.getElementById('form');
const planCards = document.querySelectorAll('.plan__card');
const addsonCards = document.querySelectorAll('.addon__card');
const changePlanBtn = document.getElementById('change-plan');

// Empty object to store selected plan, price, and duration
let selectedPlan = {};

// Function for storing selected add-on plan
const selectedAddsOn = () => {
  // Create an empty array to store plan details
  let addOnArr = [];

  // Loop add-on card to find selected add-on cards
  addsonCards.forEach((card) => {
    // Select plan name, price, and plan duration
    let price = card.querySelector('.sbscription__price').textContent;
    let name = card.querySelector('.card__name').textContent;
    let planDur = card.querySelector('.sbscription__duration').textContent;

    // Push selected cards' details to addOnArr array
    if (card.classList.contains('selected')) {
      addOnArr.push({
        price,
        name,
        planDur,
      });
    }
  });

  // Return addOnArr array
  return addOnArr;
};

// Plan prices
const monthlyPlanPrices = [9, 12, 15];
const yearlyPlanPrices = [90, 120, 150];
const monthlyAdsOnPrice = [1, 2, 2];
const yearlyAdsOnPrice = [10, 20, 20];

// Function to change the price and duration of the given card
const setplan = (card, price, duration) => {
  card.forEach((card, i) => {
    card.querySelector('.sbscription__price').textContent = `${price[i]}`;
    card.querySelector('.sbscription__duration').textContent = `${duration}`;
  });
};

// Set default price and duration of the cards
setplan(planCards, monthlyPlanPrices, 'mo');
setplan(addsonCards, monthlyAdsOnPrice, 'mo');

// BUTTONS
const nextBtn = document.getElementById('next-button');
const prevBtn = document.getElementById('prev-button');

// Step number
let stepNum = 0;

// Function for showing warning text when a plan is not selected and the next button is pressed
const selectPlanError = (text) => {
  document.getElementById('select-plan-error').textContent = text;
};

// Handle next step button
nextBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (stepNum === 0) {
    // Form validation
    if (!formValidation()) return;
    stepNum++;
    showStep(stepNum);
  } else if (stepNum === 1) {
    // Show warning if the plan is not selected
    if (Object.entries(selectedPlan).length === 0) {
      return selectPlanError('Please select a plan');
    }
    stepNum++;
    showStep(stepNum);
  } else if (stepNum === 2) {
    // Render a list of selected plans and add-ons with prices
    renderTotal();
    stepNum++;
    showStep(stepNum);
  } else if (stepNum === 3) {
    stepNum++;
    showStep(stepNum);
  } else return;
});

// Handle previous step button
prevBtn.addEventListener('click', (e) => {
  e.preventDefault();
  stepNum--;
  return showStep(stepNum);
});

// Function for handling steps
const showStep = (x) => {
  // Remove select plan warning
  selectPlanError('');

  // Handle sidebar step
  if (x < sidebarStep.length) {
    // Remove the active class from all sidebar steps
    for (let i = 0; i < sidebarStep.length; i++) {
      sidebarStep[i].classList.remove('active');
    }

    // Add the "active" class to the current sidebar step
    sidebarStep[x].classList.add('active');
  }

  // Handle form step
  if (x < formStep.length) {
    if (x === 0) {
      // Hide the previous button on the first step
      prevBtn.classList.add('hidden');
      prevBtn.setAttribute('disabled', '');
    } else if (x === 4) {
      // Hide buttons
      nextBtn.parentElement.classList.add('hidden');
    } else {
      // Show buttons
      prevBtn.classList.remove('hidden');
      prevBtn.removeAttribute('disabled');
    }

    // Change the next step button inner text to 'confirm' on step 3
    x === 3 ? (nextBtn.textContent = 'Confirm') : (nextBtn.textContent = 'Next step');

    // Remove the "active" class from all steps
    for (let i = 0; i < formStep.length; i++) {
      formStep[i].classList.remove('active');
    }

    // Add the "active" class to the current step
    formStep[x].classList.add('active');
  }
};

// Show the step on the first load
showStep(stepNum);

// STEP-1 | PERSONAL INFO [ FORM-VALIDATION ]

// Function for adding a warning
const showError = (input, warningText) => {
  input.classList.add('error');
  input.parentElement.querySelector('.warning').textContent = warningText;
};

// Function for removing a warning
const hideError = (input) => {
  input.classList.remove('error');
  input.parentElement.querySelector('.warning').textContent = '';
};

// Select all form inputs
const formInput = form.querySelectorAll('input');

// Function for form validation
const formValidation = () => {
  // Check if all inputs are valid using forEach loop
  formInput.forEach((input) => {
    // Username
    if (input.name === 'userName') {
      return input.value.length === 0
        ? showError(input, 'Enter your name')
        : hideError(input);
    }

    // Email
    if (input.name === 'email') {
      // Verify email input value using regex
      const emailRegExp = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
      return input.value.length === 0
        ? showError(input, 'Enter email')
        : !emailRegExp.test(input.value)
        ? showError(input, 'Enter a valid email')
        : hideError(input);
    }

    // Phone number
    if (input.name === 'phone') {
      return input.value.length === 0
        ? showError(input, 'Enter your mobile number')
        : hideError(input);
    }
  });

  // Return form validity
  return form.checkValidity();
};

// STEP-2 | SELECT PLAN & TOGGLE BUTTON
const toggle = document.getElementById('toggle');
const yearlyBenefit = document.querySelectorAll('.yearly__benefit');
const month = document.getElementById('monthly');
const year = document.getElementById('yearly');

// Toggle button for changing plan duration yearly or monthly
toggle.addEventListener('click', (e) => {
  selectPlanError('');
  // Select toggle container
  const toggle = e.target.parentElement;

  // Remove the selected class from all plan cards
  planCards.forEach((card) => card.classList.remove('selected'));

  // Make the selectedPlan object empty
  selectedPlan = {};

  // Add the active class to the toggle
  toggle.classList.toggle('active');

  // If toggle is active [ yearly ] else [ monthly ]
  if (toggle.classList.contains('active')) {
    yearlyBenefit.forEach((item) => item.classList.add('show'));
    setplan(planCards, yearlyPlanPrices, 'yr');
    setplan(addsonCards, yearlyAdsOnPrice, 'yr');
    year.classList.add('selected__plan');
    month.classList.remove('selected__plan');
  } else {
    setplan(planCards, monthlyPlanPrices, 'mo');
    setplan(addsonCards, monthlyAdsOnPrice, 'mo');
    yearlyBenefit.forEach((item) => item.classList.remove('show'));
    month.classList.add('selected__plan');
    year.classList.remove('selected__plan');
  }
});

// Select plan card
planCards.forEach((card) => {
  card.addEventListener('click', (e) => {
    selectPlanError('');
    let target = e.currentTarget;

    // Remove the selected class from all cards
    planCards.forEach((card) => card.classList.remove('selected'));

    // Add the selected class to the current card
    target.classList.add('selected');

    // Store selected plan name, price, and duration
    let planName = target.querySelector('.card__name').textContent;
    let planPrice = target.querySelector('.sbscription__price').textContent;
    let planDur = target.querySelector('.sbscription__duration').textContent;

    // Add selected plan details to the selectedPlan object
    return (selectedPlan = { planName, planPrice, planDur });
  });
});

// STEP3 | ADD-ON
addsonCards.forEach((card) => {
  // Add event listener to the add-on cards
  card.addEventListener('click', (e) => {
    let target = e.currentTarget;
    let checkbox = target.querySelector('.checkbox');

    // Add selected class to the card
    target.classList.toggle('selected');

    // Checked box checked if the box is selected
    if (target.classList.contains('selected')) {
      return (checkbox.checked = true);
    } else {
      return (checkbox.checked = false);
    }
  });
});

// STEP-4 | FINISHING UP

// Render selected plan, selected add-on, and total amount
const renderTotal = () => {
  // Total amount to store the total amount
  let totalAmount = 0;

  // Plan duration in full-form [mo to monthly or yr to yearly]
  const planDuration = selectedPlan.planDur === 'mo' ? 'Monthly' : 'Yearly';

  // Selected elements to append selected plan, add-on, and total price
  const plan = document.getElementById('selected-plan');
  const addsOnList = document.getElementById('selected-addon');
  const total = document.getElementById('total');

  // Clear innerHTML of the selected elements
  total.innerHTML = '';
  addsOnList.innerHTML = '';
  plan.innerHTML = '';

  // Add selected plan
  let planName = document.createElement('p');
  planName.textContent = selectedPlan.planName;

  let dur = document.createElement('p');
  dur.textContent = `(${planDuration})`;

  let planPrice = document.createElement('p');
  planPrice.textContent = `$${selectedPlan.planPrice}/${selectedPlan.planDur}`;

  // Append selected plan to the plan
  plan.appendChild(planName);
  plan.appendChild(dur);
  plan.appendChild(planPrice);

  // Add selected plan price to the total amount
  totalAmount += parseInt(selectedPlan.planPrice);

  // Add selected add-on to addsOnList
  selectedAddsOn().forEach((item) => {
    // Create listItem to store selected add-on details
    let listItem = document.createElement('li');

    // AddOnName to store add-on title
    let addOnName = document.createElement('p');
    addOnName.textContent = item.name;

    // AddOnprice for add-on price and plan duration
    let addOnprice = document.createElement('p');
    addOnprice.textContent = `+$${item.price}/${item.planDur}`;

    // Append  AddOnName and AddOnprice to the listItem
    listItem.appendChild(addOnName);
    listItem.appendChild(addOnprice);

    // Add list item to the addsOnList
    addsOnList.appendChild(listItem);

    // Add price to the total price
    totalAmount += parseInt(item.price);
  });

  // Inner HTML for total
  total.innerHTML = `<span>Total(
    per ${planDuration.slice(0, -2).toLocaleLowerCase()}) </span> 
      <span> $${totalAmount}/${selectedPlan.planDur}</span>`;
};

// Function to handle change button
changePlanBtn.addEventListener('click', () => {
  // Reassign stepNum to 0
  stepNum = 0;

  // Show stepNum
  showStep(stepNum);
});
