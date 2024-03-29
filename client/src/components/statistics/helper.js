export const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const monthNamesShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// for Cash Flow
export const getExpenseOfMonth = (month, year, transactions) => {
    let expenseAmount = 0;
    if (transactions) {
        month = ('0' + month).slice(-2);
        year = year.toString();
        const monthTransactionsExpense = transactions.filter((tx) => {
            const [txDay, txMonth, txYear] = tx.date.split('/'); // eslint-disable-line
            return txMonth === month && txYear === year && tx.type === 'expense';
        });

        expenseAmount = monthTransactionsExpense.reduce((prev, cur) => prev + cur.amount, 0);
    }
    return Math.round(expenseAmount);
};

export const getIncomeOfMonth = (month, year, transactions) => {
    let incomeAmount = 0;
    if (transactions) {
        month = ('0' + month).slice(-2);
        year = year.toString();
        const monthTransactionsIncome = transactions.filter((tx) => {
            const [txDay, txMonth, txYear] = tx.date.split('/'); // eslint-disable-line
            return txMonth === month && txYear === year && tx.type === 'income';
        });

        incomeAmount = monthTransactionsIncome.reduce((prev, cur) => prev + cur.amount, 0);
    }
    return Math.round(incomeAmount);
};

export const getCashFlowOfMonth = (month, year, transactions) => {
    return getIncomeOfMonth(month, year, transactions) - getExpenseOfMonth(month, year, transactions);
};

// for Spending Categories
export const getExpenseOfMonthCategory = (month, year, category, transactions) => {
    let expenseAmount = 0;
    if (transactions) {
        month = ('0' + month).slice(-2);
        year = year.toString();
        const monthTransactionsExpense = transactions.filter((tx) => {
            const [txDay, txMonth, txYear] = tx.date.split('/'); // eslint-disable-line
            return txMonth === month && txYear === year && tx.type === 'expense' && tx.category === category;
        });

        expenseAmount = monthTransactionsExpense.reduce((prev, cur) => prev + cur.amount, 0);
    }
    return Math.round(expenseAmount);
};
