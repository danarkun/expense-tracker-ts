import React, { FC, useContext } from 'react';
import { TransactionsState } from '../types/types';

interface IncomeExpensesProps {
    transactions: TransactionsState;
}

export const IncomeExpenses:FC<IncomeExpensesProps> = (props) => {
    const expenses = CalculateExpsenses(props.transactions);
    const income = CalculateIncome(props.transactions);

    return (
        <div className="inc-exp-container">
            <div>
                <h4>Income</h4>
                <p id="money-plus" className="money plus">+${income}</p>
            </div>
            <div>
                <h4>Expense</h4>
                <p id="money-minus" className="money minus">-${expenses}</p>
            </div>
        </div>
    )
}

function CalculateIncome(transactions: TransactionsState) {
    const amounts: number[] = transactions.transactions.map(transaction => transaction.amount > 0 ? transaction.amount : 0);
    const total: string = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    return total;
}

function CalculateExpsenses(transactions: TransactionsState) {
    const amounts: number[] = transactions.transactions.map(transaction => transaction.amount < 0 ? transaction.amount : 0);
    const total: number = Math.abs(parseInt(amounts.reduce((acc, item) => (acc += item), 0).toFixed(2)));
    return total;
}
