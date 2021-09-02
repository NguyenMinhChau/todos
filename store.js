import { createStore } from "./core.js";
import reducer from "./reducer.js";
import withLogger from './logger.js';
// Những phương thức CreateStore trả về bên file core.js
// Dùng Destructuring để nhận những phương thức CreateStore trả về
const {attach, connect, dispatch} = createStore(withLogger(reducer))
window.dispatch = dispatch;
export {
    attach, 
    connect
}