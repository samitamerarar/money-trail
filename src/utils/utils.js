import moment from 'moment';

export const getAllShopsNamesForCategory = (category, array) => {
    return array.filter((e) => e.category === category).map((e) => e.name);
};

export const isInArray = (arrayOfNames, expenseName) => {
    return arrayOfNames.some((e) => expenseName.toLowerCase().includes(e.toLowerCase()));
};

// filter by transaction name then return [filtered array, remaining array]
export const filterByShops = (txn, shops) => {
    const filtered = txn.filter((e) => isInArray(shops, e.name));
    return [filtered, txn.filter((e) => !filtered.includes(e))];
};

// filter by transaction category then return [filtered array, remaining array]
export const filterByCategory = (txn, category) => {
    const filtered = txn.filter((e) => e.category.includes(category));
    return [filtered, txn.filter((e) => !filtered.includes(e))];
};

// for a given transactions array, rename category for all transactions
export const renameCategory = (txn, newCategoryName) => {
    return txn.forEach((e) => (e.category = newCategoryName));
};

export const categorizeTransactions = (txn, foodShops, personalSpendingShops, entertainmentShops, transportationShops, healthcareShops) => {
    // Only keep expenses
    //txn = txn.filter((item) => item.amount > 0);

    // Format date
    txn.forEach((e) => (e.date = moment(e.date).format('DD-MM-YYYY')));

    //let [catFood1, rem] = filterByCategory(txn, "Food and Drink");
    let [catFood2, rem2] = filterByShops(txn, foodShops);
    let [catPersonalSpending, rem3] = filterByShops(rem2, personalSpendingShops);
    let [catEntertainment, rem4] = filterByShops(rem3, entertainmentShops);
    let [catTransportation, rem5] = filterByShops(rem4, transportationShops);
    let [catHealthcare, catOther] = filterByShops(rem5, healthcareShops);

    //renameCategory(catFood1, "Food");
    renameCategory(catFood2, 'Food');
    renameCategory(catPersonalSpending, 'Personal Spending');
    renameCategory(catEntertainment, 'Entertainment');
    renameCategory(catTransportation, 'Transportation');
    renameCategory(catHealthcare, 'Healthcare');
    renameCategory(catOther, 'Other');

    return [
        // ...catFood1,
        ...catFood2,
        ...catPersonalSpending,
        ...catEntertainment,
        ...catTransportation,
        ...catHealthcare,
        ...catOther
    ];
};

export const getAveragePerMonth = (txn) => getExpenses(txn, true, false, false);
export const getThisMonthExp = (txn) => getExpenses(txn, false, true, false);
export const getPastMonthExp = (txn) => getExpenses(txn, false, false, true);

const getExpenses = (txn, averagePerMonth, forThisMonth, forPastMonth) => {
    let fTxn = txn.filter((item) => item.category === 'Food');
    let psTxn = txn.filter((item) => item.category === 'Personal Spending');
    let enTxn = txn.filter((item) => item.category === 'Entertainment');
    let trTxn = txn.filter((item) => item.category === 'Transportation');
    let hcTxn = txn.filter((item) => item.category === 'Healthcare');
    let oTxn = txn.filter((item) => item.category === 'Other');

    if (forThisMonth) {
        fTxn = filterOnlyForThisMonth(fTxn);
        psTxn = filterOnlyForThisMonth(psTxn);
        enTxn = filterOnlyForThisMonth(enTxn);
        trTxn = filterOnlyForThisMonth(trTxn);
        hcTxn = filterOnlyForThisMonth(hcTxn);
        oTxn = filterOnlyForThisMonth(oTxn);
    } else if (forPastMonth) {
        fTxn = filterOnlyForPastMonth(fTxn);
        psTxn = filterOnlyForPastMonth(psTxn);
        enTxn = filterOnlyForPastMonth(enTxn);
        trTxn = filterOnlyForPastMonth(trTxn);
        hcTxn = filterOnlyForPastMonth(hcTxn);
        oTxn = filterOnlyForPastMonth(oTxn);
    }

    let m = 1;
    if (averagePerMonth) m = moment().format('M') - 1; // months until now for current year

    let fAmount = (fTxn.reduce((pr, cur) => pr + cur.amount, 0) / m).toFixed(2);
    let psAmount = (psTxn.reduce((pr, cur) => pr + cur.amount, 0) / m).toFixed(2);
    let enAmount = (enTxn.reduce((pr, cur) => pr + cur.amount, 0) / m).toFixed(2);
    let trAmount = (trTxn.reduce((pr, cur) => pr + cur.amount, 0) / m).toFixed(2);
    let hcAmount = (hcTxn.reduce((pr, cur) => pr + cur.amount, 0) / m).toFixed(2);
    let oAmount = (oTxn.reduce((pr, cur) => pr + cur.amount, 0) / m).toFixed(2);

    return [fAmount, psAmount, enAmount, trAmount, hcAmount, oAmount];
};

const filterOnlyForThisMonth = (txn) => txn.filter((item) => moment(item.date, 'DD-MM-YYYY').format('M') === moment().format('M'));
const filterOnlyForPastMonth = (txn) => txn.filter((item) => moment(item.date, 'DD-MM-YYYY').format('M') === moment().subtract(1, 'months').format('M'));
