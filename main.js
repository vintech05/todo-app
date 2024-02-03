const input = document.querySelector('input[name=text]');
const toggleTheme = document.querySelector('input[type=checkbox]');
const listContainer = document.querySelector('.list-container');
const addValue = document.querySelector('.add-btn')
const clearValue = document.querySelector('.clr-btn')
const errorMsg = document.querySelector('.error-msg')

loadTasks();

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

      let newItem = document.createElement("li");
      newItem.innerText = input.value;

      listContainer.appendChild(newItem);
      newItem.addEventListener('click', taskCompleted); 
      
      let span = document.createElement("span");
      span.innerHTML = "&times;";

      newItem.appendChild(span);

      input.value = "";
      errorMsg.style.display = "none";

    }

    saveTasks();
    
  }


  function clearList () {

    listContainer.innerHTML = "";
    input.value = "";
    clearValue.style.display = "none";
    localStorage.removeItem('tasks');

  }

  function taskCompleted (e) {

    this.style.textDecoration = "line-through";
    this.style.color = "#555";
    saveTasks();

  }

  toggleTheme.addEventListener('click', () => {

    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');

  });

  listContainer.addEventListener('click', (e) => {

    if (e.target.tagName === "SPAN") {

      e.target.parentElement.remove();
      clearValue.style.display = "none";
      
    }

  })

  // Function to save tasks to localStorage
function saveTasks() {

  const tasks = Array.from(listContainer.children).map(item => item.innerText);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  
}

// Function to load tasks from localStorage
function loadTasks() {

  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {

      let newItem = document.createElement("li");
      newItem.innerText = task;
      listContainer.appendChild(newItem);
      newItem.addEventListener('dblclick', taskCompleted);

      // Add the close button and its event listener
      let span = document.createElement("span");
      span.innerHTML = "&times;";
      span.addEventListener('click', (e) => {
        e.stopPropagation();
        e.target.parentNode.remove();
        saveTasks(); // Save tasks after removal
      });
      newItem.appendChild(span);
  });
}

document.body.classList.add(localStorage.getItem('theme') || 'light');
addValue.addEventListener('click', addTodo);
clearValue.addEventListener('click', clearList);
