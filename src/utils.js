export const percentage = (duration, elapsed) => {
  const raundedElapsed = Math.round(elapsed)
  const raundedDuration = Math.round(duration)

  return Math.round((raundedElapsed / raundedDuration) * 100)
}

export const getTime = time => {
  const min = Math.floor(time / 60)
  const sec = Math.floor(time % 60)
  
  return `${min}:${('0' + sec).slice(-2)}`
}
