import Axios from "axios"
const api_endpoint = process.env.VUE_APP_SHOP_ENDPOINT || 'http://localhost:8000'

export default {
    async createFoodRecipe(data){
        try {
            let url = `${api_endpoint}/api/recipes/`
            // let body = {
            //     name: name,
            //     detail: detail,
            //     photo: photo,
            //     user_id: user_id
            // }
            // console.log(body);
            let res = await Axios.post(url, data,{
                headers: {
                  'Content-Type': "multipart/form-data"                
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

}