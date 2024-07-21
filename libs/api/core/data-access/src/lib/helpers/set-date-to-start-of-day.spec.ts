import { setDateToStartOfDay } from './set-date-to-start-of-day'

describe('set-date-to-start-of-day', () => {
  it('should set the date to the start of the day', () => {
    // ARRANGE
    const date = new Date('2023-01-01T12:00:00.000Z')
    const expected = new Date('2023-01-01T00:00:00.000Z')
    // ACT
    const received = setDateToStartOfDay(date)
    // ASSERT
    expect(received).toEqual(expected)
  })
})
