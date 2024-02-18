"use strict";

import { IForm, IResult } from "./interface.js";

// Find DOM element once rather than finding each time on use.
const calcForm: HTMLFormElement = document.querySelector("#calc-form")!;
const amountInput: HTMLInputElement = document.querySelector("#loan-amount")!;
const yearsInput: HTMLInputElement = document.querySelector("#loan-years")!;
const rateInput: HTMLInputElement = document.querySelector("#loan-rate")!;
const resultArea: HTMLSpanElement = document.querySelector("#calc-monthly-payment")!;

const resultHistory: IResult[] = [];

/** Retrieve form values.
 *
 * Example output: an object like {"amount": 10000, "years": 10, "rate": 4.5}.
 *
 * */

function getFormValues(): IForm {
  return {
    amount: Number(amountInput.value),
    years: Number(yearsInput.value),
    rate: Number(rateInput.value),
  };
}

/** Calculate monthly payment and return. */

function calcMonthlyPayment({ amount, years, rate }: IForm ): number {
  const monthsInYear = 12;
  const monthlyRate = (rate / 100) / monthsInYear;
  const n = Math.floor(years * monthsInYear);
  return (
    (monthlyRate * amount) /
    (1 - Math.pow((1 + monthlyRate), -n))
  );
}

/** Get form values, calculate, format to 2 decimal places, and display. */

function getFormValuesAndDisplayResults(): void {
  const { amount, years, rate } = getFormValues();
  const payment: number = calcMonthlyPayment({ amount, years, rate });
  resultHistory.push({ amount, years, rate, payment });
  resultArea.innerText = "$" + payment.toFixed(2);
}

/** Set initial form values and show initial results. Called at app start. */

function setInitialValues(): void {
  amountInput.value = "10000";
  yearsInput.value = "10";
  rateInput.value = "4.5";
  getFormValuesAndDisplayResults();
}

/** Start: set form defaults & display; attach form submit event listener. */

function start(): void {
  setInitialValues();

  calcForm.addEventListener("submit", function (evt: SubmitEvent) {
    evt.preventDefault();
    getFormValuesAndDisplayResults();
  });
}

start();
