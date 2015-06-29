import ProConItem from './ProConItem';
import Composer from './Composer';
import Actions from '../actions/Actions';
import React, { Component, PropTypes } from 'react';

function getItemList(items) {
  if (!items) {
    return '';
  }
  var itemList = items.map(function(item){
    return <ProConItem key={item.id} item={item} />;
  });
  return (
    <ul>
      {itemList}
    </ul>
  );
}

function getClearButton(handler) {
  return <a onClick={handler}>Clear All</a>;
}

class ProConSection extends Component {

  constructor(props, context) {
    super(props, context);
    this._clearAll = this._clearAll.bind(this);
  }

  render() {
    var clear;
    if (this.props.items.length > 0) {
      clear = getClearButton(this._clearAll);
    } else {
      clear = '';
    }
    return (
      <div className={this.props.type + "-section"}>
        <Composer type={this.props.type} />
          {getItemList(this.state.items)}
        <div className="clear">
          {clear}
        </div>
      </div>
    );
  }

  _clearAll() {
    Actions.deleteAll(this.props.type);
  }
}

ProConSection.propTypes = {
  type: PropTypes.string.isRequired,
  items: PropTypes.object.isRequired
};

export default ProConSection;
