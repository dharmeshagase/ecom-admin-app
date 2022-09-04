import axios from "../helpers/axios";

 
 const getAllProduct = ()=>{
     return axios.get('admin/initialData').then((response)=>{

        // console.log(response)
         return response.data;
     })
 }

 const addProduct = (form)=>{
     return axios.post('product/create',form).then((response)=>{
         return response.data;
     })
 }

 const deleteProductById = (productId)=>{
    return axios.delete('product/deleteProductById',{data:{productId:productId}}).then((response)=>{
        return response.data;
    })
}
 
 const productService = {
    getAllProduct,
    addProduct,
    deleteProductById,
 }

 export default productService;