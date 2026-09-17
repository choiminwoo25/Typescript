import { Outlet } from "react-router-dom";

function Layout() {
    return <div style={{
        display:"flex"
    }}>
        레이아웃입니다.
        <Outlet/>
    </div>
}

export default Layout;