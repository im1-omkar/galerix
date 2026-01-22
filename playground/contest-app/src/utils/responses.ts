
export const responses = {
    success : (data:String)=>{
        return {
            "success": true,
            "data": data,
            "error": null
        }
    },

    error: (code:number)=>{
        return {
            "success":false,
            "data":null,
            "error": code
        }
    }
}

