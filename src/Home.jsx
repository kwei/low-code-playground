import React, { Suspense } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

/***
 * https://blog.logrocket.com/lazy-loading-components-in-react-16-6-6cea535c0b52/
 * Use React.lazy() to dynamically import components;
 * Use <Suspense/> to handle the fallback, such as a loading component;
 * Use <ErrorBoundary> to handle error rendering React.lazy() component.
 ***/
const MainPage = React.lazy(() => {
    return Promise.all([
        import(/* webpackChunkName: "MainPage" */"./pages/MainPage/MainPage.jsx"),
        new Promise(resolve => setTimeout(resolve, 1000))
    ]).then(([moduleExports]) => moduleExports);
});

import Loader from "./component/Loader/Loader.jsx";
import ErrorBoundary from "./component/ErrorBoundary/ErrorBoundary.jsx";

const Home = () => {
    return (
        <ErrorBoundary fallback={<p>{"Error load page."}</p>}>
            <Suspense fallback={<Loader/>}>
                <HashRouter>
                    <Routes>
                        <Route path="/" element={<MainPage/>}/>
                    </Routes>
                </HashRouter>
            </Suspense>
        </ErrorBoundary>
    );
};

export default Home;
