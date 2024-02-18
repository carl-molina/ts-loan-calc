"use strict";

interface IForm {
  amount: number,
  years: number,
  rate: number,
}

interface IResult extends IForm {
  payment: number,
}

export type { IForm, IResult };
