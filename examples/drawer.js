import React from 'react';
import ReactDOM from 'react-dom';
import Drawer from '@zswang/react-drawer';

class CustomizedDrawer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Drawer ref={element => (this.drawer = element)}>
          <div>hello world!</div>
        </Drawer>
        <button onClick={() => this.drawer.open()}>Open</button>
      </div>
    );
  }
}

ReactDOM.render(
  <CustomizedDrawer />,
  document.getElementById('__react-content')
);
