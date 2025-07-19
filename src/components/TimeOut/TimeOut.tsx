import React, { useEffect, useState } from 'react'

interface Props {
  children: React.ReactNode
  delay: number
}
export default function TimeOut({ children, delay }: Props) {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), delay)
    return () => clearTimeout(timer)
  }, [])
  return <div>{show && children}</div>
}
