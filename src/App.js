
import Carousel from "./Components/Carousel";
import Content from "./Components/Content";
import './Components/assets/css/App.css';

const App = () => {
  return (
    <Carousel looped={true}>
      <Content>
        <div style={{width: '90%'}}>
          <h1>Literally any HTML CONTENT</h1>
          <p>You can wrap anything in this container 'Content'</p>
          <p>But it should fit the size of the carousel itself, because overflow is hidden anyway</p>
        </div>
      </Content>

      <Content>
        <img
            width='300'
            height='300'
            src='https://i.imgflip.com/3bug1o.png'
            alt=''
        />
      </Content>

      <Content>
        <img
            width='500'
            height='500'
            src='http://arcanumdeepsecrets.files.wordpress.com/2010/06/blast_500x500.jpg'
            alt=''
        />
      </Content>

      <Content>
        <div>
          <h1>Dear Diary!</h1>
          <p>My life is great, and I love this day, it makes me feel fulfilled or something, I have perfect...</p>
        </div>
      </Content>
    </Carousel>
  );
};

export default App;
