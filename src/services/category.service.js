import axios from "../helpers/axios";

 
 const getAllCategory = ()=>{
     return axios.get('category/getcategory').then((response)=>{

        // console.log(response)
         return response.data;
     })
 }

 const addCategory = (form)=>{
     return axios.post('category/create',form).then((response)=>{
         return response.data;
     })
 }
 const updateCategory = (form)=>{
    return axios.post('category/update',form).then((response)=>{
        return response.data;
    })
 }
 const deleteCategory = (ids)=>{
    return axios.post('category/delete',{payload:ids}).then((response)=>{
        return response.data;
    })
 }
  
 const categoryService = {
    getAllCategory,
    addCategory,
    updateCategory,
    deleteCategory,
 }

 export default categoryService;