import html from '../core.js';
import { connect } from '../store.js'
const connector = connect();
function Footer({todos, filter, filters}){
    return html`
    <footer class="footer">
        <span class="todo-count">
            <strong>${todos.filter(filters.active).length}</strong> active item
        </span>
        <ul class="filters">
            ${Object.keys(filters).map(type => html `
                <li title="Filter ${type[0].toUpperCase() + type.slice(1)}">
                    <a class="${filter === type && 'selected'}" href="#" onclick="dispatch('switchFilter', '${type}')">
                        ${type[0].toUpperCase() + type.slice(1)}
                    </a>
                </li>
            `)}
        </ul>
        ${todos.filter(filters.completed).length > 0 && 
            html `  <button class="clear-completed" 
                        onclick="dispatch('clearCompleted')">Clear all completed
                    </button> 
            `}
    </footer>
    `;
}
export default connector(Footer);