import "./App.css";
import UserComponent from "./components/UserComponent";
import FooterComponents from "./components/FooterComponents";
import HeaderComponents from "./components/HeaderComponents";
import ListUserComponent from "./components/ListUserComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListPostComponent from "./components/ListPostComponent";
import PostComponent from "./components/PostComponent";
import { useEffect, useState } from "react";

function App() {
  const current_theme = localStorage.getItem("current_theme");
  const [theme, setTheme] = useState(current_theme ? current_theme : "light");

  useEffect(() => {
    localStorage.setItem("current_theme", theme);
  }, [theme]);

  return (
    <>
      <BrowserRouter>
        <div className={`container ${theme}`}>
          <HeaderComponents theme={theme} setTheme={setTheme} />
        </div>
        <Routes>
          {/* http://localhost:3000 */}
          <Route path="/" element={<ListUserComponent />}></Route>

          {/* http://localhost:3000/users */}
          <Route path="/users" element={<ListUserComponent />}></Route>

          {/* http://localhost:3000/add-user */}
          <Route path="/add-user" element={<UserComponent />}></Route>

          {/* http://localhost:3000/edit-user */}
          <Route path="/edit-user/:id" element={<UserComponent />}></Route>

          {/* http://localhost:3000/delete-user */}
          <Route
            path="/delete-user/:id"
            element={<ListUserComponent />}
          ></Route>

          {/* http://localhost:3000/show-all-post */}
          <Route path="/show-all-post" element={<ListPostComponent />}></Route>

          {/* http://localhost:3000/add-post */}
          <Route path="/create-post/:id" element={<PostComponent />}></Route>
        </Routes>
        <FooterComponents />
      </BrowserRouter>
    </>
  );
}

export default App;
