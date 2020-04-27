import React from 'react';
import PropTypes from 'prop-types';
import TreeViewBase from './TreeViewBase';
import TreeViewSelectionUtils from './TreeViewSelectionUtils';
import TreeViewExpandCollapseFolderUtils from './TreeViewExpandCollapseFolderUtils';
import TreeViewRow from './TreeViewRow';

/**
 * PropTypes validation of the component
 *
 * @memberof TreeViewItem
 * @prop {Object} propTypes - the props that are passed in for this component.
 * @prop {String} propTypes.id - the unique id for the leaf item row.
 * @prop {String} propTypes.text - the text to display on the leaf item row.
 * @prop {String} propTypes.description - the long description to display in the tooltip for the
 *      leaf item row.
 * @prop {Boolean} propTypes.isInitiallySelected - indicates whether the leaf item should be marked
 *      as selected on the initial render of the TreeView component.
 * @prop {React Node} propTypes.actions - a node containing actionable elements such as buttons or
 *      icons that should be displayed on the right of the leaf item row when the user selects the
 *      row or hovers the mouse over the row.
 * @prop {React Node} propTypes.indicators - a node containing elements such as icons that provide
 *      the user with information on the status or state of the leaf item row.
 * @prop {Boolean} propTypes.selectionEnabled - internal prop passed from the TreeViewBase
 *      component indicating whether selection is enabled for this TreeView component.
 * @prop {String} propTypes.selectionType - internal prop passed from the TreeViewBase component
 *      indicating whether single-row or multi-row selection is being used so that the leaf item
 *      can determine whether to render with a checkbox or not.
 * @prop {Function} propTypes.onSelect - internal prop passed from the TreeViewBase component that
 *      is called when the user clicks on the leaf item row to select it.
 * @prop {Function} propTypes.onUnselect - internal prop passed from the TreeViewBase component that
 *      is called when the user clicks on the leaf item row to unselect it.
 * @prop {Number} propTypes.level - internal prop passed from the TreeViewBase component or a parent
 *      folder that indicates the indentation that should be used for the leaf item row.
 * @prop {String Array} propTypes.selections - internal prop passed from the TreeViewBase component
 *      containing the list of row ids that are to be marked as selected. If the id for the leaf
 *      item row is in the list, it will be marked as selected.
 * @prop {String Array} propTypes.visibleIds - internal prop passed from the TreeViewBase component
 *      containing the list of row ids that should be visible in the TreeView based on the list of
 *      open folders. This list is used to determine if the leaf item row is above a selected row so
 *      that it can determine whether its bottom border should have the selected row color.
 * @prop {String Array} propTypes.parentFolders - internal prop passed from the leaf item row's
 *      parent folders so that it contains a list of the ids for all of its parent folder rows. This
 *      list is used to pass to the TreeViewBase onSelect and onUnselect callback functions so that
 *      all affected parent folders are re-rendered when the user seleects/unselects a leaf item.
 * @prop {Function} propTypes.onDoubleClick - internal prop passed from the TreeViewBase component
 *      containing a function to be called when the user double-clicks on the leaf item..
 * @prop {Function} propTypes.onBeginHover - internal prop passed from the TreeViewBase component
 *      containing a function to be called when the user moves the mouse over the leaf item.
 */
const propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  description: PropTypes.string,
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
  visibleIds: PropTypes.arrayOf(PropTypes.string),
  parentFolders: PropTypes.arrayOf(PropTypes.string),
};

/**
 * Default values for the component props
 *
 * @memberof TreeViewItem
 * @constant {Object}
 * @default
 *    - isInitiallySelected: defaults to false indicating that the leaf item should not be marked
 *      as selected on initial render of the TreeView unless selection of this item is caused by
 *      other selections, such as its parent folder being marked as initially selected.
 *    - indicators: defaults to null indicating that no indicator elements would be displayed on the
 *      leaf item row.
 *    - actions: defaults to null indicating that no action elements would be displayed on the leaf
 *      item row.
 */
const defaultProps = {
  isInitiallySelected: false,
  indicators: null,
  actions: null,
};

/**
 * TreeView leaf item component.  This component represents a leaf item in the tree structure.
 * It uses the TreeViewRow component to render the leaf item row within the tree.
 *
 * @class
 * @returns {React.Component}
 *
 * @example
 * // Basic usage with minimal props.
 * <TreeView.Item id="i1" text="item1" />
 *
 * // Example that includes description that is shown in tooltip.
 * <TreeView.Item id="i1" text="item1" description="desc 1" />
 *
 * // Example where item is marked as selected on initial render.
 * <TreeView.Item id="i1" text="item1" isInitiallySelected />
 *
 * // Example with indicators and actions section popuplated.
 * <TreeView.Item id="i1" text="item1" indicators={__ReactNode__} actions={__ReactNode__} />
 */
class TreeViewItem extends React.Component {
  /**
   * React Lifecycle method invoked before rendering when new props or state are being received.
   * Used for performance purposes to cut down on the number of rows that are re-rendered when a
   * prop that is pushed down from the TreeViewBase component has changed, but it has no affect
   * on a particular leaf item.  For example, when a folder is opened, the list of visible Ids
   * is changed, but if an item was previously visible and is still visible, there is no need to
   * re-render it.  Instances where the component should be re-rendered include:
   * - item was not previously marked as selected but now should be based on new props.
   * - item was previously marked as selected but should no longer be based on new props.
   * - the row below this item was not previously marked as selected, but now should be based on
   *   new props.
   * - the row below this item was previously marked as selected, but should no longer be based on
   *   new props.
   * @returns {Boolean} - indication as to whether the component needs to be re-rendered.
   */
  shouldComponentUpdate(nextProps) {
    if (this.props.id === nextProps.id &&
        this.props.text === nextProps.text &&
        this.props.description === nextProps.description &&
        this.props.selectionEnabled === nextProps.selectionEnabled &&
        this.props.selectionType === nextProps.selectionType &&
        this.props.isInitiallySelected === nextProps.isInitiallySelected &&
        this.props.onSelect === nextProps.onSelect &&
        this.props.onUnselect === nextProps.onUnselect &&
        this.props.level === nextProps.level &&
        this.props.indicators === nextProps.indicators &&
        this.props.actions === nextProps.actions &&
        this.props.onDoubleClick === nextProps.onDoubleClick &&
        this.props.onBeginHover === nextProps.onBeginHover &&
        TreeViewSelectionUtils.isIdInSelectionsArray(this.props.selections, this.props.id) ===
          TreeViewSelectionUtils.isIdInSelectionsArray(nextProps.selections, nextProps.id)
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
        return false;
      }
    }
    return true;
  }

  /**
   * Renders the TreeViewItem component. This is accomplished by passing its props on to the
   * TreeViewRow component.
   */
  render() {
    const {
      id,
      text,
      description,
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
      ...customProps
    } = this.props;
    return (
      <TreeViewRow
        rowType={TreeViewBase.constants.TREEVIEW_ROW_TYPE_ITEM}
        id={id}
        text={text}
        description={description}
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
        {...customProps}
      />
    );
  }
}

TreeViewItem.propTypes = propTypes;
TreeViewItem.defaultProps = defaultProps;

export default TreeViewItem;
