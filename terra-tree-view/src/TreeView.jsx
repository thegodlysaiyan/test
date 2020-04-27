import React from 'react';
import PropTypes from 'prop-types';
import TreeViewBase from './TreeViewBase';
import TreeViewItem from './TreeViewItem';
import TreeViewFolder from './TreeViewFolder';
import TreeViewSelectionUtils from './TreeViewSelectionUtils';

/**
 * PropTypes validation of the component
 *
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
 * @prop {Boolean} propTypes.selectionEnabled - indicates whether checkboxes will be displayed on
 *      each line of the tree structure allowing the user to select folders and/or leaf items.
 * @prop {Function} propTypes.onSelect - function to be called when the user selects a leaf item or
 *      folder.
 * @prop {Function} propTypes.onSelectAll - function to be called when the user checks the Select
 *      All checkbox in the TreeView header.
 * @prop {Function} propTypes.onUnselect - function to be called when the user unselects a leaf item
 *      or folder.
 * @prop {Function} propTypes.onUnselectAll - function to be called when the user unchecks the
 *      Select All checkbox in the TreeView header.
 * @prop {Boolean} propTypes.isAllInitiallySelected - indicates whether all folders and items should
 *      be marked as selected on initial render.
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
  selectionEnabled: PropTypes.bool,
  onSelect: PropTypes.func,
  onSelectAll: PropTypes.func,
  onUnselect: PropTypes.func,
  onUnselectAll: PropTypes.func,
  isAllInitiallySelected: PropTypes.bool,
  title: PropTypes.string,
  onDoubleClick: PropTypes.func,
  onBeginHover: PropTypes.func,
};

/**
 * Default values for the component props
 *
 * @memberof TreeView
 * @constant {Object}
 * @default
 *    - title: header title defaults to an empty string
 *    - isAllInitiallySelected: initially, the select all checkbox on the header is unchecked by
 *      default.
 *    - onDoubleClick: defaults to null indicating tha tthe application does not need to be informed
 *      when a user double-clicks a row. So, we can avoid single-click delay logic waiting for a
 *      double-click.
 *
 */
const defaultProps = {
  title: '',
  isAllInitiallySelected: false,
  onDoubleClick: null,
};

/**
 * TreeView root component.  When selection is enabled, this component manages the user selections
 * and applies the rules for the default multi-row selection model.  It uses the TreeViewBase
 * component to manage the rendering of the tree.
 *
 * @class
 * @returns {React.Component}
 *
 * @example
 * // Multi-row selection enabled
 * <TreeView title="Test" selectionEnabled >{children}</TreeView>
 *
 * // Multi-row selection enabled - all rows initially selected.
 * <TreeView title="Test" selectionEnabled isAllInitiallySelected >{children}</TreeView>
 *
 * // Single Root Level Folder Expansion
 * <TreeView title="Test" singleRootFolderExpansion >{children}</TreeView>
 *
 * // Application provides callbacks for all events.
 * <TreeView title="Test" selectionEnabled
 *    onExpand={(id) => alert('user expanded folder ' + id)}
 *    onCollapse={(id) => alert('user collapsed folder ' + id)}
 *    onExpandAll={() => alert('user clicked expand all folders button')}
 *    onCollapseAll={() => alert('user clicked collapse all folders button')}
 *    onSelect={(id) => alert('user selected row ' + id)}
 *    onUnselect={(id) => alert('user unselected row ' + id)}
 *    onSelectAll={() => alert('user checked select-all rows checkbox')}
 *    onUnselectAll={() => alert('user unchecked select-all rows checkbox')}
 *    onDoubleClick={(id) => alert('user double-clicked row ' + id)}
 *    onBeginHover={(endHoverCollback) => alert('user began to hover mouse over row')}
 * >
 *  {children}
 * </TreeView>
 */
class TreeView extends React.Component {
  /**
   * Constructor for the component which initializes the state and binds event handlers. The initial
   * state includes:
   *  - isAllSelected: indication as to whether all rows are selected.
   *  - selections: the list of ids for selected rows.
   */
  constructor(props) {
    super(props);

    // Get the list of ids for rows that are initially selected based on props and the selection
    // rules for the default selection model. This list is maintained in state and updated based
    // on user interaction.
    const selectionsArray = [];
    TreeViewSelectionUtils.getCurrentSelections(
      this.props.children,
      this.props.isAllInitiallySelected,
      selectionsArray,
      true,
    );

    // Determine whether the Select-All checkbox should be checked initially based on the
    // isAllInitiallySelected prop or based on the isInitiallySelected prop on children rows and
    // the default selection model rules.
    let allSelected = TreeViewSelectionUtils.isIdInSelectionsArray(
      selectionsArray,
      TreeViewBase.constants.TREEVIEW_SELECT_ALL_ID,
    );
    allSelected = this.props.children && this.props.children.length > 0 &&
                  (this.props.isAllInitiallySelected || allSelected);
    this.state = ({
      isAllSelected: allSelected,
      selections: selectionsArray,
    });
    this.handleOnSelect = this.handleOnSelect.bind(this);
    this.handleOnUnselect = this.handleOnUnselect.bind(this);
    this.handleOnSelectAll = this.handleOnSelectAll.bind(this);
    this.handleOnUnselectAll = this.handleOnUnselectAll.bind(this);
  }

  /**
   * React Lifecycle method invoked right before calling the render method, both on the initial
   * mount and on subsequent updates.
   * Used to determine whether a change in the children by the consuming application affects the
   * list of selected rows based on the default selection model. For example, when the user
   * expands a folder, the contents of the folder might be added at that time and if the folder
   * is selected, then the new contents of the folder must also be marked as selected.
   * @returns {Object} - containing updates to state.
   */
  static getDerivedStateFromProps(props, state) {
    const selectionsArray = state.selections.slice();
    TreeViewSelectionUtils.getCurrentSelections(
      props.children,
      state.isAllSelected,
      selectionsArray,
      false,
    );
    const allSelected = TreeViewSelectionUtils.isIdInSelectionsArray(
      selectionsArray,
      TreeViewBase.constants.TREEVIEW_SELECT_ALL_ID,
    );
    return {
      isAllSelected: allSelected,
      selections: selectionsArray,
    };
  }

  /**
   * Handles the event when the user selects a row. Applies the rules for the default
   * multi-selection model and updates the state so that the component re-renders.  If the
   * application provided an onSelect callback, then it is called here and the id for the row the
   * user selected, the list of currently selected rows and an indication as to whether all rows are
   * selected, are passed to the callback function.
   */
  handleOnSelect(selectionObj) {
    const selectionsArray = this.state.selections.slice();
    selectionsArray.push(selectionObj.actionId);
    TreeViewSelectionUtils.getCurrentSelections(
      this.props.children,
      false,
      selectionsArray,
      false,
    );
    const allSelected = TreeViewSelectionUtils.isIdInSelectionsArray(
      selectionsArray,
      TreeViewBase.constants.TREEVIEW_SELECT_ALL_ID,
    );
    const currentSelectionsArray = selectionsArray.slice();
    TreeViewSelectionUtils.removeIdFromSelections(
      currentSelectionsArray,
      TreeViewBase.constants.TREEVIEW_SELECT_ALL_ID,
    );
    this.setState({
      isAllSelected: allSelected,
      selections: selectionsArray,
    });
    if (this.props.onSelect) {
      this.props.onSelect({
        actionId: selectionObj.actionId,
        currentSelections: currentSelectionsArray,
        allItemsSelected: allSelected,
      });
    }
  }

  /**
   * Handles the event when the user unselects a row. Applies the rules for the default
   * multi-selection model and updates the state so that the component re-renders.  If the
   * application provided an onUnselect callback, then it is called here and the id for the row the
   * user selected, the list of currently selected rows and an indication as to whether all rows are
   * selected, are passed to the callback function.
   */
  handleOnUnselect(selectionObj) {
    const selectionsArray = this.state.selections.slice();
    TreeViewSelectionUtils.processUnselection(
      this.props.children,
      selectionsArray,
      selectionObj.actionId,
    );
    this.setState({
      isAllSelected: false,
      selections: selectionsArray,
    });
    if (this.props.onUnselect) {
      this.props.onUnselect({
        actionId: selectionObj.actionId,
        currentSelections: selectionsArray.slice(),
        allItemsSelected: false,
      });
    }
  }

  /**
   * Handles the event when the user checks the Select-All checkbox on the component header.
   * Updates the list of selected rows to contain all rows and updates the state so that the
   * component re-renders.  If the application provided an onSelectAll callback, then it is called
   * here and the list of currently selected rows and an indication as to whether all rows are
   * selected, are passed to the callback function.
   */
  handleOnSelectAll() {
    let selectionsArray = [];
    selectionsArray = this.state.selections.slice();
    TreeViewSelectionUtils.getCurrentSelections(
      this.props.children,
      true,
      selectionsArray,
    );
    this.setState({
      isAllSelected: true,
      selections: selectionsArray,
    });
    if (this.props.onSelectAll) {
      const currentSelectionsArray = selectionsArray.slice();
      TreeViewSelectionUtils.removeIdFromSelections(
        currentSelectionsArray,
        TreeViewBase.constants.TREEVIEW_SELECT_ALL_ID,
      );
      this.props.onSelectAll({
        actionId: TreeViewBase.constants.TREEVIEW_SELECT_ALL_ID,
        currentSelections: currentSelectionsArray,
        allItemsSelected: true,
      });
    }
  }

  /**
   * Handles the event when the user unchecks the Select-All checkbox on the component header.
   * Updates the list of selected rows to be empty and updates the state so that the
   * component re-renders.  If the application provided an onUnselectAll callback, then it is called
   * here and the list of currently selected rows and an indication as to whether all rows are
   * selected, are passed to the callback function.
   */
  handleOnUnselectAll() {
    const selectionsArray = [];
    this.setState({
      isAllSelected: false,
      selections: selectionsArray,
    });
    if (this.props.onUnselectAll) {
      this.props.onUnselectAll({
        actionId: TreeViewBase.constants.TREEVIEW_SELECT_ALL_ID,
        currentSelections: selectionsArray.slice(),
        allItemsSelected: false,
      });
    }
  }

  /**
   * Renders the TreeView component. This is accomplished by passing its props and state on to the
   * TreeViewBase component.  The TreeViewBase component does not manage selections.  It relies on
   * props to detemrine which rows should be marked as selected.  The TreeView component keeps
   * track of row selections based on the default selection model rules and passes that on to the
   * TreeViewBase component via its selectedIds and isAllSelected props.
   */
  render() {
    return (
      <TreeViewBase
        onCollapse={this.props.onCollapse}
        onCollapseAll={this.props.onCollapseAll}
        onExpand={this.props.onExpand}
        onExpandAll={this.props.onExpandAll}
        singleRootFolderExpansion={this.props.singleRootFolderExpansion}
        selectionEnabled={this.props.selectionEnabled}
        onSelect={this.handleOnSelect}
        onSelectAll={this.handleOnSelectAll}
        onUnselect={this.handleOnUnselect}
        onUnselectAll={this.handleOnUnselectAll}
        isAllSelected={this.state.isAllSelected}
        selectedIds={this.state.selections}
        title={this.props.title}
        onDoubleClick={this.props.onDoubleClick}
        onBeginHover={this.props.onBeginHover}
      >
        {this.props.children}
      </TreeViewBase>
    );
  }
}

TreeView.Item = TreeViewItem;
TreeView.Folder = TreeViewFolder;

TreeView.propTypes = propTypes;
TreeView.defaultProps = defaultProps;

export default TreeView;
