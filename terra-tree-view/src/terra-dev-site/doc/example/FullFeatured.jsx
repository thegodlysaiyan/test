import React from 'react';
import Button from 'terra-button';
import IconEdit from 'terra-icon/lib/icon/IconEdit';
import IconTrash from 'terra-icon/lib/icon/IconTrash';
import IconAlert from 'terra-icon/lib/icon/IconAlert';
import IconWarning from 'terra-icon/lib/icon/IconWarning';
import IconFolder from 'terra-icon/lib/icon/IconFolder';
import IconPaperFolded from 'terra-icon/lib/icon/IconPaperFolded';
import IconOverDue from 'terra-icon/lib/icon/IconOverDue';
import IconDueSoon from 'terra-icon/lib/icon/IconDueSoon';
import Checkbox from 'terra-form-checkbox';
import TreeView from '../../TreeView';
import styles from './../site.scss';

export default class FullFeatured extends React.Component {
  constructor(props) {
    super(props);
    this.resetLogs = this.resetLogs.bind(this);
    this.handleFolderExpand = this.handleFolderExpand.bind(this);
    this.handleFolderCollapse = this.handleFolderCollapse.bind(this);
    this.handleExpandAll = this.handleExpandAll.bind(this);
    this.handleCollapseAll = this.handleCollapseAll.bind(this);
    this.handleEditOnClick = this.handleEditOnClick.bind(this);
    this.handleTrashOnClick = this.handleTrashOnClick.bind(this);
    this.handleAlertOnClick = this.handleAlertOnClick.bind(this);
    this.handleWarningOnClick = this.handleWarningOnClick.bind(this);
    this.handleOnSelect = this.handleOnSelect.bind(this);
    this.handleOnUnselect = this.handleOnUnselect.bind(this);
    this.handleOnSelectAll = this.handleOnSelectAll.bind(this);
    this.handleOnUnselectAll = this.handleOnUnselectAll.bind(this);
    this.handleSingleRootCheckboxChange = this.handleSingleRootCheckboxChange.bind(this);
    this.handleSelectionEnabledCheckboxChange =
      this.handleSelectionEnabledCheckboxChange.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.state = {
      userAction: '',
      actionId: '',
      userSelectionAction: '',
      selectActionId: '',
      allItemsSelected: '',
      currentSelections: '',
      singleRootExpansion: false,
      selectionEnabled: true,
      doubleClickId: '',
      expandCollapseLogChanged: false,
      doubleClickLogChanged: false,
      selectionLogChanged: false,
      renderCount: 1,
    };
  }

  getItemActions(id) {
    return (
      <div>
        <Button text="Edit" variant="utility" name={id} isCompact onClick={this.handleEditOnClick} style={{ width: '25px' }} icon={<IconEdit />} />
        <Button text="Delete" variant="utility" name={id} isCompact onClick={this.handleTrashOnClick} style={{ width: '25px' }} icon={<IconTrash />} />
      </div>
    );
  }

  getAlertAction(id) {
    return (
      <div>
        <Button text="Alert" variant="utility" name={id} isCompact onClick={this.handleAlertOnClick} style={{ width: '25px' }} icon={<IconAlert />} />
      </div>
    );
  }

  getWarningAction(id) {
    return (
      <div>
        <Button text="Warning" variant="utility" name={id} isCompact onClick={this.handleWarningOnClick} style={{ width: '25px' }} icon={<IconWarning />} />
      </div>
    );
  }

  handleFolderExpand(id) {
    this.setState({
      userAction: 'Expand folder',
      actionId: id,
      expandCollapseLogChanged: true,
    });
    setTimeout(this.resetLogs, 750);
  }

  handleFolderCollapse(id) {
    this.setState({
      userAction: 'Collapse folder',
      actionId: id,
      expandCollapseLogChanged: true,
    });
    setTimeout(this.resetLogs, 750);
  }

  handleExpandAll() {
    this.setState({
      userAction: 'Expand all folders',
      actionId: 'N/A',
      expandCollapseLogChanged: true,
    });
    setTimeout(this.resetLogs, 750);
  }

  handleCollapseAll() {
    this.setState({
      userAction: 'Collapse all folders',
      actionId: 'N/A',
      expandCollapseLogChanged: true,
    });
    setTimeout(this.resetLogs, 750);
  }

  handleOnSelect(selectionObj) {
    this.setState({
      userSelectionAction: 'Select Item/Folder',
      selectActionId: selectionObj.actionId,
      allItemsSelected: selectionObj.allItemsSelected,
      currentSelections: selectionObj.currentSelections,
      selectionLogChanged: true,
    });
    setTimeout(this.resetLogs, 750);
  }

