import React, { useEffect, useState } from 'react';
import './App.css';
import { loadMessages, locale } from 'devextreme/localization';
import ptMessages from "devextreme/localization/messages/pt.json";
import { AppContext } from './context/AppContext';
import { Form } from './components/Form/Form';
import 'devextreme/dist/css/dx.light.css';


function App() {

  const [token, setToken] = useState('')
  let staticToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjQxNzQzMjM1REFEQjgzQzExNTA4MEYxNjk2NjJCNzU0IiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE2ODU1NjYwODEsImV4cCI6MTY4NTU2OTY4MSwiaXNzIjoiaHR0cHM6Ly9hdXRoLmNvc21vc3Byby5jb20uYnIiLCJhdWQiOiJodHRwczovL2F1dGguY29zbW9zcHJvLmNvbS5ici9yZXNvdXJjZXMiLCJjbGllbnRfaWQiOiJKYXZhc2NyaXB0Q2xpZW50Iiwic3ViIjoiMTc5NDMxIiwiYXV0aF90aW1lIjoxNjg1NTM2MDA0LCJpZHAiOiJsb2NhbCIsIkxvZ2luU2Vzc2lvbklEIjoiNmU5OGEwNmMtY2JmYS00ZmI5LTgxYmUtYjQxNWVlYzJiYjc0IiwiTmFtZSI6ImFkbWluQGRyb2dhcmlhdmVuYW5jaW8uY29tLmJyIiwiRnJpZW5kbHlOYW1lIjoiQWRtaW5pc3RyYWRvciAtIFZlbmFuY2lvIiwiVGVuYW50SWQiOiIxMDIzOSIsIlByb2ZpbGUiOiIxIiwiSm9iUm9sZSI6IjEiLCJJbml0aWFscyI6IkFWIiwiVXNlcklkZW50aWZpY2F0aW9uQ2hhdCI6IlRJZC0xMDIzOTpVSWQtMTc5NDMxIiwiVXNlckNoYXRTaWduYXR1cmUiOiJhNmM4ZDBhYjEzYzU3MzIwYzc3NjFiMWFkMzM0ZjBjNDc2YjZkMGNiMzVmM2U1MGI4ODY3ZDU4Yjk5OWViOWUxIiwiVXNlclBpY3R1cmUiOiIiLCJyb2xlIjoiYWRtaW4iLCJMb2dvIjoiMzZhNGZlZjYtZjYzOC00MmNkLTlhY2EtMDUzY2E5MTIxZGNkLnBuZyIsIk1haW5Db2xvciI6IiM5YzA1MDUiLCJGb250Q29sb3IiOiIjZmZmZmZmIiwiVGVuYW50TmFtZSI6IlZlbmFuY2lvIFByZSBQcm9kdWNhbyIsIlRlbmFudEtleSI6IlNJRyIsIkJyYW5jaCI6IjEiLCJFbWFpbCI6IiIsImp0aSI6IjQxMDAxRTk1MUZDNThBMEE4M0I1OUZEMjZGMTVGNzlDIiwic2lkIjoiQTEzMDU0Q0U2NjIzQzlGNEZEMUUyOEVGNjg2QTE2RkUiLCJpYXQiOjE2ODU1NjYwODEsInNjb3BlIjpbIm9wZW5pZCIsInByb2ZpbGUiLCJlbWFpbCIsIldFQkFQSVBPUlRBTCIsIkNvc21vc1Byb1dlYkFwaSIsIklkZW50aXR5U2VydmVyQXBpIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbInB3ZCJdfQ.FX0mL81xvc-oFWKH3zn0_1-iv4q3uvy11BQFBezCbHLQXMGSdp1YntRPTGKYoncDRuNI2AbT8j_EuXg6IFpbGH8eOeaaAipttMQIHU78S3FYWYhXnZQVo2D3TPbE6veExQXyTPxgcexye6P5DfTBUZ-mhHqB31Az2Hbyot02_V02QLNnjr4ut3I5kiIYBW7joOMg6kGvtpEYLPmtUGhYTuk1Un2jphP4iLGxGu1N7_pwMrOTamGo4SVabJE0Cjw8MH1omAQL0uIBbiI4B4pncuaB1_vjoKoXPQyHDoND8XDVpgJhpR1HBMX6HM3tl7NeCVTVOAWM9MlvrGw2iBc73A'

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
