import { useEffect, useState } from "react";

interface movie{
  Title: string,
  Year: string,
  imdbID: string,
  Type: string,
  Poster: string

}



const Home: React.FC=()=>{
  const [movies, setMovies] = useState<movie[]>([])

useEffect(()=>{
  const fetchMovies =async()=>{
    const response = await fetch('https://movie-database-alternative.p.rapidapi.com/?s=Avengers%20Endgame&r=json&page=1',
      {
        method: "GET",
        headers: {
              "x-rapidapi-key":"1b276df48emshf425a35259838c5p1cfe24jsnbc1c104e4eab ",
              "x-rapidapi-host": "movie-database-alternative.p.rapidapi.com",
            
      },
    }
    );

    
    const data = await response.json()

    if(data && data.Search) {
      setMovies(data.Search) 
    } else{
      console.error("No movies found or invalid data structure", data)
      setMovies([]);
    }
  }
  fetchMovies()
},[])

return(
  <div>
    <h2 className="flex items center justify-center mt-5 text-3xl font-bold">Movie List</h2>
    <div className="grid grid-cols-3 gap-5 p-8 mt-2">
      {movies.map((m)=>(
        <div key={m.imdbID} className="border border-gray-300 bg-blue-100 space-y-5 shadow-lg rounded-md">
          <h3>{m.Title} </h3>
          <img src={m.Poster} alt={m.Title} className="w-80 h-50" />
          <div>
            <p> Year: {m.Year} | Type {m.Type} </p>
            <p>IMDBID{m.imdbID} </p>
          </div>         
        </div>
      ))}
    </div>


  </div>
)}
export default Home;