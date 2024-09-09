  export const createJson = (data:any,urls:string[])=>{
    const combined = data.map((obj:any, index:number) => ({
        ...obj,
        url: urls[index]
      }));

      return combined
      
  }

  export  const filterData = (data:any[],inputValue:string)=>{
    if(inputValue.length){
      let newData = data?.filter((ele:any,index:number)=>{
        let flag = ele?.name.includes(inputValue)
        if(flag){
            return ele;
        }
    })
    return newData
  }
  else{
    return [...data]
  }
   
}