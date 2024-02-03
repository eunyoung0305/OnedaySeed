import { Outlet } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout"

const IndexPage = () =>{
  return(
    <>
    <BasicLayout />
    <div>
      <div>user</div>
      <div>host</div>
    </div>
    <div>
      <Outlet />
    </div>
    </>

  )
}
export default IndexPage;