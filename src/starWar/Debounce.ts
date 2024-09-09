export const useDebounce = ()=>{
    let timer:any
    return function(fxn:Function,delay:number){
           
            return function(this:any,...args:any[]){
                if(timer) clearTimeout(timer)
                    timer = setTimeout(()=>{
                     fxn.apply(this,args)
                    },delay)
            }
    }
}