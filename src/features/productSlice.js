import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import categoryService from "../services/category.service";
import productService from "../services/product.service";

const initialState = {
    product: [],
    status: 'idle',
    error: null
}

// const newCatogoriesList = (categoryList, newCategory) => {
//     // console.log(categoryList)
//     // console.log(newCategory);
//     categoryList = JSON.parse(JSON.stringify(categoryList));
//     if(newCategory.parentId == undefined)
//     {
//         const newObj = {
//                     _id: newCategory._id,
//                     name: newCategory.name,
//                     slug: newCategory.slug,
//                     children: []
//                 }
//         return categoryList.concat(newObj);
//     }
//     return categoryList.map((cat)=>{
//         if(cat._id === newCategory.parentId){
//             const newObj = {
//                 _id: newCategory._id,
//                 name: newCategory.name,
//                 slug: newCategory.slug,
//                 parentId: newCategory.parentId,                
//                 children: []
//             }
//             // newCategory.children = [];
//             // console.log(typeof(cat.children));
//             // let children = cat.children;
//             // cat.children = [...children,newObj];
//             // cat.children = Object.assign([],cat.children);
//             cat.children.push(newObj);
//             // cat.chidlren=cat.children.concat(newObj);
//             console.log(cat.children);
//         }
//         if(cat.children && cat.children.length > 0)
//         cat.children = newCatogoriesList(cat.children,newCategory);
//         console.log(cat);
//         return cat;
//     })
// }

export const getAllProduct = createAsyncThunk('product/getall',
    async () => {
        const response = await productService.getAllProduct();
        return response;
    })
export const addProduct = createAsyncThunk('product/create',
    async (form,{dispatch}) => {
        const response = await productService.addProduct(form);
        return await dispatch(getAllProduct());
    }
)
export const deleteProductById = createAsyncThunk('product/deleteProductById',
    async (productId,{dispatch}) => {
        const response = await productService.deleteProductById(productId);
        return await dispatch(getAllProduct());
    }
)


export const productSlice = createSlice({
    name: "product",
    initialState,
    extraReducers: {
        [getAllProduct.pending]: (state) => {
            state.status = 'loading';
        },
        [getAllProduct.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.error = null;
            state.product = action.payload.product;
            console.log(action.payload)
        },
        [getAllProduct.rejected]: (state, action) => {
            state.status = 'failed';
            state.product = [];
            state.error = action.payload;
        },
        [addProduct.fulfilled]: (state, action) => {
            console.log("Added")
            state.status = 'succeeded';
            state.error = null;
            // state.product = action.payload;
            // console.log(action.payload);
        },
        [addProduct.pending]: (state) => {
            console.log("Pending.........");
            state.status = 'loading';
            // console.log(action.payload);
        },
        [addProduct.rejected]: (state, action) => {
            console.log("Rejected");
            state.status = 'failed'
            state.error = action.payload;
        },
        [deleteProductById.fulfilled]: (state, action) => {
            console.log("Deleted")
            state.status = 'succeeded';
            state.error = null;
            // state.product = action.payload;
            // console.log(action.payload);
        },
        [deleteProductById.pending]: (state) => {
            console.log("Pending");
            state.status = 'loading';
            // console.log(action.payload);
        },
        [deleteProductById.rejected]: (state, action) => {
            // console.log("Rejected");
            state.status = 'failed'
            state.error = action.payload;
        }
    }
})

export default productSlice.reducer;