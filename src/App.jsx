// import Login from "./Pages/Login"
import MainPage from "./Pages/MainPage";
import { OrderContextProvider } from "./Contexts/OrderContext";
import { PageContextProvider } from "./Contexts/PageContext";

function App() {
 
  return (
    <>
      <PageContextProvider>
        <OrderContextProvider>
          {/* <Login/> */}
          <MainPage />
        </OrderContextProvider>
      </PageContextProvider>
    </>
  )
}

export default App
