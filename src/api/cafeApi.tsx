import axios from "axios";

const baseURL = "https://cafe-react-native-bk.herokuapp.com";

const cafeApi = axios.create({ baseURL });

export default cafeApi;