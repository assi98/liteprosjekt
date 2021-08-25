// @flow
/* eslint eqeqeq: "off" */

import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import {Artikkel} from "./service";



export class LayoutPaper extends Component<{header?: React.Node, to: string, bilde?: React.Node, children?: React.Node, alt?:string }> {
    render() {
        return (
        <CardOnFrontPage>
            <NavLink style={{textDecoration :'none'}}
                     activeStyle={{ color: 'dark' }}
                     to={this.props.to}>
                <img src={this.props.bilde}
                     onError={this.addDefault}
                     className= "siteImage"
                     key={"bilde"}
                     alt={this.props.alt}
                     title={this.props.alt} />
                <div className="frontOverskrift">
                    {this.props.header}
                </div>
            </NavLink>
        {this.props.children}
        </CardOnFrontPage>
        );
    }

    addDefault(ev: any) {
        ev.target.src = "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png";
    }
}





export class Marquee extends Component<{scrollamount?: React.Node, element: Artikkel[], children?: React.Node}>{
  render() {
    return (
        <marquee  behavior="scroll"
                  direction="left"
                 scrollamount = {this.props.scrollamount}>
            {this.props.element.map(art =>
                <NavLink key={art.id_a + art.postTid}
                         style={{color: "black", fontSize: 18, float :"left"}}
                         to={'/artikler/' + art.id_a}>
                    <div key={art.id_a}>
                        <div className="dot"/>
                        {art.overskrift} {art.postTid}
                    </div>
                </NavLink>
            )}
          {this.props.children}
        </marquee>

    );
  }
}

export class Alert extends Component {
  alerts: { id: number, text: React.Node, type: string }[] = [];
  static nextId = 0;

  render() {
    return (
        <>
          {this.alerts.map((alert, i) => (
              <div key={alert.id} className={'alert alert-' + alert.type} role="alert">
                {alert.text}
                <button
                    type="button"
                    className="close"
                    onClick={() => {
                      this.alerts.splice(i, 1);
                    }}
                >
                  &times;
                </button>
              </div>
          ))}
        </>
    );
  }

  static success(text: React.Node) {
    // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
    setTimeout(() => {
      for (let instance of Alert.instances()) instance.alerts.push({ id: Alert.nextId++, text: text, type: 'success' });
    });
  }

  static info(text: React.Node) {
    // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
    setTimeout(() => {
      for (let instance of Alert.instances()) instance.alerts.push({ id: Alert.nextId++, text: text, type: 'info' });
    });
  }

  static warning(text: React.Node) {
    // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
    setTimeout(() => {
      for (let instance of Alert.instances()) instance.alerts.push({ id: Alert.nextId++, text: text, type: 'warning' });
    });
  }

  static danger(text: React.Node) {
    // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
    setTimeout(() => {
      for (let instance of Alert.instances()) instance.alerts.push({ id: Alert.nextId++, text: text, type: 'danger' });
    });
  }
}

class NavBarLink extends Component<{ exact?: boolean, to: string, children?: React.Node }> {
  render() {
    return (
        <NavLink
            style ={{color : "white"}}
            className="nav-link"
             activeClassName="active"
             exact={this.props.exact} to={this.props.to}>

          {this.props.children}
        </NavLink>
    );
  }
}


export class NavBar extends Component<{ brand?: React.Node, children?: React.Node }> {
  static Link = NavBarLink;

  render() {
    return (
        <nav className="navbar navbar-expand-sm bg-light navbar-light">
          {
            <NavLink className="navbar-brand" activeClassName="active" exact to="/">
              {this.props.brand}
            </NavLink>
          }
          <ul className="navbar-nav">{this.props.children}</ul>
        </nav>
    );
  }
}


export class Card extends Component<{ title?: React.Node, children?: React.Node }> {
  render() {
    return (
        <div className="card" style={{width : "500px"}}>
          <div className="card-body" style={{padding :0}}>
            <h5 className="card-title" style={{marginBottom : "3%", fontSize:30,textAlign:"center"}}>{this.props.title}</h5>

            {this.props.children}
          </div>
        </div>

    );
  }
}


export class CardOnFrontPage extends Component<{ title?: React.Node, children?: React.Node }> {
    render() {
        return (
            <div className="card" style={{width : "500px"}}>
                <div className="card-body" style={{padding :0}}>
                    {this.props.children}
                </div>
            </div>

        );
    }
}

export class CardOnPage extends Component<{ title?: React.Node, children?: React.Node }> {
    render() {
        return (
            <div className="card" style={{width : "100%", marginBottom:"5%"}}>
                <div className="card-body" style={{padding :0}}>
                    <h5 className="card-title" style={{margin : 0}}>{this.props.title}</h5>

                    {this.props.children}
                </div>
            </div>

        );
    }
}

export class Page extends Component<{ children?: React.Node }> {
    render() {
        return (
            <div className="container" >
                <div className="row justify-content-center">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

/**
 * Renders a row using Bootstrap classes
 */
export class Row extends Component<{ children?: React.Node }> {
  render() {
    return <div className="row">{this.props.children}</div>;
  }
}

/**
 * Renders a column with specified width using Bootstrap classes
 */
export class Column extends Component<{ width?: number, right?: boolean, children?: React.Node }> {
  render() {
    return (
        <div
            className={'col' + (this.props.width ? '-' + this.props.width : '') + (this.props.right ? ' text-right' : '')}
        >
          {this.props.children}
        </div>
    );
  }
}

class ButtonSave extends Component<{ onClick: () => mixed,  children?: React.Node
}> {
    render() {
        return (
            <button
                type="button"
                className="btn btn-success"
                onClick={this.props.onClick}
                style={{ width:120, marginLeft:15, marginRight:10}} >
                {this.props.children}
            </button>
        );
    }
}

class ButtonLoad extends Component<{ onClick: () => mixed,  children?: React.Node
}> {
    render() {
        return (
            <button
                type="button"
                className="btn btn-success"
                onClick={this.props.onClick}
                style={{ width:"55%"}} >
                {this.props.children}
            </button>
        );
    }
}

export class EditArt extends Component<{ onClick: () => mixed,  children?: React.Node
}> {
    render() {
        return (
            <div  onClick={this.props.onClick} >
                {this.props.children}
            </div>
        );
    }
}


class ButtonDanger extends Component<{
  onClick: () => mixed, // Any function
  children?: React.Node
}> {

  render() {
    return (
        <button type="button" className="btn btn-danger" onClick={this.props.onClick} style={{width:120, marginLeft:"44%"}}>
          {this.props.children}
        </button>
    );
  }
}


export class Button {
    static Load  = ButtonLoad;
    static Danger = ButtonDanger;
    static Save = ButtonSave;
}