  handleOnUnselect(selectionObj) {
    this.setState({
      userSelectionAction: 'Unselect Item/Folder',
      selectActionId: selectionObj.actionId,
      allItemsSelected: selectionObj.allItemsSelected,
      currentSelections: selectionObj.currentSelections,
      selectionLogChanged: true,
    });
    setTimeout(this.resetLogs, 750);
  }

  handleOnSelectAll(selectionObj) {
    this.setState({
      userSelectionAction: 'Select All',
      selectActionId: selectionObj.actionId,
      allItemsSelected: selectionObj.allItemsSelected,
      currentSelections: selectionObj.currentSelections,
      selectionLogChanged: true,
    });
    setTimeout(this.resetLogs, 750);
  }

  handleOnUnselectAll(selectionObj) {
    this.setState({
      userSelectionAction: 'Unselect All',
      selectActionId: selectionObj.actionId,
      allItemsSelected: selectionObj.allItemsSelected,
      currentSelections: selectionObj.currentSelections,
      selectionLogChanged: true,
    });
    setTimeout(this.resetLogs, 750);
  }

  handleSingleRootCheckboxChange() {
    this.setState({
      singleRootExpansion: !this.state.singleRootExpansion,
      renderCount: this.state.renderCount + 1,
    });
  }

  handleSelectionEnabledCheckboxChange() {
    this.setState({
      selectionEnabled: !this.state.selectionEnabled,
      renderCount: this.state.renderCount + 1,
    });
  }

  handleDoubleClick(id) {
    this.setState({
      doubleClickId: id,
      doubleClickLogChanged: true,
    });
    setTimeout(this.resetLogs, 750);
  }

  /* eslint-disable class-methods-use-this, no-alert */
  handleEditOnClick(e) {
    const editRowId = e.currentTarget.name;
    alert(`Edit button clicked for row: ${editRowId}`);
  }

  handleTrashOnClick(e) {
    const deleteRowId = e.currentTarget.name;
    alert(`Delete button clicked for row: ${deleteRowId}`);
  }

  handleAlertOnClick(e) {
    const alertRowId = e.currentTarget.name;
    alert(`Alert button clicked for row: ${alertRowId}`);
  }

  handleWarningOnClick(e) {
    const warningRowId = e.currentTarget.name;
    alert(`Warning button clicked for row: ${warningRowId}`);
  }
  /* eslint-enable class-methods-use-this, no-alert */

  resetLogs() {
    this.setState({
      expandCollapseLogChanged: false,
      doubleClickLogChanged: false,
      selectionLogChanged: false,
    });
  }

