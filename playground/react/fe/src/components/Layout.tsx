import { Outlet } from "react-router-dom";

const Layout = ()=>{
    return <>
        <p>this is the layout ------ Layout</p>

        <Outlet/>

    </>
}

export default Layout;