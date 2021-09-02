import html from '../core.js';
import { connect } from '../store.js';
const connector = connect();
function TodoItem( {todo , index, editIndex} ){
    return html`
    <li class="${todo.completed && 'completed'} ${editIndex === index && 'editing'}" title="Double Click -> Edit">
        <div class="view">
            <input class="toggle" type="checkbox" 
                ${todo.completed && 'checked'}
                onchange="dispatch('toggle', ${index})"
                title="Checked"
            >
            <label class="view-label" ondblclick="dispatch('startEdit', ${index})">${todo.title}</label>
            <button class="destroy" onclick="dispatch('destroy', ${index})" title="Delete"></button>
        </div>
        <input class="edit" value="${todo.title}"
            onkeyup ="event.keyCode === 13 && dispatch('endEdit', this.value.trim()) 
            || event.keyCode === 27 && dispatch('cancelEdit')"
            onblur = "dispatch('endEdit', this.value.trim())"
        >
    </li>
    `;
}
export default connector(TodoItem);