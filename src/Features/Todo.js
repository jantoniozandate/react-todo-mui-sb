import React, { useEffect, useState } from 'react';
import { Container, CircularProgress, Typography, Box } from '@mui/material';

import { addTodo, getTodo, updateTodo } from '../Services/api';

import TodoTable from '../Components/Todo.table';
import TodoLoader from '../Components/Todo.loader';
import TodoAdd from './TodoAdd';

export default function Todo() {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(10);
  const [element, setElement] = useState({});
  const [isEditing, setEditing] = useState({});
  const [isSaving, setSaving] = useState({});

  useEffect(() => {
    async function getTodoList() {
      const [result, error] = await getTodo();

      if (error) {
        console.log('todos error', JSON.stringify(error));
        setLoading(false);
        return null;
      }

      setList(result);
      setLoading(false);
    }

    getTodoList();
  }, [isSaving]);

  const handleCheckboxChange = (indexList) => {
    const realIndex = page * pageSize + indexList;
    let todoEdit = null;
    const newList = list.map((item, index) => {
      if (index === realIndex) {
        todoEdit = { ...item, completed: !item.completed };
        return todoEdit;
      }
      return item;
    });

    updateTodo(todoEdit);
    setList(newList);
  };

  const handleSaving = async ({ title, id, completed }) => {
    let [result, error] = [null, null];
    setEditing({
      title: '',
      id: '',
      completed: false,
      userId: null,
    });
    if (id) {
      [result, error] = await updateTodo({
        id: id,
        title: title,
        completed: completed,
      });
    } else {
      [result, error] = await addTodo({
        title: title,
        completed: false,
      });
    }

    if (error) return null;
    setSaving(result);
  };

  const handleActionEdit = (indexList) => {
    const realIndex = page * pageSize + indexList;
    const todoEdit = list[realIndex];
    setEditing({
      title: todoEdit.title,
      id: todoEdit.id,
      completed: todoEdit.completed,
      userId: todoEdit.userId,
    });
  };

  const handleCancel = () => {
    setEditing({
      title: '',
      id: '',
      completed: false,
      userId: null,
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (isLoading) return <TodoLoader />;

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="center"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Box display="flex" marginTop="10">
          <Box sx={{ flexGrow: 1 }}>
            <Typography fontSize="2rem" fontWeight="700" fontFamily="Segoe UI">
              Lista de tareas
            </Typography>
          </Box>
        </Box>
        <Box borderWidth="1px" borderRadius="xl">
          <TodoTable
            list={list}
            page={page}
            pageSize={pageSize}
            handleCheckboxChange={handleCheckboxChange}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            handleActionEdit={handleActionEdit}
          />
        </Box>
      </Box>
      <TodoAdd
        editing={editing}
        onSaving={handleSaving}
        onCancel={handleCancel}
      />
    </Container>
  );
}
