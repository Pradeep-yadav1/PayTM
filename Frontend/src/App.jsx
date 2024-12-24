
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Dashboard } from './pages/Dashboard'
import { Sendmoney } from './pages/Sendmoney'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sendmoney" element={<Sendmoney />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
