import axios from "axios";
let AdminApi = axios.create({
    baseURL: "http://localhost:3000/admin"
})
export const login = async (signInData) => {
    try {
        let loginData = await AdminApi.post('/login', signInData);
        return loginData.data
    } catch (error) {
        console.log(error.message);
    }
}

export const userDetails = async () => {
    try {
        let userData = await AdminApi.get('/userdetails')
        return userData.data

    } catch (error) {
        console.log(error.message);
    }
}

export const loadDetails = async (id) => {
    try {
        let details = await AdminApi.post('/loaddetails', { id });
        return details.data
    } catch (error) {
        console.log(error.message);
    }
}

export const updateUser = async ({ name, email, number, designation, course, gender, image, id }) => {
    try {
        console.log(name);
        const data = new FormData()
        data.append("id", id)
        data.append("name", name)
        data.append("email", email)
        data.append("number", number)
        data.append("designation", designation)
        data.append("course", course)
        data.append("gender", gender)
        data.append("image", image)
        const config = {
            header: {
                "content-type": "multipart/form-data",
                userId: id,
            },
            withCredentials: true,
        };

        let updatedData = await AdminApi.post('/updateuser', data, config)
        return updatedData.data
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteUser = async (id) => {
    let afterDeleted = await AdminApi.post('/delete', { id })
    return afterDeleted.data
}

export const addUserApi = async (userDetails) => {
    let data = await AdminApi.post('/adduser', userDetails)
    return data.data
}