
// const baseUrl = location.hostname === "localhost"?"http://localhost:2000": "https://flipkart-admin-website.herokuapp.com"
const baseUrl = "https://flipkart-backend-rest-server.herokuapp.com";
export const api = `${baseUrl}/api`;

export const generatePublicImageUrl = (filename)=>{
    return `${baseUrl}/public/${filename}`;
}