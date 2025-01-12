export const categories = [
    { id: 0, type: 'Want' },
    { id: 1, type: 'Need' },
    { id: 2, type: 'Savings' },
    { id: 3, type: 'Debt Payment' },
    { id: 4, type: 'Income' },
    { id: 5, type: 'pTransaction' },
    { id: 6, type: 'pIncome' },
    { id: 7, type: 'Recurring' },
    { id: 8, type: 'Debt' },
];

export const transactionCategories = [
    { id: 0, type: 'Want' },
    { id: 1, type: 'Need' },
    { id: 2, type: 'Savings' },
    { id: 3, type: 'Debt Payment' },
    { id: 4, type: 'Income' },
    { id: 5, type: 'Interest' },
];

export const months = [
    { id: 0, month: 'January', abb: 'Jan' },
    { id: 1, month: 'February', abb: 'Feb' },
    { id: 2, month: 'March', abb: 'Mar' },
    { id: 3, month: 'April', abb: 'Apr' },
    { id: 4, month: 'May', abb: 'May' },
    { id: 5, month: 'June', abb: 'Jun' },
    { id: 6, month: 'July', abb: 'Jul' },
    { id: 7, month: 'August', abb: 'Aug' },
    { id: 8, month: 'September', abb: 'Sep' },
    { id: 9, month: 'October', abb: 'Oct' },
    { id: 10, month: 'November', abb: 'Nov' },
    { id: 11, month: 'December', abb: 'Dec' },
];

export const occurrenceTypes = [
    { id: 0, type: 'Day' },
    { id: 1, type: 'End of month' },
];

export const accountTypes = [
    { id: 0, type: 'Checking' },
    { id: 1, type: 'Savings' },
    { id: 2, type: 'Credit' },
]

