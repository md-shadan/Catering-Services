import React from "react";
import Header from "./components/Header";
import { AppProvider } from "./context/AppContext";
import AppRoutes from "./Routes";
import Footer from "./components/Footer";

const App = () => {
  return (
    <AppProvider>
      <div className="app">
        <Header />
        <main className="main-content">
          <AppRoutes />
        </main>
        <Footer/>
      </div>
    </AppProvider>
  );
};

export default App;
