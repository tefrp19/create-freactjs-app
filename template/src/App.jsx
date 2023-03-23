import FReact from "freactjs";
import './App.css'

function Counter() {
    const [state, setState] = FReact.useState(1);
    return (
        <h1 onClick={() => setState(c => c + 1)}>
            Count: {state}
        </h1>
    );
}

const App = <Counter/>


export default App