export const labels = {
    // Application name
    websiteName: 'Pocket Change',

    // Authentication page
    email: 'Email',
    enterEmail: 'Enter an email',
    password: 'Password',
    login: 'Login',
    createAccount: 'Create Account',
    signUp: 'Sign Up',
    forgotPassword: 'Forgot password',

    // Navigation
    home: 'Home',
    monthOverview: 'Month Overview',
    about: 'About',
    account: 'Account',
    logout: 'Logout',

    // Home page
    bestNet: 'Best Net',
    net: 'Net',
    worstNet: 'Worst Net',
    year: 'Year',

    // Line graph
    incomeSeriesName: 'Income',
    spentSeriesName: 'Spent',
    netSeriesName: 'Net',
    noDataText: 'No data to display.',

    // Add Transaction page
    transactionAccount: 'Account : ',
    transactionType: 'Type :',
    transactionSubtype: 'Subtype :',
    transactionOccurrence: 'Occurence :',
    transactionDate: 'Date :',
    transactionTransaction: 'Transaction :',
    transactionAmount: 'Amount :',

    // Add Debt page
    debt: 'Debt',
    debtPurchasesTitle: 'Debt',
    addDebtPurchaseBtnLabel: 'Add Debt',
    debtPurchasesHeaders: [
        'Name',
        'Date',
        'Amount',
    ],

    // Month Overview
    month: 'Month',
    addTransactionTitle: 'Add Transaction',
    addTransactionBtnLabel: 'Add transaction',
    potentialNet: 'Potential Net',
    projectedNet: 'Projected Net',
    name: 'Name',
    ratioHeaders: [
        'Type',
        'Available',
        'Remaining'
    ],
    transactionHeaders: [
        'Account',
        'Type',
        'Name',
        'Amount',
        'Date',
    ],

    // Statistics
    statistics: 'Statistics',
    lifetimeNet: 'Lifetime Net',
    topWantVisits: 'Top Wants by Visits',
    topWantVisitsHeaders: [
        '#',
        'Name',
        'Times Visited'
    ],
    topWantAmounts: 'Top Wants by Amount',
    topWantAmountsHeaders: [
        '#',
        'Name',
        'Amount Spent'
    ],
    lifetimeTypes: 'Lifetime Transaction Types',

    // About
    howTo: 'How To',
    aboutDeveloper: 'About Developer',
    definitions: 'Definitions',

    fiftyThirtyTwentyTitle: '50/30/20:',
    fiftyThirtyTwentyDefinition: 'A budgeting rule that divides your monthly income into three categories, spending 50% on needs, 30% on wants, and 20% on savings and/or debt reduction.',
    zeroBasedTitle: 'Zero-Based:',
    zeroBasedDefinition: 'A budgeting rule where you subtract expenses from your monthly income until you have a remainder that goes to fund whatever is most pressing that month.',
    netBasedTitle: 'Net-Based:',
    netBasedDefinition: 'A budgeting rule based off of Zero-Based where you subtract expenses from your monthly income. The goal is to spend less than the monthly income to achieve positive net income.',
    netTitle: 'Net:',
    netDefinition: 'The amount of money available in the corresponding month based off of income and transactions.',
    netEquation: 'Net = Income - Transactions',
    potentialNetTitle: 'Potential Net:',
    potentialNetDefinition: 'The amount of money available in the corresponding month based off of net after potential transactions are factored.',
    potentialNetEquation: 'Potential Net = Net - Potential Transactions',
    projectedIncomeTitle: 'Projected Income:',
    projectedIncomeDefinition: 'The amount of money expected to be earned during the month.',
    projectedNetTitle: 'Projected Net:',
    projectedNetDefinition: 'The amount of money available in the corresponding month based off of potential net after projected income is added.',
    projectedNetEquation: 'Projected Net = Potential Net + Projected Income',
    wantTitle: 'Want:',
    wantDefinition: 'Transactions that are not crucial.',
    wantExamples: 'Examples: movies, fast food, snacks, etc',
    needTitle: 'Need:',
    needDefinition: 'Transactions that are necessary for daily life.',
    needExamples: 'Examples: bills, groceries, gas, etc',
    savingsTitle: 'Savings:',
    savingsDefinition: 'Money set aside to not be spent.',
    savingsExamples: 'Example: transfer from debit account to savings account.',
    debtTitle: 'Debt:',
    debtDefinition: 'Money put towards paying off a debt.',
    debtExamples: 'Examples: credit cards, loans, etc',
    incomeTitle: 'Income:',
    incomeDefinition: 'Money received from any medium.',
    incomeExamples: 'Examples: paycheck, zelle, etc',
    pTransactionsTitle: 'pTransaction:',
    pTransactionsDefinition: 'Potential transactions that have not happened yet that are of any type, besides income.',
    pIncomeTitle: 'pIncome:',
    pIncomeDefinition: 'Potential incomes that have not happened yet.',
    devJose: 'Jose Mendoza',
    bio: 'I graduated from the University of Texas at Arlington in 2021 with a bachelor\'s degree in software engineering. Since then, I\'ve been trying to get experience by creating my own little projects, like this one. I\'m interested in creating things, whether that\'s by coding, 3D printing, or tinkering with tools. Besides coding, my hobbies include gaming, stargazing, and fishing.',

    // Account
    accountAccount: 'Account : ',
    accountType: 'Type :',
    accountDate: 'Date :',
    accountAmount: 'Amount :',
    changePassword: 'Change Password',
    recurringTransactionsTitle: 'Recurring transactions',
    addRecurringTransactionBtnLabel: 'Add recurring transaction',
    recurringTransactionsHeaders: [
        'Type',
        'Occurrence',
        'Day',
        'Name',
        'Amount'
    ],
    deleteData: 'Delete data',
    addAccountTitle: 'Add Account',
    addAccountButtonLabel: 'Add account',
    accountTableHeader: 'Accounts',
    accountsHeaders: [
        'Account',
        'Type',
        'Initial Balance',
        'Date',
    ],

    // Not found page
    notLoggedIn: 'Looks like you are not logged in!',
    notExist: 'Looks like you are looking for something that does not exist!',
    existingPlace: 'Existing place...',

    // Version history
    versionHistory: 'Version History',

    // Bar chart
    noData: 'No data to display.',

    // Modal
    updateTransaction: 'Update Transaction',

    apply: 'Apply',
    error: 'Error!',
    submit: 'Submit',
    top: 'Top',
};