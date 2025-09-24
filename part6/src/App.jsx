import { useDispatch, useSelector } from "react-redux";
const App = () => {
  const dispatch = useDispatch();
  const value = useSelector((state) => state);
  return (
    <div className="container">
      <p>{value}</p>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
      <button onClick={() => dispatch({ type: "ZERO" })}>ZERO</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
    </div>
  );
};
export default App;
