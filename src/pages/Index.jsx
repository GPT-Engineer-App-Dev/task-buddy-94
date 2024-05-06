import { useState } from 'react';
import { Box, Button, Container, Flex, IconButton, Input, List, ListItem, Text, useToast, VStack } from '@chakra-ui/react';
import { FaTrash, FaCheckCircle } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const addTask = () => {
    if (input.trim() === '') {
      toast({
        title: 'No task entered',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: input, isCompleted: false }]);
    setInput('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleCompletion = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
  };

  return (
    <Container maxW="container.md" p={4}>
      <VStack spacing={4}>
        <Text fontSize="2xl" fontWeight="bold">Todo App</Text>
        <Flex as="form" onSubmit={(e) => { e.preventDefault(); addTask(); }} width="100%">
          <Input placeholder="Add a new task" value={input} onChange={(e) => setInput(e.target.value)} />
          <Button ml={2} colorScheme="blue" px={8} type="submit">Add</Button>
        </Flex>
        <List width="100%">
          {tasks.map(task => (
            <ListItem key={task.id} display="flex" justifyContent="space-between" alignItems="center" p={2} borderWidth="1px" borderRadius="lg">
              <Text as={task.isCompleted ? 's' : ''}>{task.text}</Text>
              <Flex>
                <IconButton icon={<FaCheckCircle />} aria-label="Complete Task" onClick={() => toggleCompletion(task.id)} colorScheme={task.isCompleted ? "green" : "gray"} />
                <IconButton icon={<FaTrash />} aria-label="Delete Task" ml={2} onClick={() => deleteTask(task.id)} colorScheme="red" />
              </Flex>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;