import React from 'react';
import PropTypes from 'prop-types';
import TreeViewBase from './TreeViewBase';
import TreeViewSelectionUtils from './TreeViewSelectionUtils';
import TreeViewExpandCollapseFolderUtils from './TreeViewExpandCollapseFolderUtils';
import TreeViewRow from './TreeViewRow';

/**
 * PropTypes validation of the component
 *
 * @memberof TreeViewFolder
 * @prop {Object} propTypes - the props that are passed in for this component.
 * @prop {React Nodes} propTypes.children - the children TreeViewItem and TreeViewFolder
 *      Nodes.
 * @prop {String} propTypes.id - the unique id for the folder row.
 * @prop {String} propTypes.text - the text to display on the folder row.
 * @prop {String} propTypes.description - the long description to display in the tooltip for the
 *      folder row.
 * @prop {Boolean} propTypes.isEmpty - indicates whether the folder is empty. The absence of
 *      children may not mean that the folder is empty since it may be populated when it is
 *      expanded. This prop allows the application to flag a folder as empty.
 * @prop {Boolean} propTypes.isInitiallyOpen - indicates whether the folder should be expanded on
 *      the initial render of the TreeView component.
 * @prop {Boolean} propTypes.isInitiallySelected - indicates whether the folder should be marked
 *      as selected on the initial render of the TreeView component.
 * @prop {React Node} propTypes.actions - a node containing actionable elements such as buttons or
 *      icons that should be displayed on the right of the folder row when the user selects the
 *      row or hovers the mouse over the row.
 * @prop {React Node} propTypes.indicators - a node containing elements such as icons that provide
 *      the user with information on the status or state of the folder row.
 * @prop {String Array} propTypes.openFolders - internal prop passed from the TreeViewBase
 *      component containing the list of ids for the folders that should be in an expanded state.
 *      This is used by the folder to determine whether it should render as expanded or collapsed.
 * @prop {Function} propTypes.onExpand - internal prop passed from the TreeViewBase component that
 *      is called when the user clicks on the folder's chevron to expand it.
 * @prop {Function} propTypes.onCollapse - internal prop passed from the TreeViewBase component that
 *      is called when the user clicks on the folder's chevron to collapse it.
 * @prop {Boolean} propTypes.selectionEnabled - internal prop passed from the TreeViewBase
 *      component indicating whether selection is enabled for this TreeView component.
 * @prop {String} propTypes.selectionType - internal prop passed from the TreeViewBase component
 *      indicating whether single-row or multi-row selection is being used so that the folder
 *      can determine whether to render with a checkbox or not.
 * @prop {Function} propTypes.onSelect - internal prop passed from the TreeViewBase component that
 *      is called when the user clicks on the folder row to select it.
 * @prop {Function} propTypes.onUnselect - internal prop passed from the TreeViewBase component that
 *      is called when the user clicks on the folder row to unselect it.
 * @prop {Number} propTypes.level - internal prop passed from the TreeViewBase component or a parent
 *      folder that indicates the indentation that should be used for the folder row.
 * @prop {String Array} propTypes.selections - internal prop passed from the TreeViewBase component
 *      containing the list of row ids that are to be marked as selected. If the id for the folder
 *      row is in the list, it will be marked as selected.
 * @prop {String Array} propTypes.visibleIds - internal prop passed from the TreeViewBase component
 *      containing the list of row ids that should be visible in the TreeView based on the list of
 *      open folders. This list is used to determine if the folder row is above a selected row so
 *      that it can determine whether its bottom border should have the selected row color.
 * @prop {String Array} propTypes.parentFolders - internal prop passed from the folder row's
 *      parent folders so that it contains a list of the ids for all of its parent folder rows. This
 *      list is used to pass to the TreeViewBase onSelect and onUnselect callback functions so that
 *      all affected parent folders are re-rendered when the user seleects/unselects a folder.
 * @prop {String Array} propTypes.foldersAffectedByAction - internal prop passed from the
 *      TreeViewBase component containing a list of folders affected by a user action.
 * @prop {Function} propTypes.onDoubleClick - internal prop passed from the TreeViewBase component
 *      containing a function to be called when the user double-clicks on the folder.
 * @prop {Function} propTypes.onBeginHover - internal prop passed from the TreeViewBase component
 *      containing a function to be called when the user moves the mouse over the folder.
 * @prop {String Array} propTypes.getScrollRef - internal prop passed from the TreeViewBase
 *      component containing a function that can be called to get a reference to the scrollable
 *      area of the component.
 */
const propTypes = {
  children: PropTypes.node,
  id: PropTypes.string.isRequired,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  description: PropTypes.string,
  isEmpty: PropTypes.bool,
  // prop is used in utility function.
  // eslint-disable-next-line react/no-unused-prop-types
  isInitiallyOpen: PropTypes.bool,
  openFolders: PropTypes.arrayOf(PropTypes.string),
  onExpand: PropTypes.func,
  onCollapse: PropTypes.func,
  selectionEnabled: PropTypes.bool,
  selectionType: PropTypes.string,
  // prop is used in utility function.
  // eslint-disable-next-line react/no-unused-prop-types
  isInitiallySelected: PropTypes.bool,
  onSelect: PropTypes.func,
  onUnselect: PropTypes.func,
  level: PropTypes.number,
  indicators: PropTypes.node,
  actions: PropTypes.node,
  selections: PropTypes.arrayOf(PropTypes.string),
  onDoubleClick: PropTypes.func,
  onBeginHover: PropTypes.func,
  getScrollRef: PropTypes.func,
  visibleIds: PropTypes.arrayOf(PropTypes.string),
  parentFolders: PropTypes.arrayOf(PropTypes.string),
  foldersAffectedByAction: PropTypes.arrayOf(PropTypes.string),
};

/**
 * Default values for the component props
 *
 * @memberof TreeViewFolder
 * @constant {Object}
 * @default
 *    - isEmpty: defaults to false indicating that the folder should be considered empty and that
 *      no children will be provided later when the folder is expanded.
 *    - isInitiallyOpen: defaults to false indicating that the folder should render in a collapsed
 *      state.
 *    - isInitiallySelected: defaults to false indicating that the folder should not be marked
 *      as selected on initial render of the TreeView unless selection of this folder is caused by
 *      other selections, such as its parent folder being marked as initially selected.
 *    - indicators: defaults to null indicating that no indicator elements would be displayed on the
 *      folder row.
 *    - actions: defaults to null indicating that no action elements would be displayed on the
 *      folder row.
 *    - openFolders: defaults to an empty array indicating that all folders should initially be
 *      rendered in a collapsed state.
 */
const defaultProps = {
  isEmpty: false,
  isInitiallyOpen: false,
  isInitiallySelected: false,
  indicators: null,
  actions: null,
  openFolders: [],
};

/**
 * TreeView folder component.  This component represents a folder in the tree structure.
 * It uses the TreeViewRow component to render the folder row within the tree.
 *
 * @class
 * @returns {React.Component}
 *
 * @example
 * // Empty folder with minimal props.
 * <TreeView.Folder id="f1" text="folder1" />
 *
 * // Example that includes children and a description that is shown in tooltip.
 * <TreeView.Folder id="f1" text="folder1" description="desc 1" >{children}</TreeView.Folder>
 *
 * // Example where folder is marked as selected on initial render.
 * <TreeView.Folder id="f1" text="folder1" isInitiallySelected >{children}</TreeView.Folder>
 *
 * // Example with indicators and actions section popuplated.
 * <TreeView.Folder id="f1" text="folder1" indicators={__ReactNode__} actions={__ReactNode__} >
 *    {children}
 * />
 *
 * // Example where folder is expanded on initial render.
 * <TreeView.Folder id="f1" text="folder1" isInitiallyOpen >{children}</TreeView.Folder>
 */
class TreeViewFolder extends React.Component {
  /**
   * Constructor for the component which binds event handlers.
   */
  constructor(props) {
    super(props);
    this.handleChevronOnClick = this.handleChevronOnClick.bind(this);
  }

  /**
   * React Lifecycle method invoked before rendering when new props or state are being received.
   * Used for performance purposes to cut down on the number of rows that are re-rendered when a
   * prop that is pushed down from the TreeViewBase component has changed, but it has no affect
   * on a particular folder.  For example, when a folder is opened, the list of visible Ids
   * is changed, but if a folder was previously visible and is still visible, there is no need to
   * re-render it.  Instances where the component should be re-rendered include:
   * - item was not previously marked as selected but now should be based on new props.
   * - item was previously marked as selected but should no longer be based on new props.
   * - the row below this item was not previously marked as selected, but now should be based on
   *   new props.
   * - the row below this item was previously marked as selected, but should no longer be based on
   *   new props.
   * - the folder was previously collapsed and now should be expanded.
   * - the folder was previously expanded and now should be collapsed.
   * - the folder is affected by a selection somewhere else in the tree structure.
   * @returns {Boolean} - indication as to whether the component needs to be re-rendered.
   */
  shouldComponentUpdate(nextProps) {
    if (this.props.id === nextProps.id &&
        this.props.text === nextProps.text &&
        this.props.description === nextProps.description &&
        this.props.isEmpty === nextProps.isEmpty &&
        this.props.selectionEnabled === nextProps.selectionEnabled &&
        this.props.selectionType === nextProps.selectionType &&
        this.props.isInitiallyOpen === nextProps.isInitiallyOpen &&
        this.props.onExpand === nextProps.onExpand &&
        this.props.onCollapse === nextProps.onCollapse &&
        this.props.isInitiallySelected === nextProps.isInitiallySelected &&
        this.props.onSelect === nextProps.onSelect &&
        this.props.onUnselect === nextProps.onUnselect &&
        this.props.level === nextProps.level &&
        this.props.indicators === nextProps.indicators &&
        this.props.actions === nextProps.actions &&
        this.props.onDoubleClick === nextProps.onDoubleClick &&
        this.props.onBeginHover === nextProps.onBeginHover &&
        TreeViewSelectionUtils.isIdInSelectionsArray(this.props.selections, this.props.id) ===
          TreeViewSelectionUtils.isIdInSelectionsArray(nextProps.selections, nextProps.id) &&
        TreeViewExpandCollapseFolderUtils.isIdInFoldersArray(
          this.props.openFolders,
          this.props.id,
        ) === TreeViewExpandCollapseFolderUtils.isIdInFoldersArray(
          nextProps.openFolders,
          nextProps.id,
        )
    ) {
      const currNextVisibleId = TreeViewExpandCollapseFolderUtils.getNextVisibleRowId(
        this.props.visibleIds,
        this.props.id,
      );
      const futureNextVisibleId = TreeViewExpandCollapseFolderUtils.getNextVisibleRowId(
        nextProps.visibleIds,
        nextProps.id,
      );
      const currIsRowAboveSelectedRow = this.props.selectionEnabled && currNextVisibleId &&
          TreeViewSelectionUtils.isIdInSelectionsArray(this.props.selections, currNextVisibleId);
      const futureIsRowAboveSelectedRow = nextProps.selectionEnabled && futureNextVisibleId &&
          TreeViewSelectionUtils.isIdInSelectionsArray(nextProps.selections, futureNextVisibleId);
      const currIsFirstVisibleRow = TreeViewExpandCollapseFolderUtils.isFirstVisibleRow(
        this.props.visibleIds,
        this.props.id,
      );
      const futureIsFirstVisibleRow = TreeViewExpandCollapseFolderUtils.isFirstVisibleRow(
        nextProps.visibleIds,
        nextProps.id,
      );
      if (currIsRowAboveSelectedRow === futureIsRowAboveSelectedRow &&
          currIsFirstVisibleRow === futureIsFirstVisibleRow) {
        if (this.props.selections.length !== nextProps.selections.length ||
            this.props.openFolders.length !== nextProps.openFolders.length ||
            this.props.selectionType === TreeViewBase.constants.TREEVIEW_SELECTION_TYPE_SINGLE) {
          if (nextProps.foldersAffectedByAction && nextProps.foldersAffectedByAction.length > 0 &&
              (nextProps.foldersAffectedByAction[0] === TreeViewBase.constants.TREEVIEW_ALL_FOLDERS
               || TreeViewExpandCollapseFolderUtils.isIdInFoldersArray(
                 nextProps.foldersAffectedByAction,
                 nextProps.id,
               ))
          ) {
            return true;
          }
        }
        return false;
      }
    }
    return true;
  }

  /**
   * Handles when the user clicks on the folder's chevron.  If the user is expanding the folder,
   * the TreeViewBase onExpand callback is called.  If the user is collapsing the folder, the
   * TreeViewBase onCollapse callback is called.
   */
  handleChevronOnClick() {
    const newisOpenState = !TreeViewExpandCollapseFolderUtils.isIdInFoldersArray(
      this.props.openFolders,
      this.props.id,
    );
    if (newisOpenState) {
      if (this.props.onExpand) {
        this.props.onExpand(this.props.id, this.props.parentFolders);
      }
    } else if (this.props.onCollapse) {
      this.props.onCollapse(this.props.id, this.props.parentFolders);
    }
  }

  /**
   * Renders the TreeViewItem component. This is accomplished by passing its props on to the
   * TreeViewRow component. The props for the children components are modified to include additional
   * props needed for proper rendering and event handling.
   */
  render() {
    const {
      children,
      id,
      text,
      description,
      isEmpty,
      isInitiallyOpen,
      openFolders,
      onExpand,
      onCollapse,
      selectionEnabled,
      selectionType,
      isInitiallySelected,
      onSelect,
      onUnselect,
      level,
      indicators,
      actions,
      selections,
      onDoubleClick,
      onBeginHover,
      visibleIds,
      parentFolders,
      foldersAffectedByAction,
      getScrollRef,
      ...customProps
    } = this.props;
    const childLevel = level + 1;
    const isOpenFolder = TreeViewExpandCollapseFolderUtils.isIdInFoldersArray(
      openFolders,
      id,
    );

    const nextLvlParentFolders = this.props.parentFolders.slice(0);
    nextLvlParentFolders.push(this.props.id);
    const isEmptyFolder = isEmpty && !TreeViewSelectionUtils.hasValidChildren(children);

    return (
      <div>
        <TreeViewRow
          rowType={TreeViewBase.constants.TREEVIEW_ROW_TYPE_FOLDER}
          id={id}
          text={text}
          description={description}
          isEmptyFolder={isEmptyFolder}
          selectionEnabled={selectionEnabled}
          selectionType={selectionType}
          isInitiallySelected={isInitiallySelected}
          onSelect={onSelect}
          onUnselect={onUnselect}
          level={level}
          indicators={indicators}
          actions={actions}
          selections={selections}
          onDoubleClick={onDoubleClick}
          onBeginHover={onBeginHover}
          visibleIds={visibleIds}
          parentFolders={parentFolders}
          isOpenFolder={isOpenFolder}
          onChevronClick={this.handleChevronOnClick}
          {...customProps}
        />
        {
          React.Children.map(children, (child) => {
            if (!isOpenFolder || child === null) {
              return null;
            }
            let newChild = null;
            if (typeof child.props.openFolders !== 'undefined') {
              // Child is a Folder
              newChild = React.cloneElement(child, {
                onExpand: this.props.onExpand,
                onCollapse: this.props.onCollapse,
                openFolders: this.props.openFolders,
                selectionEnabled: this.props.selectionEnabled,
                selectionType: this.props.selectionType,
                onSelect: this.props.onSelect,
                onUnselect: this.props.onUnselect,
                selections: this.props.selections,
                level: childLevel,
                onDoubleClick: this.props.onDoubleClick,
                onBeginHover: this.props.onBeginHover,
                visibleIds: this.props.visibleIds,
                parentFolders: nextLvlParentFolders,
                foldersAffectedByAction: this.props.foldersAffectedByAction,
                getScrollRef: this.props.getScrollRef,
              });
            } else {
              // Child is an Item
              newChild = React.cloneElement(child, {
                selectionEnabled: this.props.selectionEnabled,
                selectionType: this.props.selectionType,
                onSelect: this.props.onSelect,
                onUnselect: this.props.onUnselect,
                selections: this.props.selections,
                level: childLevel,
                onDoubleClick: this.props.onDoubleClick,
                onBeginHover: this.props.onBeginHover,
                visibleIds: this.props.visibleIds,
                parentFolders: nextLvlParentFolders,
              });
            }
            return newChild;
          })
        }
      </div>
    );
  }
}

TreeViewFolder.propTypes = propTypes;
TreeViewFolder.defaultProps = defaultProps;

export default TreeViewFolder;
