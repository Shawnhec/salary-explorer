import { Routes, Route } from "react-router";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Job from "./pages/Job";

import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout></Layout>}>
        <Route index element={<Home></Home>} />
        <Route path="jobs/:slug" element={<Job></Job>} />
        <Route path="*" element={<NotFound></NotFound>} />
      </Route>
    </Routes>
  );
}

export default App;
