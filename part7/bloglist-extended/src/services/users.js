import axios from 'axios'
const userUrl = 'api/users'

const getAll = async () => {
    const response = await axios.get(userUrl)
    return response.data
}

export default { getAll }