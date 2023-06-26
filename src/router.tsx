import {
    createBrowserRouter,
    redirect,
    RouterProvider,
} from "react-router-dom";
import CategoriesPage from './pages/categories/CategoriesPage';
import Providers from './redux/provider';
import DefaultLayout from './layouts/default';
import CategoriesEditPage from "./pages/categories/CategoriesEditPage";
import CategoriesAddPage from "./pages/categories/CategoriesAddPage";
import PropertiesPage from "./pages/properties/PropertiesPage";
import PropertiesEditPage from "./pages/properties/PropertiesEditPage";
import PropertiesAddPage from "./pages/properties/PropertiesAddPage";
import DevelopersPage from "./pages/developers/DevelopersPage";
import DevelopersAddPage from "./pages/developers/DevelopersAddPage";
import DeveloperEditPage from "./pages/developers/DevelopersEditPage";
import ProductsPage from "./pages/products/ProductsPage";
import ProductsAddPage from "./pages/products/ProductsAddPage";
import ProductsEditPage from "./pages/products/ProductsEditPage";
import SlidersPage from "./pages/sliders/SlidersPage";
import SlidersEditPage from "./pages/sliders/SlidersEditPage";
import SlidersAddPage from "./pages/sliders/SlidersAddPage";
import LoginPage from "./pages/login/LoginPage";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { useEffect } from "react";
import { checkIsLogin } from "./redux/slices/authSlice";

const privateRoutes = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path:"",
                element:<CategoriesPage />
            },
            {
                path: "categories",
                children: [
                    {
                        path: "",
                        element: <CategoriesPage />
                    },
                    {
                        path: ":id",
                        element: <CategoriesEditPage />
                    },
                    {
                        path: "add",
                        element: <CategoriesAddPage />
                    },
                ]
            },
            {
                path: "properties",
                children: [
                    {
                        path: "",
                        element: <PropertiesPage />
                    },
                    {
                        path: ":id",
                        element: <PropertiesEditPage />
                    },
                    {
                        path: "add",
                        element: <PropertiesAddPage />
                    },
                ]
            },
            {
                path: "developers",
                children: [
                    {
                        path: "",
                        element: <DevelopersPage />
                    },
                    {
                        path: ":id",
                        element: <DeveloperEditPage />
                    },
                    {
                        path: "add",
                        element: <DevelopersAddPage />
                    },
                ]
            },
            {
                path: "products",
                children: [
                    {
                        path: "",
                        element: <ProductsPage />
                    },
                    {
                        path: ":id",
                        element: <ProductsEditPage />
                    },
                    {
                        path: "add",
                        element: <ProductsAddPage />
                    },
                ]
            },
            {
                path: "sliders",
                children: [
                    {
                        path: "",
                        element: <SlidersPage />
                    },
                    {
                        path: ":id",
                        element: <SlidersEditPage />
                    },
                    {
                        path: "add",
                        element: <SlidersAddPage />
                    },
                ]
            },
        ]
    },
]);

const publicRoutes = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage />
    },
    {
        path: "/*",
        element: <LoginPage />
    },
])

const Router = () => {

    const { isAuth } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()

    useEffect(() => {
       dispatch(checkIsLogin(""))
    },[checkIsLogin,dispatch])

    return (
        <RouterProvider router={isAuth ? privateRoutes : publicRoutes} />
    )
}

export default Router