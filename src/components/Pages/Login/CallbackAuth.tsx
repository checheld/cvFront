import React, { useEffect } from 'react';
import { makeUserManager } from 'react-oidc';
import NoResult from '../../Items/Search/NoResult';

function Callback() {
    // useEffect(() => {
    //     var mgr = makeUserManager({
    //         response_mode: "query",
    //     });

    //     mgr.signinRedirectCallback().then(() => (window.location.href = "/"));
    // }, []);

    // return <NoResult />;
}
export default Callback