import * as PropTypes from "prop-types";
import { isNil } from "ramda";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";

import injectReducer from "../../store/injectReducer";
import injectSaga from "../../store/injectSaga";
import { changeTitle } from "./actions";
import reducer from "./reducer";
import saga from "./saga";
import { selectTitle } from "./selectors";

/**
 *
 * HomePage
 *
 */
export class HomePage extends React.Component {
  handleOnclick() {
    const { dispatch } = this.props as any;
    dispatch(changeTitle());
  }
  render() {
    const { title } = this.props as any;
    return (
      <div>
        <h1>{!isNil(title) ? title : "Homepage"}</h1>
        <hr />
        <div>
          Click{" "}
          <Link to="/second">
            <a>Second</a>
          </Link>
        </div>
        <button onClick={this.handleOnclick}>Change Title</button>
      </div>
    );
  }
}

(HomePage as any).propTypes = {
  // loading: PropTypes.object.isRequired,
  // info: PropTypes.object.isRequired,
  // error: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  title: PropTypes.string
};

const mapStateToProps = createStructuredSelector({
  // loading: selectLoading(),
  // info: selectInfo(),
  // error: selectError(),
  title: selectTitle()
});

function mapDispatchToProps(dispatch: any) {
  return {
    dispatch
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
// const withRedux = ({ key: "homePage", reducer, saga });
const withReducer = injectReducer({ key: "home", reducer });
const withSaga = injectSaga({ key: "home", saga });
export default compose(withReducer, withSaga, withConnect)(HomePage);
