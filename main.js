const input = document.querySelector('input[name=text]');
const toggleTheme = document.querySelector('input[type=checkbox]');
const listContainer = document.querySelector('.list-container');
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

      let newItem = document.createElement("li");
      newItem.innerText = input.value;
      newItem.addEventListener('click', taskCompleted);

      listContainer.appendChild(newItem);
      
      let span = document.createElement("span");
      span.innerHTML = "&times;";

      newItem.appendChild(span);

      input.value = "";
      errorMsg.style.display = "none";
      saveTasks();

    }

    
  }


  function clearList () {

    listContainer.innerHTML = "";
    input.value = "";
    clearValue.style.display = "none";

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

    if (e.target.tagName === "SPAN") {

      e.target.parentElement.remove();
      clearValue.style.display = "none";
      saveTasks();
    }

  })

  function saveTasks () {

    localStorage.setItem('tasks', listContainer.innerHTML); 
    localStorage.setItem('theme', document.body.classList);


  }

  function loadTasks () {

    listContainer.innerHTML = localStorage.getItem('tasks');
    document.body.classList = localStorage.getItem('theme');
    

  }

  loadTasks();

addValue.addEventListener('click', addTodo);
clearValue.addEventListener('click', clearList);
