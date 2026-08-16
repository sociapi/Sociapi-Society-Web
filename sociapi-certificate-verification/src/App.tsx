import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CertificateVerification from './components/CertificateVerification';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/verify/:certificateId" component={CertificateVerification} />
        <Route path="/verify" component={CertificateVerification} />
      </Switch>
    </Router>
  );
};

export default App;