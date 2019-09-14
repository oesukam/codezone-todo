/* Task input block */
const taskInputElt = document.querySelector('.header__input');
const taskAddButtonElt = document.querySelector('.header__button');

/* Task input block */
const taskFilterElt = document.querySelector('.filter__input');
const taskFilterButtonElt = document.querySelector('.filter__button');

const tasksElt = document.querySelector('.tasks');

const tasks = [];

taskInputElt.addEventListener('keyup', e => {
  if (e.keyCode === 13 && e.target.value) {
    tasks.unshift({ content: e.target.value });
    e.target.value = '';
    console.log(JSON.stringify(tasks, undefined, 2));
    loadTasks();
  }
});

taskAddButtonElt.addEventListener('click', () => {
  tasks.unshift({ content: taskInputElt.value });
  taskInputElt.value = '';
  loadTasks();
});

const filterTasks = tasks => {
  return tasks.filter(task => {
    return task.content
      .toLowerCase()
      .includes(taskFilterElt.value.toLowerCase());
  });
};

taskFilterElt.addEventListener('keyup', e => {
  const { value } = e.target;
  if (e.keyCode === 13) {
    const filteredTasks = filterTasks(tasks);
    console.log(JSON.stringify(filteredTasks, undefined, 2));
  }
});

taskFilterButtonElt.addEventListener('click', e => {
  const filteredTasks = filterTasks(tasks);
  console.log(JSON.stringify(filteredTasks, undefined, 2));
});

const loadTasks = () => {
  tasksElt.innerHTML = tasks.map(
    (task, index) => `
    <div class="task">
      <div class="task__content">${task.content}</div>
      <button 
        class="task__action"
        data-index="${index}"
        onclick="deleteTask(${index})"
      >
        Delete
      </button>
    </div>
  `
  );
};

const deleteTask = index => {
  tasks.splice(index, 1);
  loadTasks();
};
