import { setDateToEndOfDay } from './set-date-to-end-of-day'

describe('set-date-to-end-of-day', () => {
  it('should set the date to the end of the day', () => {
    // ARRANGE
    const date = new Date('2023-01-01T12:00:00.000Z')
    const expected = new Date('2023-01-01T23:59:59.999Z')
    // ACT
    const received = setDateToEndOfDay(date)
    // ASSERT
    expect(received).toEqual(expected)
  })
})
