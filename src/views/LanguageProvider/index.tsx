import * as PropTypes from "prop-types";
import * as React from "react";
import { IntlProvider } from "react-intl";
import { connect } from "react-redux";
import { createSelector } from "reselect";

import { makeSelectLocale } from "./selectors";

/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

interface IProp {
  locale: string;
  messages: any;
}

export class LanguageProvider extends React.PureComponent<IProp> {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <IntlProvider
        locale={this.props.locale}
        key={this.props.locale}
        messages={this.props.messages[this.props.locale]}
      >
        {React.Children.only(this.props.children)}
      </IntlProvider>
    );
  }
}

(LanguageProvider as any).propTypes = {
  children: PropTypes.element.isRequired,
  locale: PropTypes.string,
  messages: PropTypes.object
};

const mapStateToProps = createSelector(makeSelectLocale(), locale => ({
  locale
}));

export default connect(mapStateToProps)(LanguageProvider);
