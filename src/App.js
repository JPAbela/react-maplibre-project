import logo from './logo.svg';
import MyMap from './Map';
import './App.css';

export default function App() {
  return (
    <div>
      <h1>MapLibre Map in React</h1>
      <div className='mapBox'>
        <MyMap />
      </div>
    </div>
  );
}