import html from '../core.js';
function Header(){
    return html`
        <header class="header">
            <div class="img-note"></div>
            <h1>todos list</h1>
            <h3>User manual todos list:</h3>
            <p class="instruct" >Update ListItem: Double Click on Text ListItem => Enter</p>
            <input class="new-todo" 
                placeholder="What needs to be done?" autofocus
                onkeyup="event.keyCode === 13 && dispatch('add', this.value.trim())"
            >
        </header>
    `;
}
export default Header;