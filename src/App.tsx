import React from 'react';
import 'shared/api/interceptors';
import Users from './pages/Users/Users';
import 'app/styles/ant.css';
import { ConfigProvider } from 'antd';

function App() {
    return (
        <ConfigProvider
            // theme={{
            //     token: {
            //         colorBgSolidHover: 'rgba(0, 0, 0, 0.75)',
            //         colorLinkHover: 'rgba(0, 0, 0, 0.75)',
            //         colorPrimaryBgHover: '#4D4E65',
            //         colorPrimaryHover: '#4D4E65',
            //         colorPrimaryTextHover: '#ffffff',
            //     },
            // }}
            wave={{ disabled: true }}
        >
            <div className="App">
                <Users />
            </div>
        </ConfigProvider>
    );
}

export default App;
