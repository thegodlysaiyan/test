import React from 'react';
import PropTypes from 'prop-types';
import ContentContainer from 'terra-content-container';
import Arrange from 'terra-arrange';
import Checkbox from 'terra-form-checkbox';
import Button from 'terra-button';
import IconCollapseRow from 'terra-icon/lib/icon/IconCollapseRow';
import IconExpandRow from 'terra-icon/lib/icon/IconExpandRow';
import TreeViewItem from './TreeViewItem';
import TreeViewFolder from './TreeViewFolder';
import TreeViewSelectionUtils from './TreeViewSelectionUtils';
import TreeViewExpandCollapseFolderUtils from './TreeViewExpandCollapseFolderUtils';
import styles from './TreeView.scss';

const constants = {
  TREEVIEW_SELECT_ALL_ID: '_TreeViewSelectAll_',
  TREEVIEW_SELECTION_TYPE_SINGLE: 'single',
  TREEVIEW_SELECTION_TYPE_MULTI: 'multi',
  TREEVIEW_ALL_FOLDERS: '__allFolders__',
  TREEVIEW_FOLDER_CLASSNAME: 'TreeViewFolder',
  TREEVIEW_ITEM_CLASSNAME: 'TreeViewItem',
  TREEVIEW_ROW_TYPE_FOLDER: 'folder',
  TREEVIEW_ROW_TYPE_ITEM: 'item',
  TREEVIEW_ROW_PREFIX: '_TreeViewRow_',
};
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
 * @prop {String} propTypes.selectionType - when selection is enabled, indicates whether
 *      single-row or multi-row selection is being used.
 * @prop {Function} propTypes.onSelect - function to be called when the user selects a leaf item or
 *      folder.
 * @prop {Function} propTypes.onSelectAll - function to be called when the user checks the Select
 *      All checkbox in the TreeView header.
 * @prop {Function} propTypes.onUnselect - function to be called when the user unselects a leaf item
 *      or folder.
 * @prop {Function} propTypes.onUnselectAll - function to be called when the user unchecks the
 *      Select All checkbox in the TreeView header.
 * @prop {Boolean} propTypes.isAllSelected - indicates whether the Select-All checkbox in the
 *      component header should be checked.
 * @prop {Array of Strings} propTypes.selectedIds - array of row ids that should be marked as
 *      selected.
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
  selectionType: PropTypes.string,
  onSelect: PropTypes.func,
  onSelectAll: PropTypes.func,
  onUnselect: PropTypes.func,
  onUnselectAll: PropTypes.func,
  isAllSelected: PropTypes.bool,
  selectedIds: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
  onDoubleClick: PropTypes.func,
  onBeginHover: PropTypes.func,
};

/**
 * Default values for the component props
 *
 * @memberof TreeViewBase
 * @constant {Object}
 * @default
 *    - title: header title defaults to an empty string
 *    - singleRootFolderExpansion: defaults to false indicating that multiple root folders can be
 *      expanded at a time.
 *    - selectionType: defaults to multi-row selection.
 *    - selectionEnabled: defaults to false indicating that the user will not be able to select any
 *      rows in the tree.
 *    - onDoubleClick: defaults to null indicating tha tthe application does not need to be informed
 *      when a user double-clicks a row. So, we can avoid single-click delay logic waiting for a
 *      double-click.
 *
 */
const defaultProps = {
  title: '',
  isAllSelected: false,
  singleRootFolderExpansion: false,
  selectionType: constants.TREEVIEW_SELECTION_TYPE_MULTI,
  selectionEnabled: false,
  onDoubleClick: null,
};

/**
 * Context Types for the component.
 *
 * @memberof TreeViewBase
 * @constant {Object}
 *    - intl: I18N context
 *
 */
const contextTypes = {
  /* eslint-disable consistent-return */
  intl: (context) => {
    if (context.intl === undefined) {
      return new Error('Component is internationalized, and must be wrapped in terra-base');
    }
  },
};

/**
 * TreeViewBase root component.  Main rendering component used by the TreeView and
 * SingleSelectTreeView compoenents as well as comsuming application components to render folder
 * and leaf items in a hierarchical structure. This component does not manage selections. It relies
 * on the consuming component to direct which rows should be marked as selected via props.
 *
 * @class
 * @returns {React.Component}
 *
 * @example
 * // Multi-row selection enabled with nothing selected
 * <TreeViewBase title="Test" selectionEnabled >{children}</TreeViewBase>
 *
 * // Multi-row selection enabled - Select-All checkbox should be checked but no rows marked as
 * // selected.
 * <TreeViewBase title="Test" selectionEnabled isAllSelected >{children}</TreeViewBase>
 *
 * // Multi-row selection enabled - Specific rows should be marked as selected.
 * <TreeViewBase title="Test" selectionEnabled selectedIds={['f1', 'i1']} >{children}</TreeViewBase>
 *
 * // Single Root Level Folder Expansion
 * <TreeViewBase title="Test" singleRootFolderExpansion >{children}</TreeViewBase>
 *
 * // Single-row selection enabled with nothing selected
 * <TreeViewBase title="Test" selectionType="single" >{children}</TreeViewBase>
 *
 * // Single-row selection enabled - specific row should be marked as selected
 * <TreeViewBase title="Test" selectionType="single" selectedIds={['i1']} >{children}</TreeViewBase>
 *
 * // Single Root Level Folder Expansion
 * <TreeViewBase title="Test" singleRootFolderExpansion >{children}</TreeViewBase>
 *
 * // Application provides callbacks for all events.
 * <TreeViewBase title="Test" selectionEnabled
 *    onExpand={(id) => alert('user expanded folder ' + id)}
 *    onCollapse={(id) => alert('user collapsed folder ' + id)}
 *    onExpandAll={() => alert('user clicked expand all folders button')}
 *    onCollapseAll={() => alert('user clicked collapse all folders button')}
 *    onSelect={(id) => alert('user selected row ' + id)}
 *    onUnselect={(id) => alert('user unselected row ' + id)}
 *    onSelectAll={() => alert('user checked select-all rows checkbox')}
 *    onUnselectAll={() => alert('user unchecked select-all rows checkbox')}
 *    onDoubleClick={(id) => alert('user double-clicked row ' + id)}
 *    onBeginHover={(endHoverCallBack) => alert('user began to hover mouse over row')}
 * >
 *  {children}
 * </TreeViewBase>
 */
