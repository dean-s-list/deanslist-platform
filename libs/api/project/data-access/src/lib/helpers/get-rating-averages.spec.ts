import { getRatingAverages } from './get-rating-averages'

describe('get rating averages', () => {
  const cases = [
    {
      total: 600,
      users: [
        { id: 'user-1', ratings: [5, 5, 5, 5, 5] },
        { id: 'user-2', ratings: [1, 1, 1, 1, 1] },
      ],
      expected: { 'user-1': 500, 'user-2': 100 },
    },
    {
      total: 600,
      users: [
        { id: 'user-1', ratings: [1, 1, 1, 1, 1] },
        { id: 'user-2', ratings: [1, 1, 1, 1, 1] },
      ],
      expected: { 'user-1': 300, 'user-2': 300 },
    },
    {
      total: 600,
      users: [
        { id: 'user-1', ratings: [1] },
        { id: 'user-2', ratings: [1, 1, 1, 1, 1] },
      ],
      expected: { 'user-1': 100, 'user-2': 500 },
    },
    {
      total: 600,
      users: [
        { id: 'user-1', ratings: [1, 2, 3, 4, 5] },
        { id: 'user-2', ratings: [3] },
      ],
      expected: { 'user-1': 450, 'user-2': 90 },
    },
    {
      total: 1000,
      users: [
        { id: 'user-1', ratings: [1, 2, 3, 4, 5] },
        { id: 'user-2', ratings: [3, 4, 5, 3, 2] },
        { id: 'user-3', ratings: [1, 2, 3, 4, 5] },
        { id: 'user-4', ratings: [3, 4, 5, 3, 2] },
      ],
      expected: { 'user-1': 225, 'user-2': 255, 'user-3': 225, 'user-4': 255 },
    },
  ]

  it.each(cases)('should get the rating averages correctly', ({ total, users, expected }) => {
    expect(getRatingAverages(users, total)).toEqual(expected)
  })
})
