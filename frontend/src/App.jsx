import { RouterProvider } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import {  ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer
  position="top-center"
  autoClose={2000}
  hideProgressBar
  toastClassName="bg-white/80 text-gray-900 backdrop-blur-lg rounded-xl shadow-xl"
  bodyClassName="px-4 py-3 text-sm font-medium"
/>


      <RouterProvider router={AppRouter} />;
    </>
  );
}

export default App;
