import { version, Component } from 'inferno';
import '../registerServiceWorker';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>Algolia App</h2>
      </div>
    );
  }
}

export default App;



// components:
  // search box
  // list of apps found (hits)
    // a way to sort the results by rank ASC or rank DESC (default)
  // categories filtering (faceting)
