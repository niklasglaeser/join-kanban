function headerTemplate() {
 
    return `
        <div id="header">
            <div id="headerText">Kanban Project Management Tool</div>
            <div id="headerRight">
                <div id="helpLink"><img src="img/help.svg"></div>
                <div id="userProfile" onclick="toggleDropdown()">U</div>
                <div id="dropdownContent">
                    <a href="#">Legal notice</a>
                    <a href="#">Privacy Policy</a>
                    <a href="index.html">Logout</a>
                </div>
            </div>
        </div>
    `;
}


function sidebarTemplate() {

    return `
        <div id="sidebar">
            <img src="img/join-logo-alternative.svg" id="joinLogoSidebar">
            <div class="sidebar-link-container">
                <div class="sidebar-link summary-link">
                    <img src="img/summary.svg">
                    <div onclick="">Summary</div>
                </div>
                <div class="sidebar-link add-task-link">
                    <img src="img/add-task.svg">
                    <div onclick="">Add Task</div>
                </div>
                <div class="sidebar-link board-link">
                    <img src="img/board.svg">
                    <div onclick="">Board</div>
                </div>
                <div class="sidebar-link contacts-link">
                    <img src="img/contacts.svg">
                    <div onclick="">Contacts</div>
                </div>
            </div>
            <div class="sidebar-footer">
                <div onclick="">Privacy Policy</div>
                <div onclick="">Legal notice</div>
            </div>
        </div>
    `;
}

