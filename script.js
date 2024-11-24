document.addEventListener("DOMContentLoaded", () => {
    // Sidebar navigation elements
    const todayTasksTab = document.getElementById("todayTasks");
    const scheduledTasksTab = document.getElementById("scheduledTasks");
    const settingsTab = document.getElementById("settings");
  
    // Main content sections
    const todayTasksSection = document.getElementById("todayTasksSection");
    const scheduledTasksSection = document.getElementById("scheduledTasksSection");
    const settingsSection = document.getElementById("settingsSection");
  
    // Task inputs and buttons
    const taskInput = document.getElementById("taskInput");
    const taskTimeInput = document.getElementById("taskTimeInput");
    const addTaskButton = document.getElementById("addTaskButton");
    const tasksList = document.getElementById("tasks");
    const scheduledTasksList = document.getElementById("scheduledTasksList");
  
    // Filter inputs and buttons
    const addFilterButton = document.getElementById("addFilterButton");
    const filterNameInput = document.getElementById("filterNameInput");
    const filterColorInput = document.getElementById("filterColorInput");
    const filters = document.getElementById("filters");
  
    // Store available filters
    let availableFilters = {};
  
    // Function to switch sections
    function showSection(sectionToShow) {
      todayTasksSection.classList.toggle("hidden", sectionToShow !== "today");
      scheduledTasksSection.classList.toggle("hidden", sectionToShow !== "scheduled");
      settingsSection.classList.toggle("hidden", sectionToShow !== "settings");
  
      todayTasksTab.classList.toggle("active", sectionToShow === "today");
      scheduledTasksTab.classList.toggle("active", sectionToShow === "scheduled");
      settingsTab.classList.toggle("active", sectionToShow === "settings");
    }
  
    // Initially show only Today Tasks
    showSection("today");
  
    // Sidebar navigation click events
    todayTasksTab.addEventListener("click", () => showSection("today"));
    scheduledTasksTab.addEventListener("click", () => showSection("scheduled"));
    settingsTab.addEventListener("click", () => showSection("settings"));
  
    // Function to add tasks
    function addTask(description, time, date) {
      const selectedFilter = document.querySelector('input[name="filterRadio"]:checked');
      const selectedFilter1 = document.querySelector('input[name="filterRadio"]:checked');
      const taskColor = selectedFilter ? availableFilters[selectedFilter.value] : "#000";
  
      // Add to Today Tasks
      const todayTaskItem = document.createElement("li");
      todayTaskItem.style.color = taskColor;
      todayTaskItem.innerHTML = `
        <span>${description}</span>
        ${time ? `<span class="task-time">(${time})</span>` : ""}
            ${date ? `<span class="task-date">[${date}]</span>` : ""}
        ${
          selectedFilter
            ? `<span class="filter-label" style="background-color: ${taskColor}; color: #fff; padding: 2px 5px; margin-left: 10px; border-radius: 3px;">${selectedFilter.value}</span>`
            : ""
        }
        <button class="delete-task">X</button>
      `;
      tasksList.appendChild(todayTaskItem);
  
      // Add delete functionality
      todayTaskItem.querySelector(".delete-task").addEventListener("click", () => {
        tasksList.removeChild(todayTaskItem);
      });
  
      // Add to Scheduled Tasks
      const scheduledTaskItem = todayTaskItem.cloneNode(true);
      scheduledTasksList.appendChild(scheduledTaskItem);
  
      scheduledTaskItem.querySelector(".delete-task").addEventListener("click", () => {
        scheduledTasksList.removeChild(scheduledTaskItem);
      });
    }

    // Add new filter
    addFilterButton.addEventListener("click", () => {
        const filterName = filterNameInput.value.trim();
        const filterColor = filterColorInput.value;
    
        if (filterName) {
          if (!availableFilters[filterName]) {
            availableFilters[filterName] = filterColor;
    
            const filterItem = document.createElement("li");
            filterItem.innerHTML = `
              <input type="radio" name="filterRadio" value="${filterName}">
              <span style="color: ${filterColor}; font-weight: bold;">${filterName}</span>
              <button class="delete-filter">X</button>
            `;
    
            filters.appendChild(filterItem);
    
            // Delete filter functionality
            filterItem.querySelector(".delete-filter").addEventListener("click", () => {
              delete availableFilters[filterName];
              filters.removeChild(filterItem);
    
              const selectedFilter = document.querySelector('input[name="filterRadio"]:checked');
              if (selectedFilter && selectedFilter.value === filterName) {
                selectedFilter.checked = false;
              }
            });
  
    // Add task button click event

    addTaskButton.addEventListener("click", () => {
        const description = taskInput.value.trim();
        const time = taskTimeInput.value;
        const date = document.getElementById("taskDateInput").value;
      
        if (description) {
          addTask(description, time, date);
          taskInput.value = "";
          taskTimeInput.value = "";
          document.getElementById("taskDateInput").value = "";
        } else {
          alert("Please enter a task description.");
        }
      });

    // Add to Today Tasks
  const todayTaskItem = document.createElement("li");
  todayTaskItem.style.color = taskColor;
  todayTaskItem.innerHTML = `
    <span>${description}</span>
    ${date ? `<span class="task-date">[${date}]</span>` : ""}
    ${time ? `<span class="task-time">(${time})</span>` : ""}
    ${
      selectedFilter
        ? `<span class="filter-label" style="background-color: ${taskColor}; color: #fff; padding: 2px 5px; margin-left: 10px; border-radius: 3px;">${selectedFilter.value}</span>`
        : ""
    }
    <button class="delete-task">X</button>
  `;
  tasksList.appendChild(todayTaskItem);
  
    
  
          // Clear input fields
          filterNameInput.value = "";
          filterColorInput.value = "#ff0000";
        } else {
          alert("Filter name already exists.");
        }
      } else {
        alert("Please enter a filter name.");
      }
    });
  });
  