  render() {
    const expandCollapseLogBgColor = this.state.expandCollapseLogChanged ? 'LightGoldenRodYellow' : 'white';
    const selectionLogBgColor = this.state.selectionLogChanged ? 'LightGoldenRodYellow' : 'white';
    const doubleClickLogBgColor = this.state.doubleClickLogChanged ? 'LightGoldenRodYellow' : 'white';
    const allSelectedStr = `${this.state.allItemsSelected} `;
    const currentSelectionsStr = this.state.currentSelections.toString().replace(/,/g, ', ');
    const onExpandPropStr = '{this.handleFolderExpand}';
    const onCollapsePropStr = '{this.handleFolderCollapse}';
    const onExpandAllPropStr = '{this.handleExpandAll}';
    const onCollapseAllPropStr = '{this.handleCollapseAll}';
    const onSelectPropStr = '{this.handleOnSelect}';
    const onUnselectPropStr = '{this.handleOnUnselect}';
    const onSelectAllPropStr = '{this.handleOnSelectAll}';
    const onUnselectAllPropStr = '{this.handleOnUnselectAll}';
    const folderIndicatorStr = '{folderIndicator}';
    const leafIndicatorStr = '{leafIndicator}';
    const dueSoonLeafIndicatorStr = '{dueSoonLeafIndicator}';
    const overdueFolderIndicatorStr = '{overdueFolderIndicator}';
    const editClickStr = '{this.handleEditOnClick}';
    const trashClickStr = '{this.handleTrashOnClick}';
    const alertClickStr = '{this.handleAlertOnClick}';
    const warningClickStr = '{this.handleWarningOnClick}';
    const editIconStr = '{<IconEdit />}';
    const trashIconStr = '{<IconTrash />}';
    const alertIconStr = '{<IconAlert />}';
    const actionsStr = '{itemAction}';
    const alertActionsStr = '{alertAction}';
    const warningIconStr = '{<IconWarning />}';
    const warningActionsStr = '{warningAction}';
    const folderIndicator = (
      <div>
        <IconFolder />
      </div>
    );
    const leafIndicator = (
      <div>
        <IconPaperFolded />
      </div>
    );
    const overdueFolderIndicator = (
      <div>
        <IconFolder className={styles.iconMargin} />
        <IconOverDue />
      </div>
    );
    const dueSoonLeafIndicator = (
      <div>
        <IconPaperFolded className={styles.iconMargin} />
        <IconDueSoon />
      </div>
    );
    return (
      <div>
        <h1>TreeView - Full Featured</h1>
        <div>
          This page shows all features of the TreeView in use.
          <ul>
            <li>
              Selection is enabled with the default &quot;uncontrolled&quot; selection model.
              It can be toggled on/off via the toggle checkbox below the TreeView component.
            </li>
            <li>
              The actions section is added to the leaf items and to folders &quot;1ba&quot;
              and &quot;2&quot;.  NOTE: the selectionEnabled prop is required in order to show the
              actions section on the rows.  It will only be displayed when a row is selected or when
              the user hovers the mouse over an unselected row.
            </li>
            <li>The indicators section is added to folders and leaf items.</li>
            <li>
              Single Root Level Folder Expansion can be turned on/off via the toggle checkbox below
              the TreeView component.
            </li>
            <li>
              Callback functions are passed as props for expand/collapse, selection and
              double-click actions. Those callback functions log the user actions below.
            </li>
            <li>
              Custom props on TreeView.Folder and TreeView.Item tags. The tags for items
               &quot;Item 1&quot; and  &quot;Folder 3 / Item 1&quot; and for folders
              &quot;Folder 1ba&quot; and  &quot;Folder 2&quot; have a custom className prop on
              them that provide a custom background color for those rows in the TreeView.
              See the sample code below for an example on how it was coded.
            </li>
          </ul>
        </div>
        <br />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
          }}
        >
          <div style={{ width: '400px', height: '400px' }}>
            <TreeView
              title="Test TreeView - Full Featured"
              selectionEnabled={this.state.selectionEnabled}
              singleRootFolderExpansion={this.state.singleRootExpansion}
              onExpand={this.handleFolderExpand}
              onCollapse={this.handleFolderCollapse}
              onExpandAll={this.handleExpandAll}
              onCollapseAll={this.handleCollapseAll}
              onSelect={this.handleOnSelect}
              onUnselect={this.handleOnUnselect}
              onSelectAll={this.handleOnSelectAll}
              onUnselectAll={this.handleOnUnselectAll}
              onDoubleClick={this.handleDoubleClick}
              key={this.state.renderCount}
            >
              <TreeView.Item id="i1" text="Item 1" actions={this.getWarningAction('i1')} indicators={dueSoonLeafIndicator} className={styles.warningRow} />
              <TreeView.Item id="i2" text="Item 2" actions={this.getItemActions('i2')} indicators={leafIndicator} />
              <TreeView.Folder id="f1" text="Folder 1" isInitiallySelected indicators={folderIndicator} >
                <TreeView.Item id="f1_i1" text="Folder 1 / Item 1" actions={this.getItemActions('f1_i1')} indicators={leafIndicator} />
                <TreeView.Item id="f1_i2" text="Folder 1 / Item 2" actions={this.getItemActions('f1_i2')} indicators={leafIndicator} />
                <TreeView.Folder id="f1a" text="Folder 1a" indicators={folderIndicator} >
                  <TreeView.Item id="f1a_i1" text="Folder 1a / Item 1" actions={this.getItemActions('f1a_i1')} indicators={leafIndicator} />
                  <TreeView.Item id="f1a_i2" text="Folder 1a / Item 2" actions={this.getItemActions('f1a_i2')} indicators={leafIndicator} />
                </TreeView.Folder>
                <TreeView.Folder id="f1b" text="Folder 1b" indicators={folderIndicator} >
                  <TreeView.Item id="f1b_i1" text="Folder 1b / Item 1" actions={this.getItemActions('f1b_i1')} indicators={leafIndicator} />
                  <TreeView.Item id="f1b_i2" text="Folder 1b / Item 2" actions={this.getItemActions('f1b_i2')} indicators={leafIndicator} />
                  <TreeView.Folder id="f1ba" text="Folder 1ba with extra text to cause truncation" actions={this.getAlertAction('f1ba')} indicators={overdueFolderIndicator} className={styles.errorRow} >
                    <TreeView.Item id="f1ba_i1" text="Folder 1ba / Item 1" actions={this.getItemActions('f1ba_i1')} indicators={leafIndicator} />
                    <TreeView.Item id="f1ba_i2" text="Folder 1ba / Item 2 with extra text to cause truncation" actions={this.getItemActions('f1ba_i2')} indicators={leafIndicator} />
                  </TreeView.Folder>
                </TreeView.Folder>
              </TreeView.Folder>
              <TreeView.Folder id="f2" text="Folder 2" actions={this.getAlertAction('f2')} indicators={overdueFolderIndicator} className={styles.errorRow} >
                <TreeView.Item id="f2_i1" text="Folder 2 / Item 1" actions={this.getItemActions('f2_i1')} indicators={leafIndicator} />
              </TreeView.Folder>
              <TreeView.Folder id="f3" text="Folder 3" indicators={folderIndicator} >
                <TreeView.Item id="f3_i1" text="Folder 3 / Item 1" isInitiallySelected actions={this.getWarningAction('f3_i1')} indicators={dueSoonLeafIndicator} className={styles.warningRow} />
                <TreeView.Item id="f3_i2" text="Folder 3 / Item 2" isInitiallySelected actions={this.getItemActions('f3_i2')} indicators={leafIndicator} />
              </TreeView.Folder>
            </TreeView>
            <br />
            <div>
              <Checkbox
                labelText="Single Root Level Folder Expansion"
                isInline
                checked={this.state.singleRootExpansion}
                onChange={this.handleSingleRootCheckboxChange}
              />
            </div>
            <div>
              <Checkbox
                labelText="Selection Enabled"
                isInline
                checked={this.state.selectionEnabled}
                onChange={this.handleSelectionEnabledCheckboxChange}
              />
            </div>
          </div>
          <div
            style={{
              border: '1px solid lightgray',
              height: '300px',
              width: '300px',
            }}
          >
            <div style={{ padding: '5px', backgroundColor: expandCollapseLogBgColor, transition: 'background 0.3s linear' }}>
              <strong>Expand/Collapse Action Log</strong>
              <p id="expColUserAction">User Action: {this.state.userAction}</p>
              <p id="expColActionId">Action ID: {this.state.actionId}</p>
            </div>
            <br />
            <div style={{ padding: '5px', backgroundColor: doubleClickLogBgColor, transition: 'background 0.3s linear' }}>
              <strong>Double-click Action Log</strong>
              <p id="doubleClickRowId">Doubld-click Row ID: {this.state.doubleClickId}</p>
            </div>
          </div>
          <div
            style={{
              backgroundColor: selectionLogBgColor,
              border: '1px solid lightgray',
              padding: '5px',
              height: '300px',
              width: '300px',
              transition: 'background 0.3s linear',
            }}
          >
            <strong>Selection Action Log</strong>
            <p id="selectUserAction">User Action: {this.state.userSelectionAction}</p>
            <p id="selectActionId">Action ID: {this.state.selectActionId}</p>
            <p id="allSelected">Are All Selected?: {allSelectedStr}</p>
            <p id="currentSelId">Current Selected IDs: {currentSelectionsStr}</p>
          </div>
        </div>
        <br /><br /><br />
        <div>
          <h3>Expand/Collapse Action Log</h3>
          <p>
            The TreeView component above is configured with the onExpand
            onCollapse callback props. Those callback functions
            are passed the id of the folder that the user expanded/collapsed.
            The user action and id of the folder that was last expanded or
            collapsed is logged above. The TreeView component is also configured with the
            onExpandAll and onCollapseAll callback props. Those callback functions are
            not passed any parameters and they log the user actions above.
          </p>
        </div>
        <div>
          <h3>Double-click Action Log</h3>
          <p>
            The TreeView component above is configured with the onDoubleClick callback prop.
            The callback function is passed the id of the folder or leaf item that the user
            double-clicked. The id of the row that was double-clicked is logged above.
          </p>
        </div>
        <div>
          <h3>Selection Action Log</h3>
          <div>
            The TreeView component above is configured with the onSelect, onUnselect,
            onSelectAll and onUnselectAll callback props. Those callback functions
            are passed a selection object which this page logs above. The
            selection object consists of the following:
            <ul>
              <li>
                User Action: the action that the user took: Select, Unselect, Select All, Unselect
                All.
              </li>
              <li>
                actionID: the id of the folder or leaf item that triggered the callback.
              </li>
              <li>
                isAllSelected: indicator as to whether all items in the tree are selected.
              </li>
              <li>
                currentSelections: array of the ids for all of the folders and leaf items
                that are currently selected.
              </li>
            </ul>
          </div>
        </div>
        <h2>Sample Code:</h2>
        {/* eslint-disable react/jsx-indent, max-len */}
        <code>
          const itemAction = (<br />
            <span style={{ marginLeft: '10px' }} >&lt;div&gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;Button text=&quot;Edit&quot; variant=&quot;utility&quot; isCompact onClick={editClickStr} icon={editIconStr} /&gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;Button text=&quot;Delete&quot; variant=&quot;utility&quot; isCompact onClick={trashClickStr} icon={trashIconStr} /&gt;</span><br />
            <span style={{ marginLeft: '10px' }} >&lt;/div&gt;</span><br />
          );<br />
          const alertAction = (<br />
            <span style={{ marginLeft: '10px' }} >&lt;div&gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;Button text=&quot;Alert&quot; variant=&quot;utility&quot; isCompact onClick={alertClickStr} icon={alertIconStr} /&gt;</span><br />
            <span style={{ marginLeft: '10px' }} >&lt;/div&gt;</span><br />
          );<br />
          const warningAction = (<br />
            <span style={{ marginLeft: '10px' }} >&lt;div&gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;Button text=&quot;Warning&quot; variant=&quot;utility&quot; isCompact onClick={warningClickStr} icon={warningIconStr} /&gt;</span><br />
            <span style={{ marginLeft: '10px' }} >&lt;/div&gt;</span><br />
          );<br />
          const folderIndicator = (<br />
            <span style={{ marginLeft: '10px' }} >&lt;div&gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;IconFolder /&gt;</span><br />
            <span style={{ marginLeft: '10px' }} >&lt;/div&gt;</span><br />
          );<br />
          const leafIndicator = (<br />
            <span style={{ marginLeft: '10px' }} >&lt;div&gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;IconPaperFolded /&gt;</span><br />
            <span style={{ marginLeft: '10px' }} >&lt;/div&gt;</span><br />
          );<br />
          const overdueFolderIndicator = (<br />
            <span style={{ marginLeft: '10px' }} >&lt;div&gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;IconFolder /&gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;IconOverDue /&gt;</span><br />
            <span style={{ marginLeft: '10px' }} >&lt;/div&gt;</span><br />
          );<br />
          const dueSoonLeafIndicator = (<br />
            <span style={{ marginLeft: '10px' }} >&lt;div&gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;IconPaperFolded  /&gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;IconDueSoon /&gt;</span><br />
            <span style={{ marginLeft: '10px' }} >&lt;/div&gt;</span><br />
          );<br />
          . . .<br />
          &lt;TreeView<br />
            <span style={{ marginLeft: '10px' }} >onexpand={onExpandPropStr}</span><br />
            <span style={{ marginLeft: '10px' }} >onCollapse={onCollapsePropStr}</span><br />
            <span style={{ marginLeft: '10px' }} >onExpandAll={onExpandAllPropStr}</span><br />
            <span style={{ marginLeft: '10px' }} >onCollapseAll={onCollapseAllPropStr}</span><br />
            <span style={{ marginLeft: '10px' }} >onSelect={onSelectPropStr}</span><br />
            <span style={{ marginLeft: '10px' }} >onUnselect={onUnselectPropStr}</span><br />
            <span style={{ marginLeft: '10px' }} >onSelectAll={onSelectAllPropStr}</span><br />
            <span style={{ marginLeft: '10px' }} >onUnselectAll={onUnselectAllPropStr}</span><br />
            <span style={{ marginLeft: '10px' }} >title=&quot;Test Tree&quot;</span><br />
            <span style={{ marginLeft: '10px' }} >selectionEnabled</span><br />
          &gt;<br />
        <span style={{ marginLeft: '10px' }} >&lt;TreeView.Item id=&quot;i1&quot; text=&quot;Item 1&quot; isInitiallySelected actions={warningActionsStr} indicators={dueSoonLeafIndicatorStr} className=&quot;warningRow&quot; /&gt;</span><br />
            <span style={{ marginLeft: '10px' }} >&lt;TreeView.Item id=&quot;i2&quot; text=&quot;Item 2&quot; actions={actionsStr} indicators={leafIndicatorStr} /&gt;</span><br />
            <span style={{ marginLeft: '10px' }} >&lt;TreeView.Folder id=&quot;f1&quot; text=&quot;Folder 1&quot; isInitiallySelected indicators={folderIndicatorStr} &gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;TreeView.Item id=&quot;f1_i1&quot; text=&quot;Folder 1 / Item 1&quot; actions={actionsStr} indicators={leafIndicatorStr} /&gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;TreeView.Item id=&quot;f1_i2&quot; text=&quot;Folder 1 / Item 2&quot; actions={actionsStr} indicators={leafIndicatorStr} /&gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;TreeView.Folder id=&quot;f1a&quot; text=&quot;Folder 1a&quot; indicators={folderIndicatorStr} &gt;</span><br />
                <span style={{ marginLeft: '30px' }} >&lt;TreeView.Item id=&quot;f1a_i1&quot; text=&quot;Folder 1a / Item 1&quot; actions={actionsStr} indicators={leafIndicatorStr} /&gt;</span><br />
                <span style={{ marginLeft: '30px' }} >&lt;TreeView.Item id=&quot;f1a_i2&quot; text=&quot;Folder 1a / Item 2&quot; actions={actionsStr} indicators={leafIndicatorStr} /&gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;/TreeView.Folder&gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;TreeView.Folder id=&quot;f1b&quot; text=&quot;Folder 1b&quot; indicators={folderIndicatorStr} &gt;</span><br />
                <span style={{ marginLeft: '30px' }} >&lt;TreeView.Item id=&quot;f1b_i1&quot; text=&quot;Folder 1b / Item 1&quot; actions={actionsStr} indicators={leafIndicatorStr} /&gt;</span><br />
                <span style={{ marginLeft: '30px' }} >&lt;TreeView.Item id=&quot;f1b_i2&quot; text=&quot;Folder 1b / Item 2&quot; actions={actionsStr} indicators={leafIndicatorStr} /&gt;</span><br />
                <span style={{ marginLeft: '30px' }} >&lt;TreeView.Folder id=&quot;f_1ba&quot; text=&quot;Folder 1ba with extra text to cause truncation&quot; actions={alertActionsStr} indicators={overdueFolderIndicatorStr} className=&quot;errorRow&quot; &gt;</span><br />
                  <span style={{ marginLeft: '40px' }} >&lt;TreeView.Item id=&quot;f1ba_i1&quot; text=&quot;Folder 1ba / Item 1&quot; actions={actionsStr} indicators={leafIndicatorStr} /&gt;</span><br />
                  <span style={{ marginLeft: '40px' }} >&lt;TreeView.Item id=&quot;f1ba_i2&quot; text=&quot;Folder 1ba / Item 2 with extra text to cause truncation&quot; actions={actionsStr} indicators={leafIndicatorStr} /&gt;</span><br />
                <span style={{ marginLeft: '30px' }} >&lt;/TreeView.Folder&gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;/TreeView.Folder&gt;</span><br />
            <span style={{ marginLeft: '10px' }} >&lt;/TreeView.Folder&gt;</span><br />
            <span style={{ marginLeft: '10px' }} >&lt;TreeView.Folder id=&quot;f2&quot; text=&quot;Folder 2&quot; actions={alertActionsStr} indicators={overdueFolderIndicatorStr} className=&quot;errorRow&quot; &gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;TreeView.Item id=&quot;f2_i1&quot; text=&quot;Folder 2 / Item 1&quot; actions={actionsStr} indicators={leafIndicatorStr} /&gt;</span><br />
            <span style={{ marginLeft: '10px' }} >&lt;/TreeView.Folder&gt;</span><br />
            <span style={{ marginLeft: '10px' }} >&lt;TreeView.Folder id=&quot;f3&quot; text=&quot;Folder 3&quot; indicators={folderIndicatorStr} &gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;TreeView.Item id=&quot;f3_i1&quot; text=&quot;Folder 3 / Item 1&quot; isInitiallySelected actions={warningActionsStr} indicators={dueSoonLeafIndicatorStr} className=&quot;warningRow&quot; /&gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;TreeView.Item id=&quot;f3_i2&quot; text=&quot;Folder 3 / Item 2&quot; isInitiallySelected actions={actionsStr} indicators={leafIndicatorStr} /&gt;</span><br />
            <span style={{ marginLeft: '10px' }} >&lt;/TreeView.Folder&gt;</span><br />
          &lt;/TreeView&gt;<br />
        </code>
        {/* eslint-enable react/jsx-indent, max-len */}
      </div>
    );
  }
}
