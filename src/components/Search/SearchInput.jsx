import React, { useState,useEffect } from "react";

const SearchInput = ({ onSearch,fetchAgain,AllCountries}) => {
  console.log(AllCountries);
  const [input, setInput] = useState("");
  const[searchList,setSearchList]=useState([]);

 
  

  const submitHandler = (e) => {
    e.preventDefault();

    onSearch(input);
  };

  const handleSearch = (e) => {
    setInput(e.target.value);
      if(e.target.value==="")
      {
        fetchAgain();
        setSearchList([]);
        return;
    }
    setSearchList(AllCountries.filter(country=>country.name.common.toLowerCase().includes(e.target.value.toLowerCase())).slice(0,10));

    
  }
  
  return (
    <>
    <form onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="Search a country......"
        value={input}
        onChange={handleSearch}
      />
    </form>
    <ul className="suggestionContainer">
        {searchList.map((country,index)=>{
          return(
            <li key={index}  onClick={()=>{setInput(country.name.common);onSearch(input);setSearchList([])}}>{country.name.common}</li>
          )
        })}
    </ul>
    </>
  )
};

export default SearchInput;