export const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const getExpenseOfMonth = (month, year, transactions) => {
    month = ('0' + month).slice(-2);
    year = year.toString();
    const monthTransactionsExpense = transactions.filter((tx) => {
        const [txDay, txMonth, txYear] = tx.date.split('/');
        return txMonth === month && txYear === year && tx.type === 'expense';
    });

    const expenseAmount = monthTransactionsExpense.reduce((prev, cur) => prev + cur.amount, 0);

    return Math.round(expenseAmount);
};

export const getIncomeOfMonth = (month, year, transactions) => {
    month = ('0' + month).slice(-2);
    year = year.toString();
    const monthTransactionsIncome = transactions.filter((tx) => {
        const [txDay, txMonth, txYear] = tx.date.split('/');
        return txMonth === month && txYear === year && tx.type === 'income';
    });

    const incomeAmount = monthTransactionsIncome.reduce((prev, cur) => prev + cur.amount, 0);

    return Math.round(incomeAmount);
};

export const getCashFlowOfMonth = (month, year, transactions) => {
    return getIncomeOfMonth(month, year, transactions) - getExpenseOfMonth(month, year, transactions);
};
