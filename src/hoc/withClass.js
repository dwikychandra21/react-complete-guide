import React, {Component} from 'react';

// this witchClass function is not a functional component
// it's a normal function which then returns a function which
// qualifies as a functional component

// const withClass = (WrappedComponent, className) => {
//   return (props) => (
//     <div className={className}>
//       <WrappedComponent {...props} />
//     </div>
//   )
// };

const withClass = (WrappedComponent, className) => {
  const WithClass = class extends Component {
    render() {
      return (
        <div className={className}>
          <WrappedComponent ref={this.props.forwadedReferences} {...this.props} />
        </div>
      )
    }
  }

  return React.forwardRef((props, ref) => {
    return <WithClass {...props} forwadedReferences={ref} />
  });
}

export default withClass;
