const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]

class HumanDate {
  render (attrs) {
    const dateString = attrs['date']

    if (dateString === undefined) {
      throw new Error('No "date" attribute was provided')
    }

    const currentYear = (new Date()).getFullYear()
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()

    const yearString = year !== currentYear ? `, ${ year }` : ''

    return `${ MONTHS[month] } ${ day }${ yearString }`
  }
}

module.exports = HumanDate