class TreeViewBase extends React.Component {
  /**
   * Constructor for the component which initializes the state and binds event handlers. The initial
   * state includes:
   *  - openFolders: list of ids for folders that are to be initially rendered as expanded (open).
   *    this list is determined based on the singleRootFolderExpansion prop and the isInitiallyOpen
   *    prop on the folder components.
   *  - visibleIds: flattened list of ids for rows that are visible due to open folders. The list is
   *    in hierarchical order.
   *    rendered, the first visible selected row is to be scrolled into view.
   */
  constructor(props) {
    super(props);
    this.scrollArea = null;
    this.endHoverCallBack = null;

    // Get the list of initially open folders. A folder can be on the list if its isInitiallyOpen
    // prop is set to true or if one or more of its descendant folders or leaf items is marked as
    // initially selected. Selected rows are to be visible on initial render.  However, if the
    // singleRootFolderExpansion prop is set to true, only keep the first root level folder from
    // the list open.
    const openFoldersArray = [];
    TreeViewExpandCollapseFolderUtils.getInitialOpenFolders(
      this.props.children,
      openFoldersArray,
      this.props.selectedIds,
    );
    if (this.props.singleRootFolderExpansion) {
      const firstOpenRootFolder = TreeViewExpandCollapseFolderUtils.findFirstOpenRootFolder(
        this.props.children,
        openFoldersArray,
      );
      if (firstOpenRootFolder) {
        TreeViewExpandCollapseFolderUtils.removeOtherRootFoldersFromOpenFolderList(
          this.props.children,
          openFoldersArray,
          firstOpenRootFolder,
        );
      }
    }

    // Get a flattended list of row ids for visible rows in hierarchical order based on the list
    // of open folders.
    const visibleIdArray = [];
    TreeViewExpandCollapseFolderUtils.getFlattenedListOfVisibleIds(
      this.props.children,
      visibleIdArray,
      openFoldersArray,
    );

    this.state = ({
      openFolders: openFoldersArray,
      visibleIds: visibleIdArray,
    });
    this.setScrollRef = this.setScrollRef.bind(this);
    this.getScrollRef = this.getScrollRef.bind(this);
    this.handleOnExpand = this.handleOnExpand.bind(this);
    this.handleOnCollapse = this.handleOnCollapse.bind(this);
    this.handleOnSelect = this.handleOnSelect.bind(this);
    this.handleOnUnselect = this.handleOnUnselect.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleCollapseAllOnClick = this.handleCollapseAllOnClick.bind(this);
    this.handleExpandAllOnClick = this.handleExpandAllOnClick.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleBeginHover = this.handleBeginHover.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  /**
   * React Lifecycle method invoked right before calling the render method, both on the initial
   * mount and on subsequent updates.
   * Used to determine whether a change in the children by the consuming application affects the
   * list of visible row ids. For example, when the user expands a folder, the contents of the
   * folder might be added at that time and if the folder is expanded, then the new contents of the
   * folder must also be included in the list of visible rows.
   * @returns {Object} - containing updates to state.
   */
  static getDerivedStateFromProps(props, state) {
    const visibleIdArray = [];
    TreeViewExpandCollapseFolderUtils.getFlattenedListOfVisibleIds(
      props.children,
      visibleIdArray,
      state.openFolders,
    );
    return ({
      visibleIds: visibleIdArray,
    });
  }

  /**
   * React Lifecycle method invoked after the component is initially mounted. On the initial
   * rendering of the component, the first visible selected row must be scrolled into view.
   */
  componentDidMount() {
    // Find the first visible selected row based on the list of selected ids and the list of
    // visible ids.
    let firstVisibleSelectedId = '';
    if (this.props.selectionEnabled) {
      firstVisibleSelectedId = TreeViewSelectionUtils.getFirstVisibleSelection(
        this.props.selectedIds,
        this.state.visibleIds,
      );
    }
    if (firstVisibleSelectedId) {
      const rowId = `${TreeViewBase.constants.TREEVIEW_ROW_PREFIX}${firstVisibleSelectedId}`;
      const elem = document.getElementById(rowId);
      if (elem) {
        if ((elem.offsetTop + elem.clientHeight) > this.scrollArea.clientHeight) {
          this.scrollArea.scrollTop = elem.offsetTop - elem.clientHeight;
        }
      }
    }
  }

  /**
   * Callback method passed to the Terra Content Container in order to get a reference to the
   * scrollable area of the container.  This is used in the componentDidMount method to scroll the
   * first visible selected row into view.
   */
  setScrollRef(element) {
    this.scrollArea = element;
  }

  /**
   * Method to get a reference to the content container scroll area.
   */
  getScrollRef() {
    return this.scrollArea;
  }

  /**
   * Handles the event when the user expands a row by clicking on its chevron. Updates the state
   * with a new list of open folders and visible row ids. If the application provided an onExpand
   * callback, then it is called here and the id of the expanded folder is passed to the callback
   * function.
   */
  handleOnExpand(id, affectedParentFolders) {
    const openFoldersArray = this.state.openFolders.slice();
    TreeViewExpandCollapseFolderUtils.addIdToFoldersArray(openFoldersArray, id);
    if (this.props.singleRootFolderExpansion &&
        TreeViewExpandCollapseFolderUtils.isARootFolder(this.props.children, id)) {
      TreeViewExpandCollapseFolderUtils.removeOtherRootFoldersFromOpenFolderList(
        this.props.children,
        openFoldersArray,
        id,
      );
    }
    const visibleIdArray = [];
    TreeViewExpandCollapseFolderUtils.getFlattenedListOfVisibleIds(
      this.props.children,
      visibleIdArray,
      openFoldersArray,
    );
    this.setState({
      openFolders: openFoldersArray,
      visibleIds: visibleIdArray,
      affectedParentFolders,
    });
    if (this.props.onExpand) {
      this.props.onExpand(id);
    }
  }

  /**
   * Handles the event when the user collapses a row by clicking on its chevron. Updates the state
   * with a new list of open folders and visible row ids. If the application provided an onCollapse
   * callback, then it is called here and the id of the collapsed folder is passed to the callback
   * function.
   */
  handleOnCollapse(id, affectedParentFolders) {
    const openFoldersArray = this.state.openFolders.slice();
    TreeViewExpandCollapseFolderUtils.removeIdFromFoldersArray(openFoldersArray, id);
    const visibleIdArray = [];
    TreeViewExpandCollapseFolderUtils.getFlattenedListOfVisibleIds(
      this.props.children,
      visibleIdArray,
      openFoldersArray,
    );
    this.setState({
      openFolders: openFoldersArray,
      visibleIds: visibleIdArray,
      affectedParentFolders,
    });
    if (this.props.onCollapse) {
      this.props.onCollapse(id);
    }
  }

  /**
   * Handles the event when the user selects a row. This method is a callback passed as a prop to
   * the leaf item and folder children components.  When those descendant components detect that
   * the user selected the row, this callback is called with the id of the row selected and a list
   * of its parent folders.  The selections are not managed here, but instead are managed through
   * the onSelect callback provided by the consuming component which is called here. Note that
   * the callback could be from the TreeView component or the SingleSelectTreeView component, if a
   * default selection model is being used, or it could be from an application component if the
   * application needs to manage selections itself.
   * This method determines the list of parent folders that are affected by the selection, including
   * the parent folders of the row selected and the parent folders for the visible row above the
   * row that was selected. This list is then passed down to the descendant folders to ensure that
   * the affected folders and their descendants are re-rendered. The visible row above the selected
   * row must be re-rendered in order to get its bottom border to have the selected border color.
   * This cannot be done via standard CSS since the TreeView is not a flat structure.
   */
  handleOnSelect(id, affectedParentFolders) {
    const selectionsArray = this.props.selectedIds.slice();
    selectionsArray.push(id);
    if (this.props.onSelect) {
      this.props.onSelect({
        actionId: id,
        currentSelections: selectionsArray,
        allItemsSelected: this.props.isAllSelected,
      });
    }
    let allAffectedFolders = TreeViewExpandCollapseFolderUtils.getAllAffectedFoldersForSelection(
      id,
      affectedParentFolders,
      this.state.visibleIds,
      this.state.openFolders,
      this.props.children,
    );
    if (this.props.selectionType === constants.TREEVIEW_SELECTION_TYPE_SINGLE) {
      allAffectedFolders = TreeViewExpandCollapseFolderUtils.getAllAffectedFoldersForSelection(
        selectionsArray[0],
        allAffectedFolders,
        this.state.visibleIds,
        this.state.openFolders,
        this.props.children,
      );
    }
    this.setState({
      affectedParentFolders: allAffectedFolders,
    });
  }

  /**
   * Handles the event when the user unselects a row. This method is a callback passed as a prop to
   * the leaf item and folder children components.  When those descendant components detect that
   * the user unselected the row, this callback is called with the id of the row selected and a list
   * of its parent folders.  The selections are not managed here, but instead are managed through
   * the onUnSelect callback provided by the consuming component which is called here. Note that
   * the callback could be from the TreeView component or the SingleSelectTreeView component, if a
   * default selection model is being used, or it could be from an application component if the
   * application needs to manage selections itself.
   * This method determines the list of parent folders that are affected by the unselection,
   * including the parent folders of the row unselected and the parent folders for the visible row
   * above the row that was unselected. This list is then passed down to the descendant folders to
   * ensure that the affected folders and their descendants are re-rendered. The visible row above
   * the unselected row must be re-rendered in order to get its bottom border to have the normal
   * border color. This cannot be done via standard CSS since the TreeView is not a flat structure.
   */
  handleOnUnselect(id, affectedParentFolders) {
    const selectionsArray = this.props.selectedIds.slice();
    TreeViewSelectionUtils.removeIdFromSelections(selectionsArray, id);
    if (this.props.onUnselect) {
      this.props.onUnselect({
        actionId: id,
        currentSelections: selectionsArray.slice(),
        allItemsSelected: this.props.isAllSelected,
      });
    }
    const allAffectedFolders = TreeViewExpandCollapseFolderUtils.getAllAffectedFoldersForSelection(
      id,
      affectedParentFolders,
      this.state.visibleIds,
      this.state.openFolders,
      this.props.children,
    );
    this.setState({
      affectedParentFolders: allAffectedFolders,
    });
  }

  /**
   * Handles the event when the user checks or unchecks the Select All checkbox in the component
   * header. The selections are not managed here, but instead are managed through the onSelectAll
   * and the onUnselectAll callbacks provided by the consuming component which are called here. Note
   * that the callbacks could be from the TreeView component or the SingleSelectTreeView component,
   * if a default selection model is being used, or it could be from an application component if the
   * application needs to manage selections itself. If the application provided an onSelectAll
   * or onUnselectAll callback, then the list of currently selected rows and an indication
   * as to whether all rows are selected, are passed to the callback function.
   */
  handleCheckboxChange() {
    const newIsSelectedState = !this.props.isAllSelected;
    if (newIsSelectedState) {
      if (this.props.onSelectAll) {
        this.props.onSelectAll({
          actionId: constants.TREEVIEW_SELECT_ALL_ID,
          currentSelections: this.props.selectedIds.slice(),
          allItemsSelected: true,
        });
      }
    } else if (this.props.onUnselectAll) {
      this.props.onUnselectAll({
        actionId: constants.TREEVIEW_SELECT_ALL_ID,
        currentSelections: this.props.selectedIds.slice(),
        allItemsSelected: false,
      });
    }
    this.setState({
      affectedParentFolders: [constants.TREEVIEW_ALL_FOLDERS],
    });
  }

  /**
   * Handles the event when the user clicks the Collapse All button on the component header. It
   * updates the state with the new list of open folders and visible row ids in order to re-render
   * the component. If the consuming component provided an onCollapseAll callback, then it is
   * called here.
   */
  handleCollapseAllOnClick() {
    const visibleIdArray = [];
    TreeViewExpandCollapseFolderUtils.getFlattenedListOfVisibleIds(
      this.props.children,
      visibleIdArray,
      [],
    );
    this.setState({
      openFolders: [],
      visibleIds: visibleIdArray,
      affectedParentFolders: [constants.TREEVIEW_ALL_FOLDERS],
    });
    if (this.props.onCollapseAll) {
      this.props.onCollapseAll();
    }
  }

  /**
   * Handles the event when the user clicks the Expand All button on the component header. It
   * updates the state with the new list of open folders and visible row ids in order to re-render
   * the component. If the consuming component provided an onExpandAll callback, then it is
   * called here.
   */
  handleExpandAllOnClick() {
    const openFoldersArray = this.state.openFolders.slice();
    TreeViewExpandCollapseFolderUtils.getAllFolderIds(this.props.children, openFoldersArray);
    const visibleIdArray = [];
    TreeViewExpandCollapseFolderUtils.getFlattenedListOfVisibleIds(
      this.props.children,
      visibleIdArray,
      openFoldersArray,
    );
    this.setState({
      openFolders: openFoldersArray,
      visibleIds: visibleIdArray,
      affectedParentFolders: [constants.TREEVIEW_ALL_FOLDERS],
    });
    if (this.props.onExpandAll) {
      this.props.onExpandAll();
    }
  }

  /**
   * Handles the event when the user double-clicks a row. This method is a callback passed as a prop
   * to the leaf item and folder children components.  When those descendant components detect that
   * the user double-clicked the row, this callback is called with the id of the row.  If the
   * consuming application component provided an onDoubleClick callback, then it is called here
   * and is passed the id of the row that was double-clicked.
   */
  handleDoubleClick(id) {
    if (this.props.onDoubleClick) {
      this.props.onDoubleClick(id);
    }
  }

  /**
   * Handles the event when the user begins to hover the mouse over a row. This method is a callback
   * passed as a prop to the leaf item and folder children components.  When those descendant
   * components detect that the user began to hover the mouse over the row, this callback is called
   * with a row end hover function reference that can be called by this component or the consuming
   * application if the hover state needs to be turned off for the row.  If the consuming
   * application component provided an onBeginHover callback, then it is called here
   * and is passed the function reference for the row's end hover callback.
   */
  handleBeginHover(endHoverCallBack) {
    this.endHoverCallBack = endHoverCallBack;
    if (this.props.onBeginHover) {
      this.props.onBeginHover(endHoverCallBack);
    }
  }

  /**
   * Handles the event when the user scrolls the content area of the TreeView using the mouse wheel.
   * When this occurs, the hover state should be removed from the row where the mouse is so that
   * the row doesn't have the hover styles when the row moves out from under the mouse pointer.
   * Call the end hover callback for the row to remove the hover state.
   */
  handleScroll() {
    if (this.endHoverCallBack) {
      this.endHoverCallBack();
    }
    this.endHoverCallBack = null;
  }

  /**
   * Renders the TreeViewBase component. It renders a Terra ContentContainer component with a
   * header containing the Select All checkbox if multi-row selection is enabled, the title of the
   * component and the Expand All and Collapse All buttons.  The scrollable area of the
   * ContentContainer contains the folders and leaf items that are passed as children to this
   * component.  The props for the children components are modified to include additional props
   * needed for proper rendering and event handling.
   */
  render() {
    const { intl } = this.context;
    const expandAllTitle = intl ? intl.formatMessage({ id: 'tree-view.tooltips.expand-all' }) : 'Expand All';
    const collapseAllTitle = intl ? intl.formatMessage({ id: 'tree-view.tooltips.collapse-all' }) : 'Collapse All';

    let checkboxFitStartElem = null;
    const checkboxFitStartAttributesValue = {
      className: styles.headerFitStart,
    };
    if (this.props.selectionEnabled &&
        this.props.selectionType === constants.TREEVIEW_SELECTION_TYPE_MULTI) {
      checkboxFitStartElem = (
        <Checkbox
          labelText=""
          isLabelHidden
          isInline
          checked={this.props.isAllSelected}
          onChange={this.handleCheckboxChange}
        />
      );
    }
    let fitEndValue = null;
    if (!this.props.singleRootFolderExpansion) {
      fitEndValue = (
        <div>
          <Button text="Collapse All" variant="utility" isCompact isIconOnly onClick={this.handleCollapseAllOnClick} icon={<IconCollapseRow />} title={collapseAllTitle} />
          <Button text="Expand All" variant="utility" isCompact isIconOnly onClick={this.handleExpandAllOnClick} icon={<IconExpandRow />} title={expandAllTitle} />
        </div>
      );
    }
    const headerRow = (
      <Arrange
        fitStart={checkboxFitStartElem}
        fill={
          <span>
            {this.props.title}
          </span>
        }
        fillAttributes={{
          className: styles.headerText,
          title: this.props.title,
        }}
        align="center"
        fitStartAttributes={checkboxFitStartAttributesValue}
        fitEnd={fitEndValue}
        className={styles.header}
      />
    );

    return (
      <div className={styles.container}>
        <ContentContainer
          header={headerRow}
          fill
          scrollRefCallback={this.setScrollRef}
          onScroll={this.handleScroll}
        >
          <div>
            {
              React.Children.map(this.props.children, (child) => {
                let newChild = null;
                if (typeof child.props.openFolders !== 'undefined') {
                  // Child is a Folder
                  newChild = React.cloneElement(child, {
                    onExpand: this.handleOnExpand,
                    onCollapse: this.handleOnCollapse,
                    selectionEnabled: this.props.selectionEnabled,
                    selectionType: this.props.selectionType,
                    onSelect: this.handleOnSelect,
                    onUnselect: this.handleOnUnselect,
                    onDoubleClick: this.props.onDoubleClick ? this.handleDoubleClick : null,
                    onBeginHover: this.handleBeginHover,
                    level: 0,
                    selections: this.props.selectedIds,
                    openFolders: this.state.openFolders,
                    visibleIds: this.state.visibleIds,
                    parentFolders: [],
                    foldersAffectedByAction: this.state.affectedParentFolders,
                    getScrollRef: this.getScrollRef,
                  });
                } else {
                  // Child is an Item
                  newChild = React.cloneElement(child, {
                    selectionEnabled: this.props.selectionEnabled,
                    selectionType: this.props.selectionType,
                    onSelect: this.handleOnSelect,
                    onUnselect: this.handleOnUnselect,
                    onDoubleClick: this.props.onDoubleClick ? this.handleDoubleClick : null,
                    onBeginHover: this.handleBeginHover,
                    level: 0,
                    selections: this.props.selectedIds,
                    visibleIds: this.state.visibleIds,
                    parentFolders: [],
                  });
                }
                return newChild;
              })
            }
          </div>
        </ContentContainer>
      </div>
    );
  }
}

TreeViewBase.Item = TreeViewItem;
TreeViewBase.Folder = TreeViewFolder;

TreeViewBase.constants = constants;
TreeViewBase.propTypes = propTypes;
TreeViewBase.defaultProps = defaultProps;
TreeViewBase.contextTypes = contextTypes;

export default TreeViewBase;
