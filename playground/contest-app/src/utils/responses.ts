

export function success(data:String){
    return {
        "success": true,
        "data": data,
        "error": null
    }
}

export function error(code:number){
    return {
        "success":false,
        "data":null,
        "error": code
    }
}