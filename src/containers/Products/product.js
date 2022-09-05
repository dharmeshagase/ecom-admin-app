import React, { useState } from 'react'
import { Button, Col, Container, Row, FormSelect, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { generatePublicImageUrl } from '../../apiConfig';
import { Layout } from '../../components/Layout'
import { Input } from '../../components/UI/Input';
import NewModal from '../../components/UI/Modal';
import { addProduct, deleteProductById, getAllProduct } from '../../features/productSlice';
import './style.css';
/**
* @author
* @function Products
**/

export const Products = (props) => {
  const category = useSelector(state => state.category);
  // console.log(category.categories);
  const dispatch = useDispatch();
  // console.log(category)
  const product = useSelector(state => state.product)
  // console.log(product);
  const [show, setShow] = useState(false);
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [productPictures, setProductPictures] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [description, setDescription] = useState('');
  const [productDetailsModal,setProductDetailsModal] = useState(false)
  const [productDetails,setProductDetails] = useState(null);

  // console.log(productPictures);
  const categoryList = (categories, options = []) => {
    // console.log(categories);
    for (let category of categories) {
      options.push({ value: category._id, name: category.name })
      if (category.children.length > 0) {
        categoryList(category.children, options)
      }
    }
    // console.log(options);
    return options;
  }

  const handleProductImages = (e) => {
    // console.log(e.target.files)
    // let allPictures = [];
    // for (let file of e.target.files) {
    //   allPictures.push(file);
    //   // console.log(file);
    // }
    // console.log(allPictures);
    // e.target.files.map((file)=>console.log(file))
    // setProductPictures(allPictures);
    setProductPictures(e.target.files);
  };
  const onClickSaveChanges = () => {

    const form = new FormData();
    form.append('name', productName);
    for (let pic of productPictures) {
      form.append('productPictures', pic);
    }
    form.append('price', price);
    form.append('description', description)
    form.append('category', categoryId);
    form.append('quantity', quantity);

    console.log(form);
    dispatch(addProduct(form));
    dispatch(getAllProduct());
    setProductName('');
    setCategoryId('');
    handleClose();
    console.log(product);
  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // categoryList(category.categories);

  const showProductDetailsModal = (e,product)=>{
    setProductDetails(product);
    setProductDetailsModal(true);
    console.log(product);
  }
  const renderProductTable = () => {
    return (
      <Table style = {{fontSize:12}} responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {product.product.length > 0 ?
            product.product.map((product,index) =>
              <tr key={product._id} >
                <td>{index+1}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.category.name}</td>
                <td>
                  <button onClick = {(e)=>showProductDetailsModal(e,product)}>
                  Info
                  </button>
                  <button onClick={(e)=>{dispatch(deleteProductById(product._id))}}>Del</button>
                </td>
              </tr>
            )
            : null}

        </tbody>
      </Table>
    );
  }

  const renderAddProduct = () => {
    return (
      <NewModal
        show={show}
        modalTitle="Add new Product"
        handleClose={handleClose}
        onClickSaveChanges={onClickSaveChanges}>
        <Input
          label="Product Name"
          controlId="product-name"
          placeholder="Enter Product Name"
          onChange={(e) => { setProductName(e.target.value) }}
        />
        <Input
          label="Price"
          controlId="price"
          placeholder="Enter Price"
          onChange={(e) => { setPrice(e.target.value) }}
        />
        <Input
          label="Quantity"
          controlId="quantity"
          placeholder="Enter Quantlity"
          onChange={(e) => { setQuantity(e.target.value) }}
        />
        <Input
          label="Product Description"
          controlId="description"
          type="text"
          placeholder="Enter Description"
          onChange={(e) => { setDescription(e.target.value) }}
        />
        <FormSelect className='form-control'
          onChange={(e) => { setCategoryId(e.target.value) }}
          value={categoryId}>
          <option>Select Category</option>
          {
            categoryList(category.categories).map((option) =>
              <option value={option.value} key={option.value}>{option.name}</option>
            )
          }

        </FormSelect>
        <Input
          type="file"
          multiple
          controlId="product-image"
          onChange={handleProductImages}
        />
      </NewModal>
    );
  }

  const renderProductDetailsModal = ()=>{

    if(!productDetails)
    return null;
    return(
      <NewModal
      show = {productDetailsModal}
      handleClose = {()=>setProductDetailsModal(false)}
      modalTitle = "Product Details"
      size = "lg"
      >
        <Row>
          <Col md = "6">
            <label className = "key">Name</label>
            <p className = "value">{productDetails.name}</p>
          </Col>
          <Col md = "6">
            <label className = "key">Quantity</label>
            <p className = "value">{productDetails.quantity}</p>
          </Col>
          <Col md = "6">
            <label className = "key">Price</label>
            <p className = "value">{productDetails.price}</p>
          </Col>
          <Col md = "6">
            <label className = "key">Category</label>
            <p className = "value">{productDetails.category.name}</p>
          </Col>
        </Row>
        <Row>
        <Col>
            <label className = "key">Description</label>
            <p className = "value">{productDetails.description}</p>
          </Col>
        </Row>
        <Row>
          <Col >
            <label className='key'>Product Pictures</label>
            <div style = {{display:'flex'}}>
            {
              productDetails.productPictures.map((picture)=>
              <div key = {picture._id} className='productImageContainer'>
              <img src={picture.img} alt =""></img>
              </div>
            )}
            </div>
          </Col>
        </Row>
      </NewModal>
    );
  }

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>Products</h3>
              <Button size = "sm" variant='primary' onClick={handleShow}>Add</Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            {renderProductTable()}
          </Col>
        </Row>
      </Container>
      {renderAddProduct()}
      {renderProductDetailsModal()}
    </Layout>
  )

}