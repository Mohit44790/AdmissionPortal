import { RouterProvider } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import {  ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
     <ToastContainer
        position="top-center"
        autoClose={1400}
        hideProgressBar
        closeOnClick
        pauseOnHover={false}
        draggable={false}
        newestOnTop
        limit={1}
        toastStyle={{
          background: "#ffffff",
          color: "#1f2937",
          fontSize: "13px",
          fontWeight: 500,
          padding: "8px 14px",
          borderRadius: "8px",
          minHeight: "unset",
          width: "fit-content",
          margin: "0 auto",
          boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
        }}
      />


      <RouterProvider router={AppRouter} />
    </>
  );
}

export default App;
