import React,{Component} from 'react'
import { ProgressBar } from 'react-bootstrap';
import './infopok.css'

class Infopok extends Component{

    render(){
        const name = this.props.name;
        const lvl = this.props.lvl;
        const hp = this.props.hp;
        const exp = this.props.exp;
        const df = this.props.df;
        const attack = this.props.attack;
        var vita = hp-attack > 0 ? hp-attack : (hp-attack <= 0 ? 0 : hp);
        this.props.somePokemonDie(vita,name);

        return(
            <div className="hex-item-border hexagon d-flex mt-4" style={{'--hexBackground':'white', '--hexHeigh':'105px', '--hexWidth':'415px'}}>
                <div className=" hex-item-inner hexagon m-auto d-flex position-relative" style={{'--hexBackground':'var(--bg-hex)', '--hexHeigh':'95px', '--hexWidth':'405px'}}>
                    <div className="position-absolute position-relative w-100 name-div text-left align-items-center">
                        <span className="f31 position-absolute name">
                            {name}
                        </span>
                        <span className="f31 position-absolute lvl">
                            Lvl <span>{lvl}</span>
                        </span>
                    </div>
                    <div className="hex-item-content col-12 row m-auto">
                        <div className="row col-12 w-100 mt-4 ml-3 p-0 align-items-center">
                            <span className="f19 mr-2">HP</span>
                            <div className="bar">
                                <ProgressBar id="bar1" className="bar-intern" now={vita} 
                                    label={`${vita}/${hp}`} />
                            </div>
                            <span className="f19 ml-2 font-weight-bold">{'+('+df+')Df'}</span>
                            
                        </div>
                        <div className="row w-100 ml-1 align-items-center p-0">
                            <span className="f19 mr-2">Exp</span>
                            <div className="bar">
                                <ProgressBar id="bar2" className="bar-intern" now={70} />
                            </div>
                            <span className="f19 ml-2">{exp}%</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Infopok;