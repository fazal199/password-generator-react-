import React, { useCallback, useEffect, useRef, useState } from 'react'

const App = () => {
 
   //state to check the if to include number in the password
   let [isNumbers,setIsNumbers] = useState(false);

   //state to check the if to include character in the password
   let [isCharacters,setIscharacters] = useState(false);

   //state to set the main password in the input field
   let [mainpassword,setMainpassword] = useState("");

   //state to set the password length
   let [passwordlength,setPasswordlength] = useState(12);

   //store the range field (object) into variable
   let passwordrange = useRef();

   //store the input(password) field(object) into variable
   let passwordinputfiled = useRef(null);
  
   //function to toggle the state of number
   let handleisnumber = ()=>{
       setIsNumbers(!isNumbers);
   }

   //function to toggle the state of character
   let handleischaracter = ()=>{
       setIscharacters(!isCharacters);
   }

   //main function to generate the password
   let passwordgenerator = useCallback(()=>{
          let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
          let pass = "";

          if(isNumbers)
          str+= "1234567890";

          if(isCharacters)
          str += "!@#$%^&*()-=+?></~";

          for(let i = 1; i<=passwordlength; i++)
          {
               let lenofstr = str.length;
               let randomindex = Math.floor(Math.random() * lenofstr) + 1;
               pass += str.charAt(randomindex);
          }

          setMainpassword(pass);

   },[isCharacters,isNumbers,passwordlength]);

   //function to change the password to length
   let handlepasswordlen = ()=>{
      let newpasslen = passwordrange.current.value;
      setPasswordlength(newpasslen);
   }

   //function to copy the password to clipboard
   let copytoclipboard = ()=>{
       window.navigator.clipboard.writeText(mainpassword);
       passwordinputfiled.current.select(mainpassword);
   }

   //hook to set the password at the time of rendering and to change the password according to user interaction
   useEffect(()=>{
      passwordgenerator();
   },[isCharacters,isNumbers,passwordlength]);

  return (
    <div className="bg-gray-800 mt-52 mx-auto py-6 px-5 rounded-lg w-[32rem]">
    <h1 className="uppercase text-center font-semibold text-3xl">Password Generator</h1>
    <div className="relative overflow-hidden rounded-lg mt-5">

      {/* password filed */}
      <input readOnly ref={passwordinputfiled} className="w-4/5 mx-auto block text-lg text-black p-2 focus:outline-none" type="text" name="passwordgenerator" id="passwordgenerator" value={mainpassword}  />

      {/* copy button */}
      <button onClick={copytoclipboard} className="bg-blue-500 text-sm py-3 px-4 font-semibold active:bg-blue-800 absolute right-12 top-0">Copy</button>
    </div>
    <div className="w-[80%] mx-auto block mt-5">

    {/* range field to change the length of the password */}
    <input  onChange={handlepasswordlen} ref={passwordrange} className="w-[70%] relative top-1" type="range" name="passwordrange" id="passwordrange" min="12" max="20" value={passwordlength} /><span className="ml-2">Length({passwordlength})</span>
    </div>
    <ul className="mt-4 max-w-xs mx-auto flex flex-row gap-2 justify-between">
      <li>

         {/* checkbox field to add numbers or not  */}
         <input onClick={passwordgenerator} onChange={handleisnumber} id="numbers" type="checkbox"/><label className="capitalize text-lg ml-2" htmlFor="numbers">number</label>
      </li>
      <li>
         {/* checkbox field to add characters or not  */}
         <input onClick={passwordgenerator} onChange={handleischaracter} id="characters" type="checkbox"/><label className="capitalize text-lg ml-2" htmlFor="characters">characters</label>
      </li>
    </ul>
    </div>
  )
}

export default App;
