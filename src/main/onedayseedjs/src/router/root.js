import { Suspense,lazy} from "react";
const { createBrowserRouter} = require("react-router-dom");

const Loading = <div>Loading...</div>
const Main =  lazy(() => import("../main/MainPage"))
const About =  lazy(() => import("../main/AboutPage"))
const UserLogin = lazy(() => import("../pages/login/UserLoginPage"))
const NewUser = lazy(() => import("../pages/login/NewUserPage"))
// const LoginIndex = lazy(() => import("../pages/login/IndexPage"))
const HostLogin = lazy(() => import("../pages/login/HostLoginPage"))
const NewHost = lazy(() => import("../pages/login/NewHostPage"))
const UserProfile = lazy(() => import("../pages/profile/UserProfile"))
const HostProfile = lazy(() => import("../pages/profile/HostProfile"))
const Cart = lazy(() => import("../pages/cart/Cart"))

const Order =lazy(() => import("../pages/order/Order"))
const My = lazy(() => import("../pages/profile/MyPage"))
const MyHost = lazy(() => import("../pages/profile/HostMyPage"))

const LessonMain = lazy(() => import("../pages/lesson/LessonMain"))
const LessonForm = lazy(() => import("../pages/lesson/LessonForm"))
const LessonList = lazy(() => import("../pages/lesson/LessonList"))
const LessonDetail = lazy(() => import("../pages/lesson/LessonDetail"))
const LessonModify = lazy(() => import("../pages/lesson/LessonModify"))


const root = createBrowserRouter([

  {
    path: "/",
    element: <Suspense fallback={Loading}><Main/></Suspense>
  },
  {
    path: "/about",
    element: <Suspense fallback={Loading}><About/></Suspense>
  },
  {
    path:"/user/login",
    element: <Suspense fallback={Loading}><UserLogin/></Suspense>
  },
  {
    path: "/user/new",
    element: <Suspense fallback={Loading}><NewUser/></Suspense>
  },
  {
    path: "/host/login",
    element: <Suspense fallback={Loading}><HostLogin/></Suspense>
  },
  {
    path: "/host/new",
    element: <Suspense fallback={Loading}><NewHost/></Suspense>
  },
  {
    path:"/myPage",
    element: <Suspense fallback={Loading}><My/></Suspense>
  },
  {
    path:"/user",
    element: <Suspense fallback={Loading}><UserProfile /></Suspense>
  },
  {
    path:"/host",
    element: <Suspense fallback={Loading}><HostProfile /></Suspense>
  },
    {
      path:"/host/myPage",
      element: <Suspense fallback={Loading}><MyHost /></Suspense>
    },
  {
    path:"/cart",
    element: <Suspense fallback={Loading}><Cart /></Suspense>
  },
  {
    path:"/order",
    element: <Suspense fallback={Loading}><Order /></Suspense>
  },
  {
    path:"/lesson/main",
    element:<Suspense fallback={Loading}><LessonMain/></Suspense>
  },
  {
    path:"/lesson/list",
    element: <Suspense fallback={Loading}><LessonList /></Suspense>
  },
  {
    path:"/lesson/detail",
    element: <Suspense fallback={Loading}><LessonDetail /></Suspense>
  },
  {
    path: "/lesson/new",
    element: <Suspense fallback={Loading}><LessonForm /></Suspense>
  },
  {
    path: "/lesson/modify",
    element: <Suspense fallback={Loading}><LessonModify /></Suspense>
  },

])
export default root;