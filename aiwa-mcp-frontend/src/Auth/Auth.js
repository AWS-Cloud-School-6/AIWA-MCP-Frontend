import '@aws-amplify/ui-react/styles.css';
import '@aws-amplify/ui-react/styles/reset.layer.css' // global CSS reset
import '@aws-amplify/ui-react/styles/base.layer.css' // base styling needed for Amplify UI
import '@aws-amplify/ui-react/styles/button.layer.css' // component specific styles
import { Amplify } from 'aws-amplify';
import { Authenticator } from "@aws-amplify/ui-react";
import components from './components';
import formFields from './formFields';
import awsmobile from '../aws-exports';
import { Navigate } from 'react-router-dom';
Amplify.configure(awsmobile);
function App() {

    return (
        <Authenticator
            loginMechanisms={["email"]}
            variation="modal"
            formFields={formFields}
            components={components}
        >
            <Navigate to="/console" />
            {({ signOut }) => (
                <button onClick={signOut}>Sign out</button>
            )}
        </Authenticator>
    );
}

export default App;

