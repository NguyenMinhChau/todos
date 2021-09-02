// Destructuring - Phần viết template View của chúng ta
export default function html([first, ...strings], ...values){
    return values.reduce((acc,cur) => acc.concat(cur,strings.shift()),[first])
    .filter( x => x && x !== true || x === 0)
    .join('');
}

// createStore nhận 1 callback reducer
export function createStore(reducer){
    let state = reducer(); // reducer() return lại giá trị ban đầu của thằng Store

    // roots: Dùng để chứa các Element dùng để render ra view
    // Map(): Object đặc biệt -> có tính chất lặp qua -> có thể đặt key bằng bất kì kiểu dữ liệu gì trong Javascript
    const roots = new Map();

    function render(){
        // root là thành phần được lưu tại const roots = new Map();
        // component là thành phần chứa view của chúng ta
        for( const [root,component] of roots ){
            const output = component() // Lấy ra HTML -> component() return ra HTML của chúng ta
            root.innerHTML = output;
        }
    }
    // return ra các phương thức để có thể làm việc với createStore()
    return {

        // Giúp nhận cái view -> rồi đẩy ra cái root bên file HTML
        attach (component, root){
            // khi nhận được component và root thì set nó vào const roots = new Map();
            // root: là key; component: là value
            roots.set(root, component);
            // Rồi render ra View
            render();
        }, 

        // Kết nối giữa Store và View
        // selector: đc hiểu là lựa chọn 1 dữ liệu cụ thể trong Store
        // selector nhận 1 đối số là state và return về chính nó luôn
        connect (selector = state => state){
            // Nhận lại 1 hàm khác -> Hàm đó nhận 1 đối số là component của chúng ta
            // props: là những dữ liệu mà chúng ta muốn truyền vào component sau này
            return component => (props, ...args) => 
                // Truyền tất cả dữ liệu vào component
                component(Object.assign({},props, selector(state), ...args))
        }, 

        // Thực hiện hành động
        dispatch(action, ...args){
            // reducer tính chất được hiểu giống như reduce trong mảng
            // reduce(acc,cur,...args)
            state = reducer(state, action, args);
            render();
        }
    }
}