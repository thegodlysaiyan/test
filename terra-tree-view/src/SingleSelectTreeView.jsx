import React from 'react';
import PropTypes from 'prop-types';
import TreeViewBase from './TreeViewBase';
import TreeViewItem from './TreeViewItem';
import TreeViewFolder from './TreeViewFolder';
import TreeViewSelectionUtils from './TreeViewSelectionUtils';

/**
 * PropTypes validation of the component
 *
 * @memberof SingleSelectTreeView
 * @prop {Object} propTypes - the props that are passed in for this component.
 * @prop {React Nodes} propTypes.children - the children TreeViewItem and TreeViewFolder
 *      Nodes.
 * @prop {Function} propTypes.onExpand - function to be called when the user expands a folder.
 * @prop {Function} propTypes.onCollapse - function to be called when the user collapses a folder.
 * @prop {Function} propTypes.onExpandAll - function to be called when the user clicks the Expand
 *      All button on the TreeView header.
 * @prop {Function} propTypes.onCollapseAll - function to be called when the user clicks the
 *      Collapse All button on the TreeView header.
 * @prop {Boolean} propTypes.singleRootFolderExpansion - indicates whether a single root level
 *      folder can be expanded at a time.
 * @prop {Function} propTypes.onSelect - function to be called when the user selects a leaf item or
 *      folder.
 * @prop {String} propTypes.title - the title to be displayed in the header of the component.
 * @prop {Function} propTypes.onDoubleClick - function to be called when the user double-clicks on a
 *      leaf item or folder.
 * @prop {Function} propTypes.onBeginHover - function to be called when the user moves the mouse
 *      over a leaf item or folder.
 */
const propTypes = {
  children: PropTypes.node,
  onExpand: PropTypes.func,
  onCollapse: PropTypes.func,
  onExpandAll: PropTypes.func,
  onCollapseAll: PropTypes.func,
  singleRootFolderExpansion: PropTypes.bool,
  onSelect: PropTypes.func,
  title: PropTypes.string,
  onDoubleClick: PropTypes.func,
  onBeginHover: PropTypes.func,
};

/**
 * Default values for the component props
 *
 * @memberof SingleSelectTreeView
 * @constant {Object}
 * @default
 *    - title: header title defaults to an empty string
 *    - onDoubleClick: defaults to null indicating that the application does not need to be informed
 *      when a user double-clicks a row. So, we can avoid single-click delay logic waiting for a
 *      double-click.
 *
 */
const defaultProps = {
  title: '',
  onDoubleClick: null,
};

/**
 * SingleSelectTreeView root component.  This component manages the user selections
 * and applies the rules for the default single-row selection model.  It uses the TreeViewBase
 * component to manage the rendering of the tree.
 *
 * @class
 * @returns {React.Component}
 *
 * @example
 *
 * // Single Root Level Folder Expansion
 * <SingleSelectTreeView title="Test" singleRootFolderExpansion >{children}</SingleSelectTreeView>
 *
 * // Application provides callbacks for all events.
 * <SingleSelectTreeView title="Test"
 *    onExpand={(id) => alert('user expanded folder ' + id)}
 *    onCollapse={(id) => alert('user collapsed folder ' + id)}
 *    onExpandAll={() => alert('user clicked expand all folders button')}
 *    onCollapseAll={() => alert('user clicked collapse all folders button')}
 *    onSelect={(id) => alert('user selected row ' + id)}
 *    onDoubleClick={(id) => alert('user double-clicked row ' + id)}
 *    onBeginHover={(endHoverCollback) => alert('user began to hover mouse over row')}
 * >
 *  {children}
 * </SingleSelectTreeView>
 */
class SingleSelectTreeView extends React.Component {
  /**
   * Constructor for the component which initializes the state and binds event handlers. the initial
   * state includes:
   *  - selectedId: the id for the row that is selected if one is specified to be initially
   *    selected.
   */
  constructor(props) {
    super(props);

    // Gets the initial selection from the isInitiallySelected prop on the children leaf items and
    // folders.  If more than one row is marked as initially selected, then the first selection
    // hierarchically will be honored.
    const initialSelectedId = TreeViewSelectionUtils.getInitialSingleSelection(this.props.children);

    this.state = ({
      selectedId: initialSelectedId,
    });
    this.handleOnSelect = this.handleOnSelect.bind(this);
  }

  /**
   * Handles the event when the user selects a row. Updates the state with the newly selected row id
   * so that the component re-renders. Any previously selected row is now unselected.  If the
   * application provided an onSelect callback, then it is called here and the id for the row the
   * user selected is passed to the callback function.
   */
  handleOnSelect(selectionObj) {
    this.setState({
      selectedId: selectionObj.actionId,
    });
    if (this.props.onSelect) {
      this.props.onSelect(selectionObj.actionId);
    }
  }

  /**
   * Renders the SingleSelectTreeView component. This is accomplished by passing its props and state
   * on to the TreeViewBase component.  The TreeViewBase component does not manage selections.  It
   * relies on props to detemrine which rows should be marked as selected.  The SingleSelectTreeView
   * component keeps track of which row is selected in the single-selection model and passes that on
   * to the TreeViewBase component via its selectedIds and isAllSelected prop.
   */
  render() {
    return (
      <TreeViewBase
        onCollapse={this.props.onCollapse}
        onCollapseAll={this.props.onCollapseAll}
        onExpand={this.props.onExpand}
        onExpandAll={this.props.onExpandAll}
        singleRootFolderExpansion={this.props.singleRootFolderExpansion}
        selectionEnabled
        selectionType={TreeViewBase.constants.TREEVIEW_SELECTION_TYPE_SINGLE}
        onSelect={this.handleOnSelect}
        selectedIds={[this.state.selectedId]}
        title={this.props.title}
        onDoubleClick={this.props.onDoubleClick}
        onBeginHover={this.props.onBeginHover}
      >
        {this.props.children}
      </TreeViewBase>
    );
  }
}

SingleSelectTreeView.Item = TreeViewItem;
SingleSelectTreeView.Folder = TreeViewFolder;

SingleSelectTreeView.propTypes = propTypes;
SingleSelectTreeView.defaultProps = defaultProps;

export default SingleSelectTreeView;
