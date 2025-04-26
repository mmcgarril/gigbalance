export const categories = [
    'Advertising', 
    'Fees/Commission',
    'Contract Labor',
    'Insurance',
    'Legal/Professional',
    'Meals',
    'Miscellaneous', 
    'Office Expenses',
    'Repairs/Maintenance',
    'Supplies', 
    'Travel',
    'Utilities',
    'Vehicle'
]

export const categoriesShort = [
    'Ads', 
    'Fees',
    'Contract',
    'Ins',
    'Legal',
    'Meals',
    'Misc', 
    'Office',
    'Repair',
    'Supplies', 
    'Travel',
    'Util',
    'Vehicle'
]

export const categoryDescriptions = {
    'Advertising': 'Website hosting, social media ads, posters, promo videos', 
    'Commission/Fees':  'Bandcamp, PayPal, Venmo, or agent fees',
    'Contract Labor': 'Paying session musicians, engineers, designers',
    'Insurance': 'Event insurance, gear insurance, liability insurance',
    'Legal/Professional': 'Lawyer fees for contracts, accountant fees, consulting services',
    'Meals': 'Meals while traveling for gigs or business meetings',
    'Miscellaneous': 'Spotify/Apple Music subscriptions, etc..', 
    'Office Expenses': 'Desk, printer, paper, home studio furniture',
    'Repairs/Maintenance': 'Instrument repairs, amp servicing',
    'Supplies': 'Sheet music, guitar strings, drumsticks, cables', 
    'Travel': 'Flights, hotels, Uber for tours',
    'Utilities': 'Internet bill, electricity bill (if claiming home office deduction)',
    'Vehicle': 'Mileage for gigs, lessons, and rehearsals'
}

export function formatMMDDYYYY(dateString) {
    const [ year, month, day ] = dateString.slice(0, 10).split('-')
    const newString = `${month}/${day}/${year}`
    return newString
}

export function formatMMDD(dateString) {
    const [ month, day ] = dateString.slice(5, 10).split('-')
    const newString = `${month}/${day}`
    return newString
}

export const successMessages = {
    Add: 'Expense has been added successfully!',
    Update: 'Expense has been updated successfully!',
    Delete: 'Expense has been deleted successfully!'
}

export function findGrandTotal(totals) {
    const sum = Object.values(totals).reduce((accum, currVal) => {
        return accum + currVal}, 0)
    return sum.toFixed(2)
} 