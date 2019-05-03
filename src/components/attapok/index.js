import React,{Component} from 'react'
import attack1 from '../../assets/attack1.png'
import attack2 from '../../assets/attack2.png'
import attack3 from '../../assets/attack3.png'
import attack4 from '../../assets/attack4.png'
import './attapok.css'

class Attapok extends Component{

  render(){
    const pp = this.props.pp;
    const photo = this.props.photo;
    const attack = this.props.attack;

    return(
      <div className="row col ext-rect justify-content-center align-items-center text-center pt-2 pb-2 mr-4" onClick={this.props.onClick}>
        <span className="f25">{attack}</span>
        <div className="row col mid-rect justify-content-center align-items-center">
        <div className="row col f19 int-rect position-relative justify-content-end align-items-center d-flex flex-column">
          <img alt="" src={this.selectPhoto(photo)} className="position-absolute" />
          <span>Normal</span>
          <span>PP {(pp*2)}</span>
        </div>
        </div>
      </div>
    );
  }

  selectPhoto(num){
    var attack;
    switch(num){
      case 1:
        attack = attack1;
      break;
      case 2:
        attack = attack2;
      break;
      case 3:
        attack = attack3;
      break;
      case 4:
        attack = attack4;
      break;
      default:
        attack = ''
        break;
    }

    return attack;
  }
}

export default Attapok;