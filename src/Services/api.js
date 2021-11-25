import axios from 'axios';
import * as _ from 'lodash';

const URL_API = 'https://todo.itl-status.me/api';

export async function getTodo() {
  try {
    const result = await axios.get(URL_API + '/todos');

    const users = await getUsers();
    const todosWithUser = result.data.map((todo, idx) => ({
      ...todo,
      userName: users[idx + 1]
        ? getInitialsFromName(users[idx + 1].name)
        : 'NA',
    }));
    return [todosWithUser, null];
  } catch (error) {
    console.log('api error', error);
    return [null, error];
  }
}

export async function updateTodo(todo) {
  try {
    const result = await axios.put(URL_API + '/todos/' + todo.id, todo);
    return [result.data, null];
  } catch (error) {
    return [null, error];
  }
}

export async function addTodo({ title, completed }) {
  try {
    const result = await axios.post(URL_API + '/todos', {
      title,
      completed,
    });
    return [result.data, null];
  } catch (error) {
    return [null, error];
  }
}

function getInitialsFromName(name) {
  return name.replace(/(\b[a-zA-Z])[a-zA-Z]* ?/gi, '$1');
}

async function getUsers() {
  const result = await axios.get('https://jsonplaceholder.typicode.com/users');
  const userDict = _.keyBy(result.data, 'id');
  console.log('userDict', userDict);
  return userDict;
}
