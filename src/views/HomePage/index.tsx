// import { isNil } from "ramda";
// import Head from "next/head";
// import Link from "next/link";
// import PropTypes from "prop-types";
// import React from "react";
// import { connect } from "react-redux";
// import { compose } from "redux";
// import { createStructuredSelector } from "reselect";
// import logo from "static/img/logo.png";
// import { initRedux } from "utils/configureStore";
// import monitorSagas from "utils/monitorSagas";

// import { changeTitle } from "./actions";

// import reducer from "./reducer";
// import saga from "./saga";
// import { selectTitle } from "./selectors";

// /**
//  *
//  * HomePage
//  *
//  */

// // import isFalsy from 'helpers/isFalsy';
// // import isImmutable from 'helpers/isImmutable';

// // import { selectLoading, selectInfo, selectError } from 'containers/App/selectors';
// export class HomePage extends React.Component {
//   // eslint-disable-line react/prefer-stateless-function
//   static async getInitialProps({ store, isServer }) {
//     store.dispatch(changeTitle());
//     await monitorSagas(store);
//     return {
//       isServer
//     };
//   }
//   render() {
//     const { title, dispatch } = this.props;
//     return (
//       <div>
//         <Head>
//           <title>HomePage</title>
//         </Head>
//         <div className="flex flex-column items-center justify-center homepage-wrapper">
//           <h1>{!isNil(title) ? title : "Homepage"}</h1>
//           <img className="w5" src={logo} alt="logo" />
//           <hr />
//           <div>
//             Click{" "}
//             <Link href="/second">
//               <a>Second</a>
//             </Link>
//           </div>
//           <button onClick={() => dispatch(changeTitle())}>Change Title</button>
//         </div>
//       </div>
//     );
//   }
// }

// HomePage.propTypes = {
//   // loading: PropTypes.object.isRequired,
//   // info: PropTypes.object.isRequired,
//   // error: PropTypes.object.isRequired,
//   dispatch: PropTypes.func.isRequired,
//   title: PropTypes.string
// };

// const mapStateToProps = createStructuredSelector({
//   // loading: selectLoading(),
//   // info: selectInfo(),
//   // error: selectError(),
//   title: selectTitle()
// });

// function mapDispatchToProps(dispatch) {
//   return {
//     dispatch
//   };
// }

// const withConnect = connect(mapStateToProps, mapDispatchToProps);
// const withRedux = initRedux({ key: "homePage", reducer, saga });
// export default compose(withRedux, withConnect)(HomePage);
