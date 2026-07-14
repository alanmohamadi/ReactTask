export const setTimer = (duration:number,setHasTime:any,setTime:any) => {
    const timer = setInterval(()=>{
      let minutes = Math.floor(duration / 60)
      let seconds = Math.floor(duration % 60)
      duration-=1
      if(duration < 0){
        duration=0
        clearInterval(timer)
        setHasTime(false)
      }
      setTime(`${minutes < 10 ? "0"+minutes : minutes}:${seconds < 10 ? "0"+seconds : seconds}`)
    },1000)
  }