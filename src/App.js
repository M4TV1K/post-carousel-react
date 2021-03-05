import Carousel from "./Components/Carousel";
import './Components/assets/css/App.css';

const App = () => {
  return (
      <div>
        <Carousel looped={true}>
          <div style={{width: '90%'}}>
            <h1>Literally any HTML CONTENT</h1>
            <p>Just add any content to the carousel and it will be wrapped automatically</p>
            <p>But it should fit the size of the carousel itself, overflow is hidden anyway</p>
            <p>P.S. If you want one slide to contain few html tags, just write them in the container (e.g. div)</p>
          </div>
        </Carousel>
      </div>
  );
};

export default App;
