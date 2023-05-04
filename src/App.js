import { BrowserRouter, Route, Routes } from "react-router-dom";

import React from "react";
import ShowList from "./components/showList";
import ShowSummary from "./components/showSummary";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ShowList />} />
                <Route path="/summary/:id" element={<ShowSummary />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
