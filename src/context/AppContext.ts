import { createContext } from "react";

interface IAppContext {
  token:string,

}
export const AppContext = createContext<IAppContext>({
    token:"",
  })