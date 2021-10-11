import axios from "axios"
import Axios from "axios"
import AuthService from "./AuthService"
const api_endpoint = process.env.VUE_APP_SHOP_ENDPOINT || 'http://localhost:8000'

export default {
    async createFoodRecipe(data){
        try {
            let url = `${api_endpoint}/api/recipes/`
            let jwt = AuthService.getJwt();
            let res = await Axios.post(url, data,{
                headers: {
                  'Content-Type': "multipart/form-data" ,
                  Authorization: `Bearer ${jwt}`,
                }
            })
            // console.log(res);
            if(res.status === 201){
                return {
                    success: true,
                    foodRecipe: res.data,
                }
            }else{
                console.log("NOT 200", res);
            }
        } catch (e) {
            console.log(e.response.data.errors);
            if(e.response.status === 400){
                // console.log(e.response.data.message[0].messages[0].message);
                return {
                    success: false,
                    message: res.message
                }
            } else {
                let error = ""
                for (let items in e.response.data.errors)
                {
                    // console.log(`${e.response.data.errors[items]}`);
                    error = error  +`${e.response.data.errors[items]}` + "\n";
                }
                // console.log(error);
                return {
                    success: false,
                    message: error
                }
            }
        }
    },
    async fetchAllRecipes(){
        try{
            const url = api_endpoint + "/api/recipes";
            const headers = AuthService.getApiHeader();
            const res = await Axios.get(url, headers);
            return res.data;
        }catch(e){
            console.log(e.message);
        }
    },
    async fetchRecipeById(id){
        try{
            const url = api_endpoint + `/api/recipes/${id}`;
            const headers = AuthService.getApiHeader();
            const res = await Axios.get(url, headers);
            return res.data;
        }catch(e){
            console.log(e.message);
        }
    },
    async deleteRecipe(data){
        let url = api_endpoint + "/userinformation/" + payload.id
        let headers = AuthService.getApiHeader()
        let res = await axios.delete(url, data)
        if(res.status === 200) {
            commit("edit", res)
            return{
                sucess: true,
                data: res
            }
        }
    },

    

}