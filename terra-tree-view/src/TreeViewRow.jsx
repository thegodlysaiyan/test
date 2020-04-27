import React from 'react';
import PropTypes from 'prop-types';
import Arrange from 'terra-arrange';
import IconChevronRight from 'terra-icon/lib/icon/IconChevronRight';
import IconChevronDown from 'terra-icon/lib/icon/IconChevronDown';
import Checkbox from 'terra-form-checkbox';
import TreeViewBase from './TreeViewBase';
import TreeViewSelectionUtils from './TreeViewSelectionUtils';
import TreeViewExpandCollapseFolderUtils from './TreeViewExpandCollapseFolderUtils';
import styles from './TreeView.scss';

/**
 * PropTypes validation of the component.
 *
 * @memberof TreeViewRow
 * @prop {Object} propTypes - the props that are passed in for this component.
 * @prop {String} propTypes.rowType - indicates whether a folder or leaf item row should be
 *      rendered.
 * @prop {String} propTypes.id - the unique id for the row.
 * @prop {String} propTypes.text - the text to display on the row.
 * @prop {String} propTypes.description - the long description to display in the tooltip for the
 *      row.
 * @prop {Boolean} propTypes.isEmptyFolder - indicates whether the folder is empty.
 * @prop {Boolean} propTypes.isInitiallySelected - indicates whether the row should be marked
 *      as selected on the initial render of the TreeView component.
 * @prop {React Node} propTypes.actions - a node containing actionable elements such as buttons or
 *      icons that should be displayed on the right of the folder row when the user selects the
 *      row or hovers the mouse over the row.
 * @prop {React Node} propTypes.indicators - a node containing elements such as icons that provide
 *      the user with information on the status or state of the row.
 * @prop {Boolean} propTypes.selectionEnabled - internal prop passed from the TreeViewBase
 *      component indicating whether selection is enabled for this TreeView component.
 * @prop {String} propTypes.selectionType - internal prop passed from the TreeViewBase component
 *      indicating whether single-row or multi-row selection is being used so that the row
 *      can determine whether to render with a checkbox or not.
 * @prop {Boolean} propTypes.isOpenFolder - indicates whether this row should be rendered as an open
 *      folder.
 * @prop {Function} propTypes.onChevronClick - internal prop passed from the TreeViewFolder
 *      component containing a function to be called when the user clicks on the chevron for a
 *      folder row.
 * @prop {Function} propTypes.onSelect - internal prop passed from the TreeViewBase component that
 *      is called when the user clicks on the row to select it.
 * @prop {Function} propTypes.onUnselect - internal prop passed from the TreeViewBase component that
 *      is called when the user clicks on the row to unselect it.
 * @prop {Number} propTypes.level - internal prop passed from the TreeViewBase component or a parent
 *      folder that indicates the indentation that should be used for the row.
 * @prop {String Array} propTypes.selections - internal prop passed from the TreeViewBase component
 *      containing the list of row ids that are to be marked as selected. If the id for the
 *      row is in the list, it will be marked as selected.
 * @prop {String Array} propTypes.visibleIds - internal prop passed from the TreeViewBase component
 *      containing the list of row ids that should be visible in the TreeView based on the list of
 *      open folders. This list is used to determine if the row is above a selected row so
 *      that it can determine whether its bottom border should have the selected row color.
 * @prop {String Array} propTypes.parentFolders - internal prop passed from the row's
 *      parent folders so that it contains a list of the ids for all of its parent folder rows. This
 *      list is used to pass to the TreeViewBase onSelect and onUnselect callback functions so that
 *      all affected parent folders are re-rendered when the user seleects/unselects a folder.
 * @prop {Function} propTypes.onDoubleClick - internal prop passed from the TreeViewBase component
 *      containing a function to be called when the user double-clicks on the row.
 * @prop {Function} propTypes.onBeginHover - internal prop passed from the TreeViewBase component
 *      containing a function to be called when the user moves the mouse over the row.
 */
const propTypes = {
  rowType: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  description: PropTypes.string,
  isEmptyFolder: PropTypes.bool,
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
  isOpenFolder: PropTypes.bool,
  onChevronClick: PropTypes.func,
};

/**
 * Default values for the component props
 *
 * @memberof TreeViewFolder
 * @constant {Object}
 * @default
 *    - isInitiallySelected: defaults to false indicating that the row should not be marked
 *      as selected on initial render of the TreeView unless selection of this row is caused by
 *      other selections, such as its parent folder being marked as initially selected.
 *    - indicators: defaults to null indicating that no indicator elements would be displayed on the
 *      row.
 *    - actions: defaults to null indicating that no action elements would be displayed on the
 *      row.
 *    - isOpenFolder: defaults to false indicating that the row should not be rendered as an open
 *      folder.
 */
