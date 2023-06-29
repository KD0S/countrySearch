import { useEffect, useState } from "react"
import {getCountry} from "./api/countries"
import SingleDisplay from "./components/SingleDisplay"


const App = () => {
   const [countryDetails, setCountryDetails] = useState(null)
   const [allCountries, setAllCountries] = useState(null)

   useEffect(()=>{
         getCountry().then( data => {
            setAllCountries(data)
         })
   }, [])

   if(!allCountries) return null

   const searchHandler = (event) => {
      if(allCountries) {
         setCountryDetails(allCountries.filter(c => c.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
      }
   }

   const showHandler = ({country}) => {
      setCountryDetails([country])
   } 


   return (
     <div className="main">
         <label>Find Countries</label>
         <input onChange={searchHandler}>
         </input>
         {
            countryDetails ? 
            countryDetails.length === 1 ?
            <SingleDisplay data={countryDetails}
            ></SingleDisplay> : countryDetails.length > 10 ?
            <div>Too many matches, specify another filter</div>
            : <div>
             {
               countryDetails.map(
                 country => 
                    <div key={country.name.common}>
                        {country.name.common}
                         <button onClick={()=>showHandler({country})}>show</button>
                    </div>
               )
             }
         </div> 
            : `not updated`
        }         
     </div>
   )
}

export default App