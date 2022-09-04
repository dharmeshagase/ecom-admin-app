import { Button, Row, Col, Container, Form, FormSelect } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Layout } from '../../components/Layout';
import NewModal from '../../components/UI/Modal';
import { Input } from '../../components/UI/Input';
import categoryList from '../../helpers/categoryList';
import { createPage } from '../../features/pageSlice';

/**
* @author
* @function NewPage
**/

export const NewPage = (props) => {
    const dispatch = useDispatch();
    const category = useSelector(state => state.category);
    const [type, setType] = useState('');
    const [title, setTitle] = useState('');
    const [banners, setBanners] = useState([]);
    const [products, setProducts] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [description, setDescription] = useState('');
    const [newPageModal, setNewPageModal] = useState(false);
    const [linearCategoryList, setLinearCategoryList] = useState([]);

    useEffect(() => {
        setLinearCategoryList(categoryList(category.categories))
    }, [category])

    // console.log(linearCategoryList);



    const handleBannerImages = (e) => {
        setBanners(e.target.files)
        // console.log(e);
    }

    const handleProductImages = (e) => {
        setProducts(e.target.files)
        // console.log(e);
    }

    const handleCategoryIdChange = (e) => {
        const cate = linearCategoryList.find((cat) => cat._id == e.target.value);
        setCategoryId(e.target.value)
        setType(cate.type);
        console.log(cate);
    }
    const handleNewPageModalSave = (e) => {
        // e.target.preventDefault();
        const form = new FormData();
        if (title == '') {
            alert('Enter title');
            return;
        }
        form.append('title', title);
        form.append('description', description)
        form.append('category', categoryId);
        form.append('type',type);
        for (let pic of banners) {
            form.append('banners', pic);
        }
        for (let pic of products) {
            form.append('products', pic);
        }
        console.log(title, description, categoryId, banners, products);
        dispatch(createPage(form)).then((response, error)=>{
            if(!error){
            setNewPageModal(false);
            setTitle('');
            setCategoryId('');
            setDescription('');
            setType('');
            setBanners([]);
            setProducts([]);
            alert('New Page Created Successfully');
            }
        });
    }

    const renderCreateNewPageModal = () => {
        return (
            <NewModal
                show={newPageModal}
                modalTitle="Create New Page"
                handleClose={() => { setNewPageModal(false) }}
                onClickSaveChanges={handleNewPageModalSave}
            >
                <Container>
                    <Row>
                        <Col>
                            <Input
                                value={title}
                                onChange={(e) => { setTitle(e.target.value) }}
                                label="Page Title"
                                placeholder='Enter Page Title'
                            ></Input>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Category ID</Form.Label>
                                <FormSelect className='form-control'
                                    onChange={handleCategoryIdChange}
                                    value={categoryId}
                                    size="sm">
                                    <option>Select Category ID</option>
                                    {
                                        linearCategoryList.map((item) =>
                                            <option value={item._id} key={item._id}>{item.name}</option>
                                        )
                                    }
                                </FormSelect>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Input
                                value={description}
                                label="Description"
                                onChange={(e) => { setDescription(e.target.value) }}
                                placeholder='Enter Description'
                            ></Input>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Input
                                type="file"
                                multiple
                                label="Banners"
                                name="banners"
                                onChange={handleBannerImages}>
                            </Input>
                        </Col>
                        {/* {
                            banners.length > 0 ?
                                banners.map((banner) => (
                                    <Row>
                                        <Col>
                                        kdflksdjflskdjf
                                        {banner.name}
                                        </Col>
                                    </Row>
                                )) : null
                        } */}
                    </Row>
                    <Row>
                        <Col>
                            <Input
                                type="file"
                                multiple
                                label="Products"
                                name="products"
                                onChange={handleProductImages}>
                            </Input>
                        </Col>
                        {/* {
                            products.length > 0 ?
                                products.map((product) => (
                                    <Row>
                                        <Col>
                                        {product.name}
                                        </Col>
                                    </Row>
                                )) : null
                        } */}
                    </Row>
                </Container>
            </NewModal>
        )
    }

    return (
        <Layout sidebar>
            <Container>
                <Button onClick={() => { setNewPageModal(true) }}>New Page</Button>
            </Container>
            {renderCreateNewPageModal()}
        </Layout>
    )

}