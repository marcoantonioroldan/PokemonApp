import React,{Component} from 'react';
import './App.css';
import Infopok from './components/infopok';
import Attapok from './components/attapok';
import axios from 'axios';
import pokebola from './assets/pokebola.png';
import golpe from './assets/golpe.png';
import charizarddf from './assets/charizard-df.png';
import charizardat from './assets/charizard-at.png';
import blastoisedf from './assets/blastoise-df.png';
import blastoiseat from './assets/blastoise-at.png';
import soundcharizarddead from './assets/charizard-dead.ogg';
import soundcharizardat from './assets/charizard-at.ogg';
import soundcharizarddf from './assets/charizard-df.ogg';
import soundblastoisedead from './assets/blastoise-dead.ogg';
import soundblastoiseat from './assets/blastoise-at.ogg';
import soundblastoisedf from './assets/blastoise-df.ogg';
import fondo from './assets/fondo.mp3';

export default class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      data: [],
      attack: 0,
      auxAttack: 0,
      flag: false,
      flagAttack: true,
      myDamage: 0,
      auxMyDamage: 0,
      flagDamage: false,
      nameAttack: '',
      nameDamage: '',
      enemyPhoto: pokebola,
      myPhoto: pokebola,
      enemySound: soundcharizarddf,
      mySound: soundblastoiseat,
      battleActive: true,
      pokemonWonName: '',
      onePokemonDeath: false,
      initText: '¡Empieza el combate!'
    };
    this.myAttack = this.myAttack.bind(this);
    this.finishBattle = this.finishBattle.bind(this);
    this.somePokemonDie = this.somePokemonDie.bind(this);
  }
  
  componentDidMount = event => {
    var fondoSound = document.getElementById("fondoSound");
    var finalScreen = document.getElementById("finalScreen");
    fondoSound.volume = 0.2;
    
    finalScreen.style.animationPlayState = "running";

    axios.get('https://www.mocky.io/v2/5cc8883a3000000b3d056264')
      .then(response => 

          this.setState({
            data: response.data,
            enemyPhoto: response.data[0].urlImg,
            myPhoto: response.data[1].urlImg
          })
        );
  }

  myAttack(power,df, name) {
    
    this.setState({
      attack: (power*2)-df > 0 ? this.state.attack + (power*2)-df : this.state.attack,
      flag: true,
      auxAttack: (power*2)-df > 0 ? (power*2)-df : 0,
      flagAttack: false,
      nameAttack: name,
      enemyPhoto: charizarddf,
      myPhoto: blastoiseat,
      enemySound: soundcharizarddf,
      mySound: soundblastoiseat
    })
    
    this.soundAttack(0);
    this.shake(2);
  
    var attackRandom = Math.floor(Math.random() * 4);
    var attackName = this.state.data[0].arAtacks[attackRandom].stAtckName;
    var attackPower = this.state.data[0].arAtacks[attackRandom].nuAtckPower;
    var myDf = this.state.data[1].nuDf; //La defensa nunca baja de 30, nunca pierde vida blastoise

      
    setTimeout(
      function() {
        if(this.state.battleActive && !this.state.onePokemonDeath){
          this.setState({
            flag: false,
            myDamage: (attackPower*2)-myDf > 0 ? this.state.myDamage + (attackPower*2)-myDf : this.state.myDamage,
            auxMyDamage: (attackPower*2)-myDf > 0 ? (attackPower*2)-myDf : 0,
            flagDamage: true,
            nameDamage: attackName,
            enemyPhoto: charizardat,
            myPhoto: blastoisedf,
            enemySound: soundcharizardat,
            mySound: soundblastoisedf
          })

          this.soundAttack(0);
          this.shake(1);

            setTimeout(
              function() {
                if(this.state.battleActive && !this.state.onePokemonDeath){ 
                  this.setState({
                    flagDamage: false,
                    flagAttack: true,
                    enemyPhoto: this.state.data[0].urlImg,
                    myPhoto: this.state.data[1].urlImg
                  })
                } else
                {
                  this.soundAttack(1);
                  this.death(1);
                }
              }
              .bind(this),
              1700
            );

        } else
        {
          this.soundAttack(2);
          this.death(2);
        }

      }
      .bind(this),
      1700
    );

  }

  finishBattle(name){
    this.setState({
      battleActive: false,
      enemySound: soundcharizarddead,
      mySound: soundblastoisedead,
      initText: '!'+name + ' ha perdido!'
    })
    console.log('Murió')
  }

  soundAttack(type){
    var enemySound = document.getElementById("enemySound");
    var mySound = document.getElementById("mySound"); 
    switch(type){
      case 0:
        enemySound.load();
        mySound.load();
        enemySound.play();
        mySound.play();
      break;
      case 1:
        mySound.load();
        mySound.play();
      break; 
      case 2:
        enemySound.load();
        enemySound.play();
      break; 
      default:
       break;
    }
  }

  shake(pokemon){
    var photo;
    switch(pokemon){
      case 1:
        photo = document.getElementById("myPhoto");
        break;
      
      case 2:
        photo = document.getElementById("enemyPhoto");
        break;
      default:
       break;
    }

    photo.style.animationPlayState = "running";

    setTimeout(
      function() {
        photo.style.animationPlayState = "paused";
      },
      1000
    );
  }

  death(pokemon){
    var photo;
    switch(pokemon){
      case 1:
        photo = document.getElementById("myPhoto");
        break;
      
      case 2:
        photo = document.getElementById("enemyPhoto");
        break;
      default:
        break;
    }

    photo.style.animationName = "opacity, shake";
    photo.style.animationDuration = "2s";
    photo.style.animationIterationCount = "1";
    photo.style.animationPlayState = "running";

    setTimeout(
      function() {
        photo.style.animationPlayState = "paused";
        var finalScreen = document.getElementById("finalScreen");
        setTimeout(
          function() {
            finalScreen.style.animationName = "openDiv";
            finalScreen.style.animationDuration = '1s';
          },
          1000
        );
      },
      1900
    );
  }

  somePokemonDie(vita, name){
    // console.log(vita + ' ' + name)
    setTimeout(
      function() {
        if(this.state.battleActive && vita <= 0){
          console.log(vita + ' ' + name);
          this.finishBattle(name);
        } 
      }
      .bind(this),
      50
    );
  }

  render() {
    const data = this.state.data;
    const attack = this.state.attack;
    const flag = this.state.flag;
    const auxAttack = this.state.auxAttack;
    const flagAttack = this.state.flagAttack;
    const myDamage = this.state.myDamage;
    const auxMyDamage = this.state.auxMyDamage;
    const nameAttack = this.state.nameAttack;
    const nameDamage = this.state.nameDamage;
    const flagDamage = this.state.flagDamage;
    const myPhoto = this.state.myPhoto;
    const enemyPhoto = this.state.enemyPhoto;
    const enemySound = this.state.enemySound;
    const mySound = this.state.mySound;
    const initText = this.state.initText;

    return (
      <div className="App bg-img h-100 w-100 position-relative">
        <div className="row position-absolute w-100 h-100 justify-content-center align-items-center">
          <div id="finalScreen" className="final-screen h-50 d-flex justify-content-center align-items-center rounded">
            <div className="final-screen-int w-50 h-50 d-flex justify-content-center align-items-center rounded">
              <p className="f48">{initText}</p>
            </div>
          </div>
        </div>
        <div className="row h-100 p-0 m-0 seg-div position-relative">
          <div className="col h-100 row p-0 m-0 seg-div position-relative">
            <div className="position-absolute attacker">
              <Infopok hp={data[0]?data[0].nuLife:'Cargando...'} 
              lvl={3} df={data[0]?data[0].nuDf:''} 
              name={data[0]?data[0].stName:'Cargando...'} 
              exp={80}
              attack={attack}
              somePokemonDie={(vita,name) => this.somePokemonDie(vita,name)}
              ></Infopok>
            </div>
            <div id="myPhoto" className="position-absolute position-relative pokeleft">
            {flagDamage ? 
              <div className="position-absolute position-relative f22 damage-2-img">
                <img alt="" className="" src={golpe}>
                </img> 
                <span className="position-absolute damage-2-text">
                {nameDamage+' - '+(auxMyDamage*2)}
                </span>
              </div>
              : ''
            }
            <img alt="" className="photo-pokemon" src={myPhoto} width="350" height="auto"></img>
            </div>
          </div>
          <div className="col h-100 row p-0 m-0 seg-div position relative">
            <div className="position-absolute defender">
              <Infopok hp={data[1]?data[1].nuLife:'Cargando...'} 
              lvl={5} df={data[1]?data[1].nuDf:''} 
              name={data[1]?data[1].stName:'Cargando...'} 
              exp={60}
              attack={myDamage}
              somePokemonDie={(vita,name) => this.somePokemonDie(vita,name)}
              ></Infopok>
            </div>
            <div id="enemyPhoto" className="position-absolute position-relative pokeright">
              {flag ? 
                <div className="position-absolute position-relative f22 damage-1-img">
                <img alt="" className="" src={golpe}>
                </img> 
                <span className="position-absolute damage-1-text">
                {nameAttack+' - '+(auxAttack*2)}
                </span>
                </div>
                : ''
              }
              <img alt="" className="photo-pokemon" src={enemyPhoto} width="450" height="auto"></img>
            </div>
          </div>
        </div>
        <div className="position-absolute attacks d-flex flex-row">
          {data[1] ? 
            data[1].arAtacks.map((element, i) => {
              return <Attapok
              key={i} 
              photo={i+1} 
              attack={element.stAtckName} 
              pp={element.nuAtckPower} 
              onClick={() => flagAttack ?
              this.myAttack(element.nuAtckPower, data[0].nuDf, element.stAtckName)
              : ''}></Attapok>
            })
            :
            ''
          }
        </div>
        <audio id="mySound">
          <source src={mySound} type="audio/ogg"/>
        </audio>
        <audio id="enemySound">
          <source src={enemySound} type="audio/ogg"/>
        </audio>
        <audio loop autoPlay id="fondoSound">
          <source src={fondo} type="audio/mp3"/>
        </audio>
      </div>
    );
  }
}
