import axios from "axios"


export default async function Dashboard(){

    const result:any = await axios.get("http://localhost:3000/api/links")
    console.log(result.data)
        

    return <div className="h-screen w-screen grid grid-cols-3 border-black border-2">
        {result.data.result.map((link:any, i:number)=>{
            return <div  key={i} className="border border-black flex flex-col">
                <div>{link.title}</div>
                <div>{link.url}</div>
                <div>{link.title}</div>
            </div>
        })}
    </div>
}
