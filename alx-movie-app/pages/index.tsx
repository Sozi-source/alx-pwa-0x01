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
  <div className="min-h-screen bg-gray-50">
    <h2 className="flex items-center justify-center mt-5 text-2xl md:text-3xl font-bold text-gray-800">Movie List</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {movies.map((m)=>(
        <div key={m.imdbID} className="border border-gray-200 bg-white shadow-md rounded-xl p-4 hover:shadow-xl transition">
          <h3 className="mt-3 text-lg font-semibold text-gray-700">{m.Title} </h3>
          <img src={m.Poster} alt={m.Title} className="w-full h-64 object-cover rounded-lg" />
          <div className="mt-2 text-sm text-gray-600">
            <p> Year: {m.Year} | Type {m.Type} </p>
            <p>IMDBID{m.imdbID} </p>
          </div>         
        </div>
      ))}
    </div>


  </div>
)}
export default Home;