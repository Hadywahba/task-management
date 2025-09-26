interface TaskFormProps {
  type: 'add' | 'edit';
}

function TaskForms({ type }: TaskFormProps) {
  return <div>{type === 'add' ? <h1>Add Task</h1> : <h1>Edit Task</h1>}</div>;
}
export default TaskForms;
