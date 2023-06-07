import React, { useEffect, useState } from 'react';
import './App.css';
import { loadMessages, locale } from 'devextreme/localization';
import ptMessages from "devextreme/localization/messages/pt.json";
import { AppContext } from './context/AppContext';
import { Form } from './components/Form/Form';
import 'devextreme/dist/css/dx.light.css';


function App() {

  const [token, setToken] = useState('')
  let staticToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjQxNzQzMjM1REFEQjgzQzExNTA4MEYxNjk2NjJCNzU0IiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE2ODYxMDI4ODIsImV4cCI6MTY4NjEwNjQ4MiwiaXNzIjoiaHR0cHM6Ly9hdXRoLmNvc21vc3Byby5jb20uYnIiLCJhdWQiOiJodHRwczovL2F1dGguY29zbW9zcHJvLmNvbS5ici9yZXNvdXJjZXMiLCJjbGllbnRfaWQiOiJKYXZhc2NyaXB0Q2xpZW50Iiwic3ViIjoiMTc5NDMxIiwiYXV0aF90aW1lIjoxNjg0NzA4Mjc5LCJpZHAiOiJsb2NhbCIsIkxvZ2luU2Vzc2lvbklEIjoiN2YzMGQ2MmUtN2U3Ni00ZmMwLTg0M2MtNzYyZjFlOWU2ZDE5IiwiTmFtZSI6ImFkbWluQGRyb2dhcmlhdmVuYW5jaW8uY29tLmJyIiwiRnJpZW5kbHlOYW1lIjoiQWRtaW5pc3RyYWRvciAtIFZlbmFuY2lvIiwiVGVuYW50SWQiOiIxMDIzOSIsIlByb2ZpbGUiOiIxIiwiSm9iUm9sZSI6IjEiLCJJbml0aWFscyI6IkFWIiwiVXNlcklkZW50aWZpY2F0aW9uQ2hhdCI6IlRJZC0xMDIzOTpVSWQtMTc5NDMxIiwiVXNlckNoYXRTaWduYXR1cmUiOiJhNmM4ZDBhYjEzYzU3MzIwYzc3NjFiMWFkMzM0ZjBjNDc2YjZkMGNiMzVmM2U1MGI4ODY3ZDU4Yjk5OWViOWUxIiwiVXNlclBpY3R1cmUiOiIiLCJyb2xlIjoiYWRtaW4iLCJMb2dvIjoiMzZhNGZlZjYtZjYzOC00MmNkLTlhY2EtMDUzY2E5MTIxZGNkLnBuZyIsIk1haW5Db2xvciI6IiM5YzA1MDUiLCJGb250Q29sb3IiOiIjZmZmZmZmIiwiVGVuYW50TmFtZSI6IlZlbmFuY2lvIFByZSBQcm9kdWNhbyIsIlRlbmFudEtleSI6IlNJRyIsIkJyYW5jaCI6IjEiLCJFbWFpbCI6IiIsImp0aSI6IjM1MjI4M0UwNkIwMEJFODE3RUZDNzQwQThDMTQzOUNFIiwic2lkIjoiQkFBQTk5M0UzM0YxNkZCMzJDNjc1RjMzQkRBNjQwOUMiLCJpYXQiOjE2ODYxMDI4ODIsInNjb3BlIjpbIm9wZW5pZCIsInByb2ZpbGUiLCJlbWFpbCIsIldFQkFQSVBPUlRBTCIsIkNvc21vc1Byb1dlYkFwaSIsIklkZW50aXR5U2VydmVyQXBpIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbInB3ZCJdfQ.kGsrm-CqIopRQWAE5278v7OlZNQJwwEZMcNnQEFvWUQfVTDM5cYNzPNVzEZ-Ukuakbt1LjOjJdRjMAW5LhCxMKdhS7gu9ecETAQhpkf1bU4yMyKRyltJMn3srHoydgmB7aGog-ZpSx3uxZ1BSN8_LDzXa25S35Ve782sNlQyaV56EmIoxKe_ctm7aWG8xFTO0MU0-PdoYZD7MH3sq-It6gEZGgIkGSXs7xcjyCOU-AS2t0RrsF-wm6-DOn3aBIhPmrLX2XGxFouHtWcmNk2Q0r_MkwGHqrm7-OW6hdyjj9n-CAzxKDSdN7fIrPLVklLzAuR_bGDz8dZCJL3HWOdpfw'

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
