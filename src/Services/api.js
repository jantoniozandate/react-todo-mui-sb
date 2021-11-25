import axios from 'axios';
// import * as _ from "lodash";

const URL_API = 'https://todo.itl-status.me/api';

export default async function getTodo() {
  try {
    const result = await axios.get(URL_API + '/todos');

    return [result.data, null];
  } catch (error) {
    console.log('api error', error);
    return [null, error];
  }
}
