import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Modal, FormSelect } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { Layout } from '../../components/Layout'
import { Input } from '../../components/UI/Input';
import NewModal from '../../components/UI/Modal';
import { addCategory, deleteCategory as deleteCategoryAction, getAllCategory, updateCategory } from '../../features/categorySlice';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import { IoCheckboxOutline, IoCheckbox, IoCaretDown, IoCaretForward, IoAddOutline, IoTrashSharp, IoSkull } from "react-icons/io5";
import { IoIosCheckboxOutline } from "react-icons/io";
import { Form } from 'react-bootstrap'
import './style.css';
/**
* @author
* @function Category
**/

export const Category = (props) => {

    const category = useSelector(state => state.category);
    // console.log(category.categories);
    const dispatch = useDispatch();
    // console.log(category)
    const [show, setShow] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [categoryType, setCategoryType] = useState('');
    const [categoryImg, setCategoryImg] = useState('');
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [checkedArray, setCheckedArray] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]);
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);


    const renderCategoryTree = (categories) => {
        let myCategory = [];
        // console.log(categories)
        for (let category of categories) {
            myCategory.push(
                {
                    label: category.name,
                    value: category._id,
                    children: category.children.length > 0 && renderCategoryTree(category.children)
                }
                // <li key={category.name}>
                //     {category.name}
                //     {category.children.length > 0 ? <ul>{renderCategoryTree(category.children)}</ul> : null}
                // </li>
            );
        }
        // console.log(myCategory);
        return myCategory;
    }

    const categoryList = (categories, options = []) => {
        // console.log(categories);
        for (let category of categories) {
            options.push({ value: category._id, name: category.name, parentId: category.parentId, type: category.type })
            if (category.children.length > 0) {
                categoryList(category.children, options)
            }
        }
        // console.log(options);
        return options;
    }

    const handleCategoryImage = (e) => {
        setCategoryImg(e.target.files[0])
    };
    
    const onClickSaveChanges = () => {

        const form = new FormData();
        if(categoryName == ''){
            alert('Category Name is Required!');
        }
        form.append('name', categoryName);
        form.append('parentId', parentCategoryId);
        form.append('categoryImg', categoryImg);
        dispatch(addCategory(form));
        setCategoryName('');
        setParentCategoryId('');
    };

    const handleShow = () => setShow(true);

    const handleClose = () => setShow(false);

    const onClickEditCategory = (e) => {
        setUpdateCategoryModal(true);
        updateExpandedandCheckedArray();
    }

    const updateExpandedandCheckedArray = () => {
        const categories = categoryList(category.categories);
        // console.log(categories);
        const checkedArray = [];
        const expandedArray = [];
        checked.length > 0 && checked.map((categoryId, index) => {
            const singleCategoryData = categories.find((_category, _index) => categoryId == _category.value)
            singleCategoryData && checkedArray.push(singleCategoryData);
        })
        // console.log(checkedArray);
        expanded.length > 0 && expanded.map((categoryId, index) => {
            const singleCategoryData = categories.find((_category, _index) => categoryId == _category.value)
            singleCategoryData && expandedArray.push(singleCategoryData);
        })
        // console.log(expandedArray);
        setCheckedArray(checkedArray);
        setExpandedArray(expandedArray);
    }
    const handleEditCategoryInput = (e, index, type) => {
        let key = e.currentTarget.name;
        let value = e.currentTarget.value
        if (type == "expanded") {
            setExpandedArray(previousState => {
                previousState[index][key] = value;
                // console.log(previousState);
                return [...previousState];
            })
        }
        else {
            setCheckedArray(previousState => {
                previousState[index][key] = value;
                // console.log(previousState);
                return [...previousState];
            })
        }
    }

    const updateCategoriesFrom = (e) => {

        const form = new FormData();
        expandedArray.map((item, index) => {
            form.append('_id', item.value)
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : "");
            form.append('type', item.type);
        })
        checkedArray.map((item, index) => {
            form.append('_id', item.value)
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : "");
            form.append('type', item.type);
        })
        console.log(form);
        dispatch(updateCategory(form)).then((response, error) => {
            if (!error) {
                dispatch(getAllCategory());
                setUpdateCategoryModal(false);
            }

        });
    }

    const onClickDeleteCategory = (e) => {
        setDeleteCategoryModal(true);
        updateExpandedandCheckedArray();
    }

    const confirmDeleteCategories = (e) => {
        // console.log(checkedArray);
        let checkdedIds = checkedArray.map((item, index) => ({ _id: item.value }));
        let expandedIds = expandedArray.map((item, index) => ({ _id: item.value }));
        let arraysIds = checkdedIds.concat(expandedIds);
        // console.log(arraysIds);
        if (checkedArray.length > 0) {
            dispatch(deleteCategoryAction(checkdedIds)).then((response, error) => {
                if (!error) {
                    dispatch(getAllCategory());
                    setDeleteCategoryModal(false);
                }
            });
        }
    }

    const renderAddNewCategoryModal = () => {
        return (
            //   Modal to add new Category 
            <NewModal
                show={show}
                modalTitle="Add new Category"
                handleClose={handleClose}
                onClickSaveChanges={onClickSaveChanges}
                btnSize="sm"
            >
                <Row>
                    <Col>
                        <Input
                            label="Category Name"
                            controlId="category-name"
                            placeholder="Enter Category Name"
                            onChange={(e) => { setCategoryName(e.target.value) }}
                            size="sm"
                        />
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Parent ID</Form.Label>
                            <FormSelect className='form-control'
                                onChange={(e) => { setParentCategoryId(e.target.value) }}
                                value={parentCategoryId}
                                size="sm">
                                <option>Select Parent Category</option>
                                {
                                    categoryList(category.categories).map((option) =>
                                        <option value={option.value} key={option.value}>{option.name}</option>
                                    )
                                }
                            </FormSelect>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Input
                            type="file"
                            controlId="category-image"
                            onChange={handleCategoryImage}
                            size="sm"
                        />
                    </Col>
                </Row>
            </NewModal>
        )
    }

    const renderEditCategoryModal = () => {
        return (
            //  Modal to edit Categories 
            <NewModal
                show={updateCategoryModal}
                modalTitle="Edit Categories"
                handleClose={() => setUpdateCategoryModal(false)}
                onClickSaveChanges={updateCategoriesFrom}
                size="lg">
                <Row>
                    <h6>Expanded</h6>
                </Row>
                {expandedArray.length > 0 && expandedArray.map((item, index) =>
                    <Row key={index}>
                        <Col>
                            <Input
                                controlId="category-name"
                                name="name"
                                placeholder="Category Name"
                                value={item.name}
                                onChange={(e) => handleEditCategoryInput(e, index, 'expanded')}
                            />
                        </Col>
                        <Col>
                            <FormSelect className='form-control'
                                name="parentId"
                                onChange={(e) => { handleEditCategoryInput(e, index, 'expanded') }}
                                value={item.parentId}>
                                <option>Select Parent Category</option>
                                {
                                    categoryList(category.categories).map((option) =>
                                        <option value={option.value} key={option.value}>{option.name}</option>
                                    )
                                }
                            </FormSelect>
                        </Col>
                        <Col>
                            <FormSelect className='form-control'
                                onChange={(e) => { handleEditCategoryInput(e, index, 'expanded') }}
                                name="type"
                                value={item.type}>
                                <option>Select type</option>
                                <option value="store">Store</option>
                                <option value="product">Product</option>
                                <option value="page">Page</option>
                            </FormSelect>
                        </Col>
                        {/* <Col>
            <Input
                type="file"
                name = ""
                controlId="category-image"
                onChange={handleCategoryImage}
            />
        </Col> */}

                    </Row>
                )}

                <Row>
                    <h6>Checked Categories</h6>
                </Row>
                {checkedArray.length > 0 && checkedArray.map((item, index) =>
                    <Row key={index}>
                        <Col>
                            <Input
                                controlId="category-name"
                                name="name"
                                placeholder="Category Name"
                                value={item.name}
                                onChange={(e) => handleEditCategoryInput(e, index, 'checked')}
                            />
                        </Col>
                        <Col>
                            <FormSelect className='form-control'
                                name="parentId"
                                onChange={(e) => { handleEditCategoryInput(e, index, 'checked') }}
                                value={item.parentId}>
                                <option value="">Select Parent Category</option>
                                {
                                    categoryList(category.categories).map((option) =>
                                        <option value={option.value} key={option.value}>{option.name}</option>
                                    )
                                }
                            </FormSelect>
                        </Col>
                        <Col>
                            <FormSelect className='form-control'
                                onChange={(e) => { handleEditCategoryInput(e, index, 'checked') }}
                                name="type"
                                value={item.type}>
                                <option>Select type</option>
                                <option value="store">Store</option>
                                <option value="product">Product</option>
                                <option value="page">Page</option>
                            </FormSelect>
                        </Col>
                        {/* <Col>
            <Input
                type="file"
                name = ""
                controlId="category-image"
                onChange={handleCategoryImage}
            />
        </Col> */}

                    </Row>
                )}
            </NewModal>
        )
    }

    const renderDeleteCategoryModal = () => {
        return (<NewModal
            modalTitle="Confirm"
            show={deleteCategoryModal}
            handleClose={() => setDeleteCategoryModal(false)}
            buttons={[
                {
                    label: 'Yes',
                    color: 'danger',
                    onClick: () => { confirmDeleteCategories() }
                },
                {
                    label: 'No',
                    color: 'primary',
                    onClick: () => setDeleteCategoryModal(false)
                },
            ]}
        >
            <h5>Expanded</h5>
            {expandedArray.map((item, index) => (
                <h6 key={index}>{item.name}</h6>
            )
            )}
            <h5>Checked</h5>
            {checkedArray.map((item, index) => (
                <h6 key={index}>{item.name}</h6>
            )
            )}
        </NewModal>)
    }

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Category</h3>
                            <div className='actionBtnContainer'>
                                <span>Actions:</span>
                                <Button size="sm" variant='primary' onClick={handleShow}><IoAddOutline /> <span>Add</span></Button>
                                <Button size="sm" onClick={onClickDeleteCategory}><IoTrashSharp /> <span>Delete</span></Button>
                                <Button size="sm" onClick={onClickEditCategory}><IoSkull /> <span>Edit</span></Button>
                            </div>

                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <CheckboxTree
                            nodes={renderCategoryTree(category.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={checked => setChecked(checked)}
                            onExpand={expanded => setExpanded(expanded)}
                            icons={{
                                check: <IoCheckbox />,
                                uncheck: <IoIosCheckboxOutline />,
                                halfCheck: <IoIosCheckboxOutline />,
                                expandClose: <IoCaretForward />,
                                expandOpen: <IoCaretDown />,
                            }}
                        />
                        {/* <ul>
                            {renderCategoryTree(category.categories)}
                        </ul> */}
                    </Col>
                </Row>
            </Container>
            {renderAddNewCategoryModal()}
            {renderEditCategoryModal()}
            {renderDeleteCategoryModal()}

        </Layout>
    )

}