import '@aws-amplify/ui-react/styles.css';
import '@aws-amplify/ui-react/styles/reset.layer.css' // global CSS reset
import '@aws-amplify/ui-react/styles/base.layer.css' // base styling needed for Amplify UI
import '@aws-amplify/ui-react/styles/button.layer.css' // component specific styles

import { Authenticator } from '@aws-amplify/ui-react'
import { NavBarHeader2 } from './ui-components';
import VPC_Create from './Features/VPC/VPC';
import Console from './Console/Console';


function App() {
  return (
    <Navigate to="/console" />
  );
}

export default App;
