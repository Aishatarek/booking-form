import React from "react";
import Home from "./Home";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import Navbar from "./Navbar";

function App() {



  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Root />}>
          <Route index element={<Home />} />
                
          {/* <Route path="*" element={<NotFound />} /> */}

        </Route>
      </>
    )
  );

  return (
    <div className={`app`}>
    <Navbar />
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;

const Root = () => {


  return (
    <div className={`App`}>

      <Outlet />
    </div>
  );
};
