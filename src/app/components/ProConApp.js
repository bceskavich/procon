import ProConSection from './ProConSection';
import AppStore from '../stores/AppStore';
import PCActions from '../actions/Actions';
import React from 'react';

function getStateFromStore() {
  return {
    ref: AppStore.getState().firebaseRef,
    pros: AppStore.getState().pros,
    cons: AppStore.getState().cons
  };
}

export default class ProConApp extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = getStateFromStore();

    this._onChange = this._onChange.bind(this);
    this._saveSession = this._saveSession.bind(this);
  }

  componentDidMount() {
    AppStore.listen(this._onChange);
  }

  componentWillUnmount() {
    AppStore.unlisten(this._onChange);
  }

  render() {
    var buttonOrLink;
    if (this.state.ref) {
      var linkPath = "http://procon.ceskavich.com/" + this.state.ref;
      buttonOrLink = <a href={linkPath}>{linkPath}</a>;
    } else if (this.state.pros.length > 0 || this.state.cons.length > 0) {
      buttonOrLink = <button className="active" onClick={this._saveSession}>Save Your List</button>;
    } else {
      buttonOrLink = <button disabled onClick={this._saveSession}>Save Your List</button>;
    }

    return (
      <div>
        <div>
          <section className="pros">
            <h1>Pros</h1>
            <ProConSection type="pros" items={AppStore.getAllChrono('pros')} />
          </section>
          <span></span>
          <section className="cons">
            <h1>Cons</h1>
            <ProConSection type="cons" items={AppStore.getAllChrono('cons')} />
          </section>
        </div>
        <div className="save">
          {buttonOrLink}
        </div>
      </div>
    );
  }

  _onChange() {
    this.setState(getStateFromStore());
  }

  _saveSession() {
    PCActions.createNewStore();
  }

}
