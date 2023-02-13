import React from 'react';
import { Routes, Route } from 'react-router-dom';
import IndexProduct from '../components/products/Index';
import CreateProduct from '../components/products/Create';
import EditProduct from '../components/products/Edit';
import NotFound from '../components/NotFound';

const Router = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={ <IndexProduct /> } />
                <Route path="/product/create" element={ <CreateProduct /> } />
                <Route path="/product/edit/:id" element={ <EditProduct /> } />
                <Route path="*" element={ <NotFound /> } />
            </Routes>
        </div>
    )
}

export default Router;