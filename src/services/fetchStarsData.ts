export const fetchStarsData = async (page:number)=>{
    const url = `https://swapi.dev/api/people/?page=${page}`
    try{
        let data = await fetch(url)
        let list = await data.json()
        return list
    }catch(error){
     throw error
    }
}