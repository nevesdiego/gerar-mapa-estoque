import React, { useEffect, useState } from 'react';
import './App.css';
import { loadMessages, locale } from 'devextreme/localization';
import ptMessages from "devextreme/localization/messages/pt.json";
import { AppContext } from './context/AppContext';
import { Form } from './components/Form/Form';
import 'devextreme/dist/css/dx.light.css';


function App() {

  const [token, setToken] = useState('')
  let staticToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjQxNzQzMjM1REFEQjgzQzExNTA4MEYxNjk2NjJCNzU0IiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE2ODU0Nzk5NDYsImV4cCI6MTY4NTQ4MzU0NiwiaXNzIjoiaHR0cHM6Ly9hdXRoLmNvc21vc3Byby5jb20uYnIiLCJhdWQiOiJodHRwczovL2F1dGguY29zbW9zcHJvLmNvbS5ici9yZXNvdXJjZXMiLCJjbGllbnRfaWQiOiJKYXZhc2NyaXB0Q2xpZW50Iiwic3ViIjoiMTc5NDMxIiwiYXV0aF90aW1lIjoxNjg1NDQ5OTY4LCJpZHAiOiJsb2NhbCIsIkxvZ2luU2Vzc2lvbklEIjoiYTM0Y2VlOTgtMzc2ZC00NWIyLWI4OGEtMjRlN2EyZTY4ZjI5IiwiTmFtZSI6ImFkbWluQGRyb2dhcmlhdmVuYW5jaW8uY29tLmJyIiwiRnJpZW5kbHlOYW1lIjoiQWRtaW5pc3RyYWRvciAtIFZlbmFuY2lvIiwiVGVuYW50SWQiOiIxMDIzOSIsIlByb2ZpbGUiOiIxIiwiSm9iUm9sZSI6IjEiLCJJbml0aWFscyI6IkFWIiwiVXNlcklkZW50aWZpY2F0aW9uQ2hhdCI6IlRJZC0xMDIzOTpVSWQtMTc5NDMxIiwiVXNlckNoYXRTaWduYXR1cmUiOiJhNmM4ZDBhYjEzYzU3MzIwYzc3NjFiMWFkMzM0ZjBjNDc2YjZkMGNiMzVmM2U1MGI4ODY3ZDU4Yjk5OWViOWUxIiwiVXNlclBpY3R1cmUiOiIiLCJyb2xlIjoiYWRtaW4iLCJMb2dvIjoiMzZhNGZlZjYtZjYzOC00MmNkLTlhY2EtMDUzY2E5MTIxZGNkLnBuZyIsIk1haW5Db2xvciI6IiM5YzA1MDUiLCJGb250Q29sb3IiOiIjZmZmZmZmIiwiVGVuYW50TmFtZSI6IlZlbmFuY2lvIFByZSBQcm9kdWNhbyIsIlRlbmFudEtleSI6IlNJRyIsIkJyYW5jaCI6IjEiLCJFbWFpbCI6ImVkdWFyZG8uaGFobkBwcm9jZml0LmNvbS5iciIsImp0aSI6Ijg0M0RERjQwQ0FBNDk0NDExRjc3NkY3MDkyQkQ0MEIwIiwic2lkIjoiQ0I0MjQ4NEI2REI0QTFERjQ3OUJFRTk0RjVBODAzMkQiLCJpYXQiOjE2ODU0Nzk5NDYsInNjb3BlIjpbIm9wZW5pZCIsInByb2ZpbGUiLCJlbWFpbCIsIldFQkFQSVBPUlRBTCIsIkNvc21vc1Byb1dlYkFwaSIsIklkZW50aXR5U2VydmVyQXBpIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbInB3ZCJdfQ.F1fNWgnFS_lwTk5d71LUS8uTz4hZJXtSWfokVjrD1zWn4GNd-xWcQgcUhiS7NQEbO2bHOt5eIW0DyNPM96mwNGHJvAU_Pkwn4kAQyWgVYkDKeRphoEdTLYiU_Lo7VUjBY_maBd7zM8B1BnKKU9dOj4-SlYEUhr0PjQFGVsWgDzvzS_Qll9sb5DE0Q4MnCU16erUZ1M83lXOFv8E9UFgP0jUB0n0xQd83IkWkvqu0ObtwaJYnR2A1ciOR9rSjy92AqW6ePSFA05dCHDI3sm9hAMZ2kOkGMAXfQ4Etvcxsb4rZNgue7_mI32cRT8kYRNU4chslv2pn14A4Gvhroy7DKA'

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