const defaultProps = {
  isEmptyFolder: false,
  isInitiallySelected: false,
  indicators: null,
  actions: null,
  isOpenFolder: false,
};

/**
 * Context Types for the component.
 *
 * @memberof TreeViewRow
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
 * TreeView row component.  This component renders a folder or leaf item in the tree structure based
 * on the rowType prop. This is for internal use by the TreeViewItem and TreeViewFolder components.
 * It is not meant for use by consuming applications.
 *
 * @class
 * @returns {React.Component}
 *
 * @example
 * // Empty folder riw with minimal props.
 * <TreeViewRow id="f1" text="folder1" rowType="folder" />
 *
 * // Basic leaf item row.
 * <TreeViewItem id="f1" text="folder1" rowTime="item" />>
 */
class TreeViewRow extends React.Component {
  /**
   * Constructor for the component which initializes the state and binds event handlers. The initial
   * state includes:
   *  - numClicks: initially set to zero indicating that the row hasn't been clicked yet.
   *  - clickTimer: initially set to null indicating that no timer is in place to check for a
   *    double-click on the row.
   *  - isInHoverState: initially set to false to indicate that the user isn't hovering the mouse
   *    over the row.
   *  - isInTouchMode: initially set to false to indicate that the user has not touched the row
   *    on a touch screen.
   */
  constructor(props) {
    super(props);
    this.handleChevronOnClick = this.handleChevronOnClick.bind(this);
    this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
    this.handleSingleSelectClick = this.handleSingleSelectClick.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleActionsSectionClick = this.handleActionsSectionClick.bind(this);
    this.handleSingleClick = this.handleSingleClick.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.endHover = this.endHover.bind(this);
    this.state = {
      numClicks: 0,
      clickTimer: null,
      isInHoverState: false,
      isInTouchMode: false,
    };
  }

  /**
   * Handles when the user clicks on the folder's chevron and calls the chevron click handler on
   * the TreeViewFolder component that was passed in as a prop.  Then prevent the click from
   * bubbling up to the row element so that the row selection/unselection process doesn't execute.
   */
  handleChevronOnClick(e) {
    this.props.onChevronClick(this.endHover);
    e.preventDefault();
    e.stopPropagation();
  }

  /**
   * Handles when the user clicks on the rows checkbox when multi-row selection is enabled. Prevents
   * the click from bubbling up to the row element so that the row selection/unselection process
   * doesn't execute.
   */
  /* eslint-disable class-methods-use-this */
  handleCheckboxClick(e) {
    e.stopPropagation();
  }
  /* eslint-enable class-methods-use-this */

  /**
   * Handles when the user toggles the row's checkbox to change the selection state of the row.
   * Based on the new selection state either the onSelect or onUnselect handler in TreeViewBase
   * is called to process the selection change.
   */
  handleCheckboxChange() {
    if (!this.props.selectionEnabled) {
      return;
    }
    const newisSelectedState = !TreeViewSelectionUtils.isIdInSelectionsArray(
      this.props.selections,
      this.props.id,
    );
    if (newisSelectedState) {
      if (this.props.onSelect) {
        this.props.onSelect(this.props.id, this.props.parentFolders);
      }
    } else if (this.props.onUnselect) {
      this.props.onUnselect(this.props.id, this.props.parentFolders);
    }
    this.setState({
      numClicks: 0,
      clickTimer: null,
    });
  }

  /**
   * Handles when the user single-clicked on a row where single-row selection is enabled. Calls the
   * onSelect handler in SingleSelectTreeView to process the selection.
   */
  handleSingleSelectClick() {
    if (!this.props.selectionEnabled) {
      return;
    }
    const isClickedItemSelected = TreeViewSelectionUtils.isIdInSelectionsArray(
      this.props.selections,
      this.props.id,
    );
    if (isClickedItemSelected) {
      return;
    }
    if (this.props.onSelect) {
      this.props.onSelect(this.props.id, this.props.parentFolders);
    }
  }

  /**
   * Handles when the user clicks on the row's actions section and prevents the click event from
   * bubbling up to the row element so that the row selection/unselection process does not execute.
   */
  handleActionsSectionClick(e) {
    if (!this.props.selectionEnabled) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
  }

  /**
   * Handles the user's first click on a row. If there is no onDoubleClick prop passed into the
   * TreeView by the application then simply calls the appropriate handler to handle the click
   * based on whether single-row or multi-row selection is being used.
   * However, if the application did pass the onDoubleClick prop to the TreeView, then wait a
   * quarter second for a second click by the user. If the second click is received in that time
   * then the double-click handler is called, otherwise the appropriate single-click handler is
   * called to process the row selection.
   */
  handleSingleClick() {
    if (!this.props.onDoubleClick) {
      if (this.props.selectionType === TreeViewBase.constants.TREEVIEW_SELECTION_TYPE_MULTI) {
        this.handleCheckboxChange();
      } else {
        this.handleSingleSelectClick();
      }
      this.setState({
        isInHoverState: false,
        isInTouchMode: false,
      });
      return;
    }
    const clickCounter = this.state.numClicks + 1;
    let timer = this.state.clickTimer;
    if (clickCounter === 1) {
      timer =
        setTimeout(this.props.selectionType === TreeViewBase.constants.TREEVIEW_SELECTION_TYPE_MULTI
          ? this.handleCheckboxChange : this.handleSingleSelectClick, 250);
      this.setState({
        numClicks: clickCounter,
        clickTimer: timer,
      });
    } else {
      clearTimeout(this.state.clickTimer);
      if (this.props.onDoubleClick) {
        this.props.onDoubleClick(this.props.id);
      }
      this.setState({
        numClicks: 0,
        clickTimer: null,
        isInHoverState: false,
        isInTouchMode: false,
      });
    }
  }

  /**
   * Handles when the user double-clicks on a row. Ignore the event since the timer delay in the
   * single-click handler actually handles the double-click.
   */
  handleDoubleClick(e) {
    if (!this.props.onDoubleClick) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      numClicks: 0,
      clickTimer: null,
    });
  }

  /**
   * Handles when the user first touches the row on a touch screen device and sets a state
   * attribute indicating that touch mode is being used and as a result, the row should not go
   * into a hover state.
   */
  handleTouchStart(e) {
    this.setState({
      isInHoverState: false,
      isInTouchMode: true,
    });
    e.stopPropagation();
  }

  /**
   * Handles when the user moves the mouse over a row and sets state indicating that the row is in
   * a hover state. If the application provided an onBeginHover prop on the TreeView, then that
   * function is called to tell the application that hover has begun on the row and passes it
   * a callback that the application can call to end the hover state on the row. This is useful
   * when an action on the row displays a component like the Terra Menu that prevents the
   * onMouseLeave event from firing on the row.
   */
  handleMouseEnter(e) {
    this.setState({
      isInHoverState: !this.state.isInTouchMode,
    });
    if (this.props.onBeginHover) {
      this.props.onBeginHover(this.endHover);
    }
    e.stopPropagation();
  }

  /**
   * Handles when the user moves the mouse away from the row and sets state indicating that the
   * row is no longer in a hover state.
   */
  handleMouseLeave(e) {
    this.setState({
      isInHoverState: false,
    });
    e.stopPropagation();
  }

  /**
   * Handles when the user had touched the row and moved his/her finger. Sets state indicating that
   * the row should not be in a hover state since the touch screen is being used.
   */
  handleTouchMove(e) {
    this.setState({
      isInHoverState: false,
    });
    e.stopPropagation();
  }

  /**
   * Handles when the user lifted his/her finger from the row. Sets state indicating that the row
   * should not be in a hover state since the touch screen is being used.
   */
  handleTouchEnd(e) {
    this.setState({
      isInHoverState: false,
    });
    e.stopPropagation();
  }

  /**
   * Callback function that the application can call to force the end to the hover state on the row.
   * This is useful when an action on the row displays a component like the Terra Menu that prevents
   * the onMouseLeave event from firing on the row.
   */
  endHover() {
    this.setState({
      isInHoverState: false,
    });
  }

  /**
   * Renders the TreeViewRow component. A folder or leaf item row is rendered based on the rowType
   * prop received.
   */
  render() {
    const {
      rowType,
      id,
      text,
      description,
      isEmptyFolder,
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
      isOpenFolder,
      onChevronClick,
      ...customProps
    } = this.props;
    const { intl } = this.context;

    // Indent 20px for each hierarchical level.
    const indent = `${(level * 20) + 10}px`;
    const mainContentFillValue = (<span>{text}</span>);
    const itemSelected = TreeViewSelectionUtils.isIdInSelectionsArray(
      selections,
      id,
    );
    const rowId = `${TreeViewBase.constants.TREEVIEW_ROW_PREFIX}${id}`;

    // Set up the stylesheets for the row, which can indicate whether the row is selected, is in a
    // hover state, is above a selected row, and is the first visible row.
    let rowClassNames = styles.rowContainer;
    const nextVisibleId = TreeViewExpandCollapseFolderUtils.getNextVisibleRowId(visibleIds, id);
    const isRowAboveSelectedRow = selectionEnabled && nextVisibleId
        && TreeViewSelectionUtils.isIdInSelectionsArray(selections, nextVisibleId);
    const isFirstVisibleRow = TreeViewExpandCollapseFolderUtils.isFirstVisibleRow(visibleIds, id);
    if (selectionEnabled) {
      if (itemSelected) {
        rowClassNames = isFirstVisibleRow ? `${styles.firstVisibleRow} ` : '';
        rowClassNames += this.state.isInHoverState ? styles.rowSelectedHover : styles.rowSelected;
      } else if (this.state.isInHoverState) {
        rowClassNames = styles.rowUnselectedHover;
        rowClassNames += isFirstVisibleRow ? ` ${styles.firstVisibleRow}` : '';
        rowClassNames += isRowAboveSelectedRow ? ` ${styles.rowAboveSelectedRow}` : '';
      } else {
        rowClassNames += isFirstVisibleRow ? ` ${styles.firstVisibleRow}` : '';
        rowClassNames += isRowAboveSelectedRow ? ` ${styles.rowAboveSelectedRow}` : '';
      }
    } else {
      rowClassNames += isFirstVisibleRow ? ` ${styles.firstVisibleRow}` : '';
      if (this.state.isInHoverState) {
        rowClassNames += ` ${styles.rowNotSelectableHover}`;
      }
    }

    let rowFitStartValue = (
      <div>
        <div className={styles.rowInlineBlockDiv} style={{ width: indent }} />
      </div>
    );
    let rowFitStartAttributes = null;
    if (selectionEnabled &&
        selectionType === TreeViewBase.constants.TREEVIEW_SELECTION_TYPE_MULTI) {
      // if multi-row selection is enabled, then need to include the checkbox on the row.
      rowFitStartValue = (
        <div>
          <div className={styles.rowInlineBlockDiv} style={{ width: indent }} />
          <div className={styles.rowInlineBlockDiv}>
            <Checkbox
              labelText=""
              isLabelHidden
              checked={itemSelected}
              onChange={this.handleCheckboxChange}
              inputAttrs={{ onClick: this.handleCheckboxClick, style: { marginLeft: '0px', marginRight: '0px' } }}
            />
          </div>
        </div>
      );
      rowFitStartAttributes = {
        className: styles.rowCheckboxSection,
      };
    }
    let indicatorsAttributes = null;
    if (indicators) {
      indicatorsAttributes = {
        className: styles.rowIndicatorsSection,
      };
    }
    let actionsSectionAttributes = null;
    const actionsSectionClassName = selectionEnabled && itemSelected ?
      styles.selectedRowActionsSection : styles.unselectedRowActionsSection;
    const actionsSectionValue = (<div className={actionsSectionClassName}>{actions}</div>);
    if (actions) {
      actionsSectionAttributes = {
        className: styles.rowActionsSection,
        onClick: this.handleActionsSectionClick,
      };
    }

    // Build the tooltip for the row to include the unformatted text followed by a line break and
    // the description if provided.
    const unformattedText = typeof text === 'string' ?
      text : TreeViewSelectionUtils.getTextStringFromObject('', text);
    const tooltip = description ? `${unformattedText}\r\n\r\n${description}` : unformattedText;

    const mainContentFillAttributes = {
      className: styles.rowTextSection,
      title: tooltip,
    };
    const mainContent = (
      <Arrange
        align="center"
        fitStart={indicators}
        fitStartAttributes={indicatorsAttributes}
        fill={mainContentFillValue}
        fillAttributes={mainContentFillAttributes}
        fitEnd={actionsSectionValue}
        fitEndAttributes={actionsSectionAttributes}
      />
    );

    // If the rowType is a folder, then the chevron must be included on the row.
    let rowFillValue = null;
    if (rowType === 'folder' && !isEmptyFolder) {
      let chevron = <IconChevronRight isBidi width="10px" height="10px" className={styles.folderChevron} />;
      let chevronTitle = intl.formatMessage({ id: 'tree-view.tooltips.click-to-expand' });
      if (this.props.isOpenFolder) {
        chevron = <IconChevronDown width="10px" height="10px" className={styles.folderChevron} />;
        chevronTitle = intl.formatMessage({ id: 'tree-view.tooltips.click-to-collapse' });
      }
      rowFillValue = (
        <Arrange
          align="center"
          fitStart={
            <span title={chevronTitle}>
              {chevron}
            </span>
          }
          fitStartAttributes={{ onClick: this.handleChevronOnClick }}
          fill={mainContent}
        />
      );
    } else {
      rowFillValue = mainContent;
    }

    return (
      <div id={rowId} {...customProps}>
        <Arrange
          fitStart={rowFitStartValue}
          fitStartAttributes={rowFitStartAttributes}
          fill={rowFillValue}
          align="center"
          className={rowClassNames}
          onClick={this.handleSingleClick}
          onDoubleClick={this.handleDoubleClick}
          onTouchStart={this.handleTouchStart}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onTouchMove={this.handleTouchMove}
          onTouchEnd={this.handleTouchEnd}
        />
      </div>
    );
  }
}

TreeViewRow.propTypes = propTypes;
TreeViewRow.defaultProps = defaultProps;
TreeViewRow.contextTypes = contextTypes;

export default TreeViewRow;
