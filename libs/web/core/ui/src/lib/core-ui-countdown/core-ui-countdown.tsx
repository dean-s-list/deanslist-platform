import React, { useEffect, useState } from 'react'
import { Group, Stack, Text, TextProps } from '@mantine/core'

function formatTime(value: number): string {
  return value.toString().padStart(2, '0')
}

function calculateTimeLeft(date: Date): number[] {
  const now = new Date().getTime()
  const target = date.getTime()
  const difference = target - now

  if (difference < 0) {
    return [0, 0, 0, 0]
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24))
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((difference / 1000 / 60) % 60)
  const seconds = Math.floor((difference / 1000) % 60)

  return [days, hours, minutes, seconds]
}

function CountdownCard({ value, label, ...textProps }: { value: number; label: string; textProps?: TextProps }) {
  return (
    <Stack gap={2} align="center" bg="black" p="sm" style={{ borderRadius: '10px' }}>
      <Text {...textProps}>{value}</Text>
      <Text {...textProps}>{label}</Text>
    </Stack>
  )
}

export function CoreUiCountdown({ date, textProps }: { date: Date; textProps?: TextProps }) {
  const [time, setTime] = useState(calculateTimeLeft(date))

  useEffect(() => {
    const timerId = setInterval(() => {
      const time = calculateTimeLeft(date)
      setTime(time)
      // if (time === [0, 0, 0, 0]) {
      //   clearInterval(timerId)
      // }
    }, 1000)

    return () => clearInterval(timerId)
  }, [time])

  const [days, hours, minutes, seconds] = time

  return (
    <Group>
      <CountdownCard value={days} label="days" {...textProps} />
      <CountdownCard value={hours} label="hours" {...textProps} />
      <CountdownCard value={minutes} label="minutes" {...textProps} />
      <CountdownCard value={seconds} label="seconds" {...textProps} />
    </Group>
  )
}
