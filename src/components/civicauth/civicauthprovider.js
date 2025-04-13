import { CivicAuthProvider } from "@civic/auth/react";

function App({ children }) {
    return (
        <CivicAuthProvider clientId="9f88d013-7a73-4005-9e4d-68130eb8aa2c">
            {children}
        </CivicAuthProvider>
    )
}