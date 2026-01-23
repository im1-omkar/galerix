
const responses = {
    success : (data:String)=>{
        return {
            "success": true,
            "data": data,
            "error": null
        }
    },

    error: (error:String)=>{
        return {
            "success":false,
            "data":null,
            "error": error
        }
    }
}

export default responses;