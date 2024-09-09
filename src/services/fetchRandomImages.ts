export const fetchImage = async (url:string,size:number)=>{
    let promises=Array(size).fill(1).map(async ()=>{
       let response = await fetch("https://picsum.photos/400/400.jpg")
         return response?.url
    })
const data = await Promise.all(promises)
 return data
}

   
