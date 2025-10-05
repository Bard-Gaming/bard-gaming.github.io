import { createContext } from "react";

type ContextValue = [
    React.JSX.Element,
    React.Dispatch<React.SetStateAction<React.JSX.Element>>,
];

const CurrentPageContext = createContext<ContextValue>([<section/>, () => {}]);


export default CurrentPageContext;
