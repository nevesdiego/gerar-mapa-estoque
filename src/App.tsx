import React, { useEffect, useState } from 'react';
import './App.css';
import { loadMessages, locale } from 'devextreme/localization';
import ptMessages from "devextreme/localization/messages/pt.json";
import { AppContext } from './context/AppContext';
import { Form } from './components/Form/Form';
import 'devextreme/dist/css/dx.light.css';


function App() {

  const [token, setToken] = useState('')
  let staticToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjQxNzQzMjM1REFEQjgzQzExNTA4MEYxNjk2NjJCNzU0IiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE2ODU3MzU2NjksImV4cCI6MTY4NTczOTI2OSwiaXNzIjoiaHR0cHM6Ly9hdXRoLmNvc21vc3Byby5jb20uYnIiLCJhdWQiOiJodHRwczovL2F1dGguY29zbW9zcHJvLmNvbS5ici9yZXNvdXJjZXMiLCJjbGllbnRfaWQiOiJKYXZhc2NyaXB0Q2xpZW50Iiwic3ViIjoiMTc5NDMxIiwiYXV0aF90aW1lIjoxNjg1NzA3ODcxLCJpZHAiOiJsb2NhbCIsIkxvZ2luU2Vzc2lvbklEIjoiNTBjNjJhOWMtNzM5NC00YjU0LThlNWEtMmIyM2U1NzFmYWM3IiwiTmFtZSI6ImFkbWluQGRyb2dhcmlhdmVuYW5jaW8uY29tLmJyIiwiRnJpZW5kbHlOYW1lIjoiQWRtaW5pc3RyYWRvciAtIFZlbmFuY2lvIiwiVGVuYW50SWQiOiIxMDIzOSIsIlByb2ZpbGUiOiIxIiwiSm9iUm9sZSI6IjEiLCJJbml0aWFscyI6IkFWIiwiVXNlcklkZW50aWZpY2F0aW9uQ2hhdCI6IlRJZC0xMDIzOTpVSWQtMTc5NDMxIiwiVXNlckNoYXRTaWduYXR1cmUiOiJhNmM4ZDBhYjEzYzU3MzIwYzc3NjFiMWFkMzM0ZjBjNDc2YjZkMGNiMzVmM2U1MGI4ODY3ZDU4Yjk5OWViOWUxIiwiVXNlclBpY3R1cmUiOiIiLCJyb2xlIjoiYWRtaW4iLCJMb2dvIjoiMzZhNGZlZjYtZjYzOC00MmNkLTlhY2EtMDUzY2E5MTIxZGNkLnBuZyIsIk1haW5Db2xvciI6IiM5YzA1MDUiLCJGb250Q29sb3IiOiIjZmZmZmZmIiwiVGVuYW50TmFtZSI6IlZlbmFuY2lvIFByZSBQcm9kdWNhbyIsIlRlbmFudEtleSI6IlNJRyIsIkJyYW5jaCI6IjEiLCJFbWFpbCI6IiIsImp0aSI6IjZDRDI0QkJDM0IxNUIzNjAxQzY3QUQ4QzMxRTk1MDlDIiwic2lkIjoiN0NDRjBFMzREMTU3RDMyRjkzRDZCNEYyNzI0NDc5REQiLCJpYXQiOjE2ODU3MzU2NjksInNjb3BlIjpbIm9wZW5pZCIsInByb2ZpbGUiLCJlbWFpbCIsIldFQkFQSVBPUlRBTCIsIkNvc21vc1Byb1dlYkFwaSIsIklkZW50aXR5U2VydmVyQXBpIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbInB3ZCJdfQ.ClgVCo2cpGMLQlzbiHix66UeCpGU7puEsL6dYM3m4Mx40KOsZwZfgxDMP4eWxuplz73WT5IEZiJU57kjzx6jnTNJxDzDSUvnA_TPn-zSkoj3-FC3sgYNqj9wo_Ae_8pnGsBn8Lvk648zUw_Ql3k1XOUK4ocOhh7FvfcN5jhkl9ghbtVhPm6ORnrZcPi4wxLpAfsBQr-iUPTbYcMj0k-6Fp4VXl1S_6TYtc4o7vGyMhDOpjlbJ-yP_PgzWBKmQcUq-iPcNMj39KSWkgbzKYgEEj7XeAo2Uy_pfDi1tUpfRJtltwGc9OCjNWWS3XwmAJBSabDYslvVm8jvK7yTJ0dG4w'

  loadMessages(ptMessages)
  locale(navigator.language)

  useEffect(() => {setToken(staticToken); sendLoadCompleteMessage();}, [])

  window.addEventListener("message", (event) => {
    if (event.data.action === "initial") {
      console.log("initial",event.data)
      setToken(event.data.token)
    }
  }, false)

  useEffect(() => {
    const interval = setInterval(() => {
      sendLoadCompleteMessage();
    }, 55 * 60 * 1000);
  
    return () => {
      clearInterval(interval);
    };
  }, [token]);

  const sendLoadCompleteMessage = () => {
    console.log("sendLoadCompleteMessage")
    window.parent.postMessage({ action: "loadComplete" }, "*")
  }

  return (
    <AppContext.Provider value={{token}}>
      <Form/>
    </AppContext.Provider>
  );
}

export default App;
