import Login from "./Pages/User/Login"
import MainPage from "./Pages/User/MainPage";
import { LoginContextProvider } from "./Contexts/LoginContext";
import { OrderContextProvider } from "./Contexts/OrderContext";
import { PageContextProvider } from "./Contexts/PageContext";
import { InventoryContextProvider } from "./Contexts/InventoryContext";

function App() {
 
  return (
    <>
      <InventoryContextProvider>
        <LoginContextProvider>
          <PageContextProvider>
            <OrderContextProvider>
              <Login/>
              <MainPage />
            </OrderContextProvider>
          </PageContextProvider>
        </LoginContextProvider>
      </InventoryContextProvider>
    </>
  )
}

export default App
