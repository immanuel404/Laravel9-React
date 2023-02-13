import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    useEffect(()=>{
        getProducts();
    },[]);


    // GET PRODUCT
    const getProducts = async () => {
        await axios.get("/api/get_all_product")
        .then(({data})=>{
            setProducts(data.products);
        })
    }

    // EDIT PRODUCT
    const editProduct = (id) => {
        navigate('/product/edit/'+id)
    }

    // DELETE PRODUCT
    const deleteProduct = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "yes, delete it!"
        })
        .then((result) =>{
            if(result.isConfirmed){
                axios.get('/api/delete_product/'+id)
                .then(()=>{
                    Swal.fire(
                        'Deleted!',
                        'Product succesfully deleted',
                        'success'
                    )
                    getProducts();
                })
                .catch((response)=>{
                    console.log(response.data)
                })
            }
        })
    }

    return (
        <div className='container'>
            <div className='products_list'>
                <div className='titlebar'>
                    <div className='titlebar_item'>
                        <h1>Products</h1>
                    </div>
                    <div className='titlebar_item'>
                        <div className='btn' onClick={ () => navigate("/product/create") }>
                        Add Product
                        </div>
                    </div>                 
                </div>

                <div className='table'>
                    <div className='list_header'>
                        <p>Image</p>
                        <p>Product</p>
                        <p>Type</p>
                        <p>Inventory(Qty)</p>
                        <p>Actions</p>
                    </div>
                    {
                        products.length > 0 && (
                        products.map((item, i)=>{
                            return (
                            <div className='list_items' key={i}>
                                <img src={`/upload/${item.photo}`} height="40px" />
                                <a>{item.name}</a>
                                <a>{item.type}</a>
                                <a>{item.quantity}</a>
                                <div>
                                    <button className='btn-icon success' onClick={()=>editProduct(item.id)}>
                                        <i className='fas fa-pencil-alt'></i>
                                    </button>
                                    <button className='btn-icon danger' onClick={()=>deleteProduct(item.id)}>
                                        <i className='fas fa-trash-alt'></i>
                                    </button>
                                </div>
                            </div>
                            )
                        })
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Index;