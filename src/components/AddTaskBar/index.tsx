import { useState } from "react";
import { AddTaskContainer, AddTaskForm, AddTaskInput, SubmitTaskButton } from "./styles";
import { FaCirclePlus } from "react-icons/fa6";
import { useTasksDispatch } from "../../context/TasksContext";
import { v4 as uuidv4 } from "uuid";

const AddTaskBar = () => {
  const dispatch = useTasksDispatch();
  const [taskDescription, setTaskDescription] = useState("");

  const handleAddTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (taskDescription.trim() !== "") {
      const newTask = {
        id: uuidv4(),
        description: taskDescription,
        isCompleted: false,
      };
      dispatch({ type: "ADD_TASK", task: newTask });
      setTaskDescription("");
    }
  };

  return (
    <AddTaskContainer tabIndex={0}>
      <AddTaskForm onSubmit={handleAddTask}>
        <AddTaskInput
          onChange={(e) => setTaskDescription(e?.target?.value)}
          value={taskDescription}
          placeholder="Add new item..."
          type="text"
        />
        <SubmitTaskButton
          type="submit"
          name="done"
        >
          <FaCirclePlus color="white" size={21} />
        </SubmitTaskButton>
      </AddTaskForm>
    </AddTaskContainer>
  );
};

export default AddTaskBar;