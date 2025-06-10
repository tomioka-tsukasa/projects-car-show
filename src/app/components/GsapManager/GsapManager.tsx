'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import CustomEase from 'gsap/CustomEase'

export const GsapManager = () => {
  useEffect(() => {
    gsap.registerPlugin(CustomEase)
  }, [])

  return <></>
}
