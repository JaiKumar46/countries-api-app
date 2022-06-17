import React,{useState,useEffect, Fragment} from 'react'
import {Link} from 'react-router-dom'
import { apiURL } from "../Util/api";

const Simillar = () => {
  const [allCountries,setAllCountries]=useState([])
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const getRandomcountry=(data)=>{
    let start=Math.random()*(data.length-8);
    let end=start+8;
    setCountries(data.slice(start,end));
  }

  const getAllCountries = async () => {
    try {
      const res = await fetch(`${apiURL}/all`);

      if (!res.ok) throw new Error("Something went wrong!");

      const data = await res.json();
      setAllCountries(data);
      console.log(data);
      getRandomcountry(data);




      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };
  useEffect(() => {
    getAllCountries();
  }, []);
  
  return (
    <Fragment>
      <div className='country_simillar'>
        <div className='country_simillar_title'>
            <h3>Similar Countries</h3>
          

           
            </div>
        <div className='country_simillar_content'>
        {isLoading && !error && <h4>Loading........</h4>}
        {error && !isLoading && <h4>{error}</h4>}

        {countries.map((country) => (
          <div className='country_simillar_content_item'>
            <Link to={`/country/${country.name.common}`} onClick={()=>getRandomcountry(allCountries)}>
              <img src={country.flags.png} alt={country.name} />
              <div className="country__data">
                <h3>{country.name.common}</h3>
                <h6>
                  {" "}
                  Population:{" "}
                  {new Intl.NumberFormat().format(country.population)}
                </h6>
                <h6> Region: {country.region}</h6>
                <h6>Capital: {country.capital}</h6>
              </div>
          </Link>

            
          </div>
      ))}

    </div>
    
    </div>
    </Fragment>
      )
}

export default Simillar