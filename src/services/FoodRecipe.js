import Axios from "axios"
import AuthService from "./AuthService"
const api_endpoint = process.env.VUE_APP_SHOP_ENDPOINT || 'http://localhost:8000'

export default {
    async createFoodRecipe(data){
        try {
            let url = `${api_endpoint}/api/recipes/`
            let jwt = AuthService.getJwt();
            // let body = {
            //     name: name,
            //     detail: detail,
            //     photo: photo,
            //     user_id: user_id
            // }
            // console.log(body);
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
    async getRecipesFromName( name ){
        let url = `${api_endpoint}/api/recipes/search/${name}`
        let res = await Axios.get(url)
        return res.data
    },

    async getFoodRecipe(){
        try 
        {
            let url = `${api_endpoint}/api/recipes/`
            let res = await Axios.get(url, null,{
                headers: {
                  'Content-Type': "multipart/form-data"                
                }
            })
            if(res.status === 200){
                return {
                    success: true,
                    foodRecipe: res.data,
                }
            }else{
                console.log("NOT 200", res);
            }
        }
        catch (e) 
        {
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

    async getCurrentRecipe(id){
        try 
        {
            let url = `${api_endpoint}/api/recipes/${id}`
            //console.log();
            let res = await Axios.get(url, null,{
                headers: {
                  'Content-Type': "multipart/form-data"                
                }
            })
            if(res.status === 200){
                return {
                    success: true,
                    foodRecipe: res.data,
                }
            }else{
                console.log("NOT 200", res);
            }
        }
        catch (e) 
        {
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

    async deleteCurrent(id)
    {
        // try 
        // {
            let url = `${api_endpoint}/api/recipes/${id}`
            let jwt = AuthService.getJwt();
            console.log(jwt);
            await Axios.delete(url,{
                headers: {
                  Authorization: `Bearer ${jwt}` ,               
                }
            })

            // if(res.status === 200){
            //     return {
            //         success: true,
            //         foodRecipe: res.data,
            //     }
            // }else{
            //     console.log("NOT 200", res);
            // }
            
           
           
        // }
        // catch (e) 
        // {
        //     console.log(e.response.data.errors);
        //     if(e.response.status === 401){
        //         // console.log(e.response.data.message[0].messages[0].message);
        //         return {
        //             success: false,
        //             message: res.message
        //         }
        //     } else {
        //         let error = ""
        //         for (let items in e.response.data.errors)
        //         {
        //             // console.log(`${e.response.data.errors[items]}`);
        //             error = error  +`${e.response.data.errors[items]}` + "\n";
        //         }
        //         // console.log(error);
        //         return {
        //             success: false,
        //             message: error
        //         }
        //     }
        // }
    }




}