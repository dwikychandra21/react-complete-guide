import React from 'react';

import classes from './Cockpit.css';
import Aux from '../../hoc/Auxiliary';

const cockpit = (props) => {
      let assignedClasses = [];
      let btnClasses = classes.button;

      if (props.showPerson) {
        btnClasses = [classes.button, classes.button.red].join(' ');
      }

      if (props.persons.length <= 2) {
        assignedClasses.push( classes.red ); // classes = ['red'];
      }
      if (props.persons.length <= 1) {
        assignedClasses.push( classes.bold ); // classes = ['red', 'bold'];
      }

      return(
        <Aux>
          <h1>{props.title}</h1>
          <p className={assignedClasses.join(' ')}> this is working !</p>
          <button className={btnClasses} onClick={ props.clicked }>Toggle Person</button>
          <button onClick={props.login}>Login</button>
        </Aux>
      );
}

export default cockpit;
