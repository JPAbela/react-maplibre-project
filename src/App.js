import logo from './logo.svg';
import MyMap from './Map';
import './App.css';

export default function App() {
  return (
    <>
      <h1 style={{position:'absolute', left:'40%'}}>DC Crime Data 2024</h1>
      <div className='mapBox'>
        <MyMap />
      </div>
    </>
  );
}