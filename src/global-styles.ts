import { injectGlobal } from "styled-components";

// tslint:disable-next-line:no-unused-expression
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  #root {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }
`;
