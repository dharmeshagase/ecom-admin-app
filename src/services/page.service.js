import axios from "../helpers/axios";

const createPage = (form)=>{
    return axios.post('page/create',form).then((response)=>
    {return response.data}
    );
}

const pageService = {
    createPage
}

export default pageService;