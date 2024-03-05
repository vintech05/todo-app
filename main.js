const input = document.querySelector('input[name=text]');
const toggleTheme = document.querySelector('input[type=checkbox]');
const listContainer = document.querySelector('.list-container');
const indicatorTab = document.querySelector('.indicator-tab');
const optionTab = document.querySelectorAll('.indicator-tab__option');
const placeholder = document.querySelector('.text-display');
const addValue = document.querySelector('.add-btn')
const clearValue = document.querySelector('.clr-btn')
const errorMsg = document.querySelector('.error-msg')


function addTodo (e) {

    if (input.value === "") {

        errorMsg.style.display = "block";
        errorMsg.style.color = "red";
        errorMsg.innerText = "Please enter a value";
        
        e.preventDefault()

    } else if (input.value.length > 30) {

        errorMsg.style.display = "block";
        errorMsg.style.color = "red";
        errorMsg.innerText = "Please enter a value less than 30 characters";

        e.preventDefault()


    } else {

        clearValue.style.display = "block";
        indicatorTab.style.display = "flex";

        let newItem = document.createElement("li");
        newItem.innerText = input.value;
        newItem.classList.add('todo-item');
        newItem.addEventListener('click', taskCompleted);

        listContainer.appendChild(newItem);
        
        let span = document.createElement("span");
        span.innerHTML = "&times;";

        newItem.appendChild(span);

        input.value = "";
        errorMsg.style.display = "none";
        placeholder.style.display = "none";
        saveTasks();

    }

    
  }

  function clearList () {

    listContainer.innerHTML = "";
    input.value = "";
    clearValue.style.display = "none";
    placeholder.style.display = "block";
    indicatorTab.style.display = "none";
    localStorage.removeItem('tasks');

  }

  function taskCompleted () {

    this.classList.toggle('checked');
    saveTasks();

  }

  toggleTheme.addEventListener('click', () => {

    document.body.classList.toggle('dark-theme');

    saveTasks();

  });

  listContainer.addEventListener('click', (e) => {

    if (e.target.tagName === "SPAN" || listContainer.innerHTML === "" ) {

      e.target.parentElement.remove();
      clearValue.style.display = "none";
      saveTasks();

      }
      return;
  })
  

  function setActive (element) {

      optionTab.forEach(option => option.classList.remove('active'));
      element.classList.add('active');

      const todoItems = document.querySelectorAll('.todo-item');
      const filter = element.querySelector('span').textContent.toLowerCase();
      
      todoItems.forEach(item => {
      const isFinished = item.classList.contains('checked');
      const isUnfinished = !isFinished;

      if (filter === 'all') {
        item.style.display = 'block';
        
      } else if (filter === 'finished' && isFinished) {
        item.style.display = 'block';

      } else if (filter === 'unfinished' && isUnfinished) {
        item.style.display = 'block';

      } else {
        item.style.display = 'none';
      }
  });

  

}

optionTab.forEach(option => {
  option.addEventListener('click', () => setActive(option));
});

  function saveTasks () {

    localStorage.setItem('tasks', listContainer.innerHTML); 
    localStorage.setItem('theme', document.body.classList);

  }

  function loadTasks () {

    // console.log("loadTasks function called");
    document.body.classList = localStorage.getItem('theme');

    const storedTasks = localStorage.getItem('tasks');

    if (storedTasks) {

      // console.log("Tasks are stored, hiding placeholder");
      listContainer.innerHTML = storedTasks;

      placeholder.style.display = "none";

    } else {
      
      // console.log("No tasks are stored, showing placeholder");
      listContainer.innerHTML = "";
      placeholder.style.display = "block";

    }
    saveTasks();
  }

  loadTasks();

addValue.addEventListener('click', addTodo);
clearValue.addEventListener('click', clearList);
