import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import categoryService from "../services/category.service";

const initialState = {
    categories: [],
    status: 'idle',
    error: null
}

const newCatogoriesList = (categoryList, newCategory) => {
    // console.log(categoryList)
    // console.log(newCategory);
    categoryList = JSON.parse(JSON.stringify(categoryList));
    if (newCategory.parentId == undefined) {
        const newObj = {
            _id: newCategory._id,
            name: newCategory.name,
            slug: newCategory.slug,
            children: []
        }
        return categoryList.concat(newObj);
    }
    return categoryList.map((cat) => {
        if (cat._id === newCategory.parentId) {
            const newObj = {
                _id: newCategory._id,
                name: newCategory.name,
                slug: newCategory.slug,
                parentId: newCategory.parentId,
                children: []
            }
            // newCategory.children = [];
            // console.log(typeof(cat.children));
            // let children = cat.children;
            // cat.children = [...children,newObj];
            // cat.children = Object.assign([],cat.children);
            cat.children.push(newObj);
            // cat.chidlren=cat.children.concat(newObj);
            // console.log(cat.children);
        }
        if (cat.children && cat.children.length > 0)
            cat.children = newCatogoriesList(cat.children, newCategory);
        // console.log(cat);
        return cat;
    })
}

export const getAllCategory = createAsyncThunk('category/getall',
    async () => {
        const response = await categoryService.getAllCategory();
        return response;
    })
export const addCategory = createAsyncThunk('category/add',
    async (form) => {
        const response = await categoryService.addCategory(form);
        return response;
    })
export const updateCategory = createAsyncThunk('category/update',
    async (form) => {
        const response = await categoryService.updateCategory(form);
        return response;
    })
export const deleteCategory = createAsyncThunk('category/delete',
    async (ids) => {
        const response = await categoryService.deleteCategory(ids);
        return response;
    })

export const categorySlice = createSlice({
    name: "category",
    initialState,
    extraReducers: {
        [getAllCategory.pending]: (state) => {
            state.status = 'loading';
        },
        [getAllCategory.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.error = null;
            // console.log(action.payload)
            state.categories = action.payload.CategoryList;
        },
        [getAllCategory.rejected]: (state, action) => {
            state.status = 'failed';
            state.categories = [];
            state.error = action.payload;
        },
        [addCategory.fulfilled]: (state, action) => {
            console.log("Added")
            state.status = 'succeeded';
            state.error = null;
            // const data = ;
            // console.log(current(data));
            // state.categories = 

            state.categories = newCatogoriesList(current(state.categories), action.payload.category);
            // console.log(temp[1].children[0].children);
            // console.log(current(state.categories));
            // console.log(action.payload);
        },
        [addCategory.pending]: (state) => {
            console.log("Pending.........");
            state.status = 'loading';
            // console.log(action.payload);
        },
        [addCategory.rejected]: (state, action) => {
            console.log("Rejected");
            state.status = 'failed'
            state.error = action.payload;
            // state.categories = [];
            // console.log(action.payload);
        },
        [updateCategory.fulfilled]: (state, action) => {
            console.log("Updated Category")
            state.status = 'succeeded';
            state.error = null;
            console.log(action.payload);
        },
        [updateCategory.pending]: (state) => {
            console.log("Pending.........");
            state.status = 'loading';
            // console.log(action.payload);
        },
        [updateCategory.rejected]: (state, action) => {
            console.log("Rejected");
            state.status = 'failed'
            state.error = action.payload;
            // state.categories = [];
            // console.log(action.payload);
        },
        [deleteCategory.fulfilled]: (state, action) => {
            console.log("Deleted Category")
            state.status = 'succeeded';
            state.error = null;
            console.log(action.payload);
        },
        [deleteCategory.pending]: (state) => {
            console.log("Pending.........");
            state.status = 'loading';
            // console.log(action.payload);
        },
        [deleteCategory.rejected]: (state, action) => {
            console.log("Rejected");
            state.status = 'failed'
            state.error = action.payload;
            // state.categories = [];
            // console.log(action.payload);
        }
    }
})

export default categorySlice.reducer;