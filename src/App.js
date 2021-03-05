import Carousel from "./Components/Carousel";
import './Components/assets/css/App.css';

const App = () => {
  return (
      <div>
        <Carousel looped={true}>
          <div style={{width: '90%'}}>
            <h1>Literally any HTML CONTENT</h1>
            <p>You can wrap anything in this container 'Content'</p>
            <p>But it should fit the size of the carousel itself, overflow is hidden anyway</p>
          </div>
          <img
              style={{width: '100%'}}
              src='https://images.unsplash.com/photo-1488654715439-fbf461f0eb8d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80'
              alt=''
          />
          <img
              style={{width: '100%'}}
              src='https://images.unsplash.com/photo-1542767673-ee5103fedbb1?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1400&q=80'
              alt=''
          />
          <img
              style={{width: '100%'}}
              src='https://images.unsplash.com/photo-1516836378273-db6cea41d84c?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1400&q=80'
              alt=''
          />
          <img
              style={{width: '100%'}}
              src='https://images.unsplash.com/photo-1528650765831-7f2254800a83?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80'
              alt=''
          />
          <img
              style={{width: '100%'}}
              src='https://images.unsplash.com/photo-1583125311319-300af4db4abc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1398&q=80'
              alt=''
          />
          <img
              style={{width: '100%'}}
              src='http://arcanumdeepsecrets.files.wordpress.com/2010/06/blast_500x500.jpg'
              alt=''
          />
          <img
              style={{width: '80%'}}
              src='https://i.imgflip.com/3bug1o.png'
              alt=''
          />

        </Carousel>
      </div>
  );
};

export default App;
