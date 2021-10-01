import Axios from "axios"
const api_endpoint = process.env.VUE_APP_SHOP_ENDPOINT || 'http://localhost:8000'

export default {
    getApiHeader() {
        return {
            headers: {
                Accept: application/json,
            }
    }
},
    async createIngredient({name,quantity,unit,food_recipe_id}){
        try {
            let url = `${api_endpoint}/api/ingredients/`
            let body = {
                name: name,
                quantity: quantity,
                unit: unit,
                food_recipe_id:food_recipe_id
            }
            // let header = AuthService.getApiHeader()
            let res = await Axios.post(url, body)
            console.log(res);
            if(res.status === 201){
                return {
                    success: true,
                    ingredient: res.data,
                }
            }else{
                console.log("NOT 200", res);
            }
        } catch (e) {
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