import React, { useState } from 'react';
import  { useNavigate } from 'react-router-dom';

const Create = () => {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [photo, setPhoto] = useState(null);
    const [type, setType] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");

    // IMAGE UPLOAD
    const changeHandler = (e) => {
        let file = e.target.files[0];
        let reader = new FileReader();
        let limit = 1024 * 1024 * 2;
        if(file['size'] > limit){
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: 'Why do I have this issue?'
            })
        }
        reader.onloadend = (file) => {
            setPhoto(reader.result)
        }
        reader.readAsDataURL(file);
    }

    // FORM SUBMIT
    const createProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('photo', photo);
        formData.append('type', type);
        formData.append('quantity', quantity);
        formData.append('price', price);

        await axios.post('/api/add_product/', formData)
        .then(({data})=>{
            toast.fire({
                icon:'success',
                title:'Product Added'
            })
            navigate('/');
        })
        .catch(({response})=>{
            console.log(response.data)
        })
    }

    return (
        <div className='container'>
            <div className='product_create'>
                <div className='titlebar'>
                    <div className='titlebar_item'>
                        <h1>Add Product</h1>
                    </div>
                    <div className='titlebar_item'>
                        <button className='btn' onClick={(e)=>createProduct(e)}>
                            Save
                        </button>
                    </div>
                </div>

                <div className='card_wrapper'>
                    <div className='wrapper_left'>
                        <div className='card'>
                            <p>Name</p>
                            <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                            
                            <p>Description (Optional)</p>
                            <textarea cols="10" rows="5" value={description} onChange={(e)=>{setDescription(e.target.value)}}></textarea>

                            <div className='media'>
                                <ul className='image_list'>
                                    <li className='image_item'>
                                        <div className='image_item-img'>
                                            <img src={photo} width="177px" heigth="100px" />
                                        </div>
                                    </li>
                                    <li className='image_item'>
                                        <form className='image_item-form'>
                                            <label className='image_item-form--label'>Add Image</label>
                                            <input type='file' className='image_item-form--input' onChange={changeHandler}/>
                                        </form>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                    <div className='wrapper_right'>
                        <div className='card'>
                            <p>Product Type</p>
                            <input type="text" value={type} onChange={(e)=>{setType(e.target.value)}}/>
                            <hr className='hr'/>

                            <p>Inventory(Qty)</p>
                            <input type="text" value={quantity} onChange={(e)=>{setQuantity(e.target.value)}}/>
                            <hr className='hr'/>

                            <p>Price</p>
                            <input type="text" value={price} onChange={(e)=>{setPrice(e.target.value)}}/>
                            <div className='br'></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Create;