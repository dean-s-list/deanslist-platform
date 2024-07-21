import { addDays } from './add-days'

describe('get-end-date', () => {
  it('should return a date that is 7 days after the start date', () => {
    const date = new Date('2023-01-01T00:00:00.000Z')
    const endDate = addDays({ days: 7, date })
    expect(endDate).toEqual(new Date('2023-01-08T00:00:00.000Z'))
  })

  it('should throw an error if duration is negative', () => {
    const date = new Date('2023-01-01T00:00:00.000Z')
    expect(() => addDays({ days: -1, date })).toThrow('Duration must be positive')
  })
})
