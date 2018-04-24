import hoistNonReactStatics = require("hoist-non-react-statics");
import * as PropTypes from "prop-types";
import * as React from "react";

import getInjectors from "./sagaInjectors";

export default ({
  key,
  saga,
  mode
}: {
  key: string;
  saga: any;
  mode?: string;
}) => (WrappedComponent: any) => {
  class InjectSaga extends React.Component {
    static WrappedComponent = WrappedComponent;
    static contextTypes = {
      store: PropTypes.object.isRequired
    };
    static displayName = `withSaga(${WrappedComponent.displayName ||
      WrappedComponent.name ||
      "Component"})`;
    injectors = getInjectors(this.context.store);

    componentWillMount() {
      const { injectSaga } = this.injectors;

      injectSaga(key, { saga, mode }, this.props);
    }

    componentWillUnmount() {
      const { ejectSaga } = this.injectors;

      ejectSaga(key);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return hoistNonReactStatics(InjectSaga, WrappedComponent);
};
