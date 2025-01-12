const versionHistory = [
    {
        id: 0,
        version: 1.0,
        title: 'Release v1',
        info: [
            {
                id: 0,
                title: 'Created the base budgeting app.',
                info: 'Initial release',
                link: 'https://github.com/jxm8022/Net_Budget/issues/16'
            }
        ]
    },
    {
        id: 1,
        version: 1.1,
        title: 'Release v1.1',
        info: [
            {
                id: 0,
                title: 'Fixed bug: Dates are not sorted after update',
                info: 'Fixed bug where when updating a transaction does not sort the transaction table leaving earlier dates after later dates.',
                link: 'https://github.com/jxm8022/Net_Budget/issues/26'
            },
            {
                id: 1,
                title: 'Code fix: Refactored reducer to use utility function',
                info: 'Edited the code to update adding a transaction to use a function used to find the amount of nets. It makes the code readable.',
                link: 'https://github.com/jxm8022/Net_Budget/issues/18'
            }
        ]
    },
    {
        id: 2,
        version: 1.2,
        title: 'Release v1.2',
        info: [
            {
                id: 0,
                title: 'Added feature: about page',
                info: 'Added a new page to the website, the about page. The page shows more information of the website and includes a developer portion at the bottom.',
                link: 'https://github.com/jxm8022/Net_Budget/issues/25'
            },
            {
                id: 1,
                title: 'Added feature: pie chart',
                info: 'Added a new chart, the pie chart. In month overview, the user can now see the percentages of needs, wants, and savings/debts. It can be toggled on and off with the button and the pie chart (to hide it).',
                link: 'https://github.com/jxm8022/Net_Budget/issues/24'
            },
            {
                id: 2,
                title: 'Added feature: QoL updates',
                info: 'Added new updates to improve the overall feel of the website. Added dark and light mode styling, added page to hold versions of this application, and updated icons to match light and dark mode.',
                link: 'https://github.com/jxm8022/Net_Budget/issues/27'
            },
            {
                id: 3,
                title: 'Add optional ratios',
                info: 'Added new table in month overview. The table displays the 50/30/20 rule being applied to income and potential income.',
                link: 'https://github.com/jxm8022/Net_Budget/issues/34'
            }
        ]
    },
    {
        id: 3,
        version: 1.3,
        title: 'Release v1.3',
        info: [
            {
                id: 0,
                title: 'Add user sign in',
                info: 'Added login and sign up page. Users can now login to their account and are logged out when their token expires. Aso, the user can sign up and create an account for the website.',
                link: 'https://github.com/jxm8022/Net_Budget/issues/13'
            },
            {
                id: 1,
                title: 'Move from local storage to database',
                info: 'Added database persistence. The user can now add, update, and delete data per usual but the data is now persistent through multiple devices.',
                link: 'https://github.com/jxm8022/Net_Budget/issues/12'
            },
            {
                id: 2,
                title: 'Updated rules for database authentication',
                info: 'Added rules to firebase database read and write access. Updated the APIs to pass authentication token to allow read and write.',
                link: 'https://github.com/jxm8022/Net_Budget/issues/41'
            },
            {
                id: 3,
                title: 'Authentication/Authorization enhancements',
                info: 'Added link to login in to allow users to reset their password if forgotten. Added new page for user to access account information. In said page, the user is able to update their password after logging in.',
                link: 'https://github.com/jxm8022/Net_Budget/issues/45'
            }
        ]
    },
    {
        id: 4,
        version: 1.4,
        title: 'Release v1.4',
        info: [
            {
                id: 0,
                title: 'Mobile enchancements',
                info: 'Updated the mobile application to fix changes with the following: bar chart, pie chart, modal on iPad, table.',
                link: 'https://github.com/jxm8022/Net_Budget/issues/44'
            },
            {
                id: 1,
                title: 'NaN on pie chart',
                info: 'Updated pie chart to display correct numbers. Updated pie chart to correctly switch between months.',
                link: 'https://github.com/jxm8022/Net_Budget/issues/39'
            },
            {
                id: 2,
                title: 'Updating transactions does not update table',
                info: 'Fixed when user updates a transaction, the table is not updated.',
                link: 'https://github.com/jxm8022/Net_Budget/issues/43'
            }
        ]
    },
    {
        id: 5,
        version: 1.5,
        title: 'Release v1.5',
        info: [
            {
                id: 0,
                title: 'Add analytics to account page',
                link: 'https://github.com/jxm8022/Net_Budget/issues/47'
            },
            {
                id: 1,
                title: 'Updating transaction does not remove filters',
                info: 'Fixed when user sets filters and updates transactions, the filters do not get reset',
                link: 'https://github.com/jxm8022/Net_Budget/issues/37'
            },
            {
                id: 2,
                title: 'QOL updates',
                info: 'Updated small bugs',
                link: 'https://github.com/jxm8022/Net_Budget/issues/46'
            }
        ]
    },
    {
        id: 6,
        version: 1.6,
        title: 'Release v1.6',
        info: [
            {
                id: 0,
                title: 'Fix minor bugs from previous release',
                link: 'https://github.com/jxm8022/Net_Budget/issues/55'
            },
        ]
    },
    {
        id: 7,
        version: 1.7,
        title: 'Release v1.7',
        info: [
            {
                id: 0,
                title: 'Add constants for items',
                link: 'https://github.com/jxm8022/Net_Budget/issues/58'
            }
        ]
    },
    {
        id: 8,
        version: 1.8,
        title: 'Release v1.8',
        info: [
            {
                id: 0,
                title: 'Update labels to be zero indexed',
                link: 'https://github.com/jxm8022/Net_Budget/issues/60'
            },
            {
                id: 1,
                title: 'Create add transaction button in month overview',
                link: 'https://github.com/jxm8022/Net_Budget/issues/62'
            },
            {
                id: 2,
                title: 'Add statistics tab',
                link: 'https://github.com/jxm8022/Net_Budget/issues/65'
            },
            {
                id: 3,
                title: 'QOL updates',
                link: 'https://github.com/jxm8022/Net_Budget/issues/67'
            },
            {
                id: 4,
                title: 'Add recurring transactions',
                link: 'https://github.com/jxm8022/Net_Budget/issues/66'
            },
            {
                id: 5,
                title: 'Update website design',
                link: 'https://github.com/jxm8022/Net_Budget/issues/64'
            },
            {
                id: 6,
                title: 'Add debt tracker feature',
                link: 'https://github.com/jxm8022/Net_Budget/issues/56'
            },
            {
                id: 7,
                title: 'Update bar chart',
                link: 'https://github.com/jxm8022/Net_Budget/issues/73'
            }
        ]
    }
]

export default versionHistory;