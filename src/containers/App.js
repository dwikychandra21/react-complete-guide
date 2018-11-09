import React, { PureComponent } from 'react';

import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import Aux from '../hoc/Auxiliary';
import withClass from '../hoc/withClass';

export const AuthContext = React.createContext(false);

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      persons: [
        {id: 'P001', name: 'Dwiky', age: 17},
        {id: 'P002', name: 'Chandra', age: 18},
        {id: 'P003', name: 'Hidayat', age: 19}
      ],
      otherState: 'some value',
      showPerson: false,
      toggleClicked: 0,
      authenticated: false
    }
    console.log('[App.js] Inside Constructor', props);
  }

  componentWillMount() {
    console.log('[App.js] Inside componentWillMount()');
  }

  componentDidMount() {
    console.log('[App.js] Inside componentDidMount()');
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('[UPDATE App.js] Inside shouldComponentUpdate()', nextProps, nextState);
  //   return nextState.persons !== this.state.persons ||
  //          nextState.showPerson !== this.state.showPerson;
  // }

  componentWillUpdate(nextProps, nextState) {
    console.log('[UPDATE App.js] Inside componentWillUpdate()', nextProps, nextState);
  }

  componentDidUpdate() {
    console.log('[UPDATE App.js] Inside componentDidUpdate()');
  }

  // switchNameHandler = (newName) => {
  //   this.setState({
  //     persons: [
  //       {name: newName,   age: "17"},
  //       {name: "Chandra", age: "18"},
  //       {name: "Hidayat", age: "19"}
  //     ]
  //   })
  // }

  deletePersonHandler = (personIndex) => {
    // a good practice is to create a copy of your person array before manipulating it

    // --bad practice (because actually get pointer to the original persons object)
    // const persons = this.state.persons;

    // --recommended practice
    // const persons = this.state.persons.slice(); // simply copy a full array
    // or
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  changeNameHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;


    this.setState({ persons: persons });
  }

  togglePersonHandler = () => {
    const doesShow = this.state.showPerson;
    this.setState( (prevState, props) => {
      return {
        showPerson: !doesShow,
        toggleClicked: prevState.toggleClicked + 1
      }
    });
  }

  loginHandler = () => {
    this.setState({authenticated: true});
  }

  render() {
    console.log('[App.js] Inside render()');
    let persons = null;

    if (this.state.showPerson) {
      persons = <Persons
                persons={this.state.persons}
                clicked={this.deletePersonHandler}
                changed={this.changeNameHandler} />
    }

    /* this can be inefficient
      () => this.switchNameHandler('Maximiliam!!')
      -- use bind syntax instead --
      this.switchNameHandler.bind(this, 'Max')
      */
    return (
      <Aux>
        <button onClick={() => {this.setState({showPerson: true})}} >Show Person</button>
        <Cockpit
          title={this.props.title}
          login={this.loginHandler}
          showPerson={this.state.showPerson}
          persons={this.state.persons}
          clicked={this.togglePersonHandler}/>
        <AuthContext.Provider value={this.state.authenticated}>
          {persons}
        </AuthContext.Provider>
      </Aux>
    );
    // what jsx actually is
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'hei this is working!'));
  }
}

export default withClass(App, classes.App);
