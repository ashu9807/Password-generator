import { useEffect, useState,useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useCallback } from 'react'

function App() {
  // const [count, setCount] = useState(0)
  let [length,setlength]=useState(8)
  let [numberallowed,setnumberallowed]=useState(false)
  let [charallowed,setcharallowed]=useState(false)
  let [password,setpassword]=useState("")

  //useref hook
  let passwordref=useRef(null)

  let passwordgenerator=useCallback(()=>{
       let pass=""
       let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
       if(numberallowed)str=str+"0123456789"
       if(charallowed) str=str+"!@#$%^&*"

       for (let i = 1; i <=length; i++) {
        let char=Math.floor(Math.random()*str.length+1)
        pass+=str.charAt(char)
        
       }
         setpassword(pass)

  },[length,numberallowed,charallowed,setpassword])

const copypasswordtoclipboard=useCallback(()=>{
  passwordref.current?.select();//to higlight that it is selected.
  passwordref.current?.setSelectionRange(0,100);//to sselect the no. of length of passsword
  window.navigator.clipboard.writeText(password)
},[password])

  // useeffect
     useEffect(()=>{
      passwordgenerator()
     },[length,numberallowed,charallowed,passwordgenerator])

  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
      <h1 className='text-white text-center p-4 m-4  uppercase'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4 '> 
    <input
     type="text"
     value={password}
     className='outline-none w-full py-1 px-3'
     placeholder='password'
     readOnly
     ref={passwordref}
     />
     <button 
     onClick={copypasswordtoclipboard}
     className='outline-none bg-blue-700 text-white px-3py-1 p-3 shrink-0 hover:opacity-70 '>
      copy
     </button>
     </div>
     <div className='flex text-sm gap-x-1 py-2 py-4'>
      <div className='flex items-center gap-x-1'>
         <input 
              type="range" 
              min={6}
              max={50}
              value={length}
              className='cursor-pointer'
              onChange={(e)=>{setlength(e.target.value)}}

         />
         <label> Length: {length}</label>
         </div>
      <div className='flex items-center gap-x-1'>
        <input 
        type="checkbox"
        defaultChecked={numberallowed}
        id="numberInput"
        onChange={()=>{
          setnumberallowed((prev)=>!prev);
        }} 
        />
      <label htmlFor="">Numbers</label>
     </div>
     <div className='flex items-center gap-x-1 '>
        <input 
        type="checkbox"
        defaultChecked={charallowed}
        id="numberInput"
        onChange={()=>{
          setcharallowed((prev)=>!prev);
        }} 
        />
      <label htmlFor="">Special char</label>
     </div>
     
    </div>
    </div> 
    </>
  )
}

export default App
