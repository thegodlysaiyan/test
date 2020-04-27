import React from 'react';
import Button from 'terra-button';
import Checkbox from 'terra-form-checkbox';
import Menu from 'terra-menu';
import IconEdit from 'terra-icon/lib/icon/IconEdit';
import IconTrash from 'terra-icon/lib/icon/IconTrash';
import IconAlert from 'terra-icon/lib/icon/IconAlert';
import TreeView from '../../TreeView';

export default class ActionsSection extends React.Component {
  constructor(props) {
    super(props);
    this.handleFolderExpand = this.handleFolderExpand.bind(this);
    this.handleFolderCollapse = this.handleFolderCollapse.bind(this);
    this.handleExpandAll = this.handleExpandAll.bind(this);
    this.handleCollapseAll = this.handleCollapseAll.bind(this);
    this.handleEditOnClick = this.handleEditOnClick.bind(this);
    this.handleTrashOnClick = this.handleTrashOnClick.bind(this);
    this.handleAlertOnClick = this.handleAlertOnClick.bind(this);
    this.handleMenuButtonClick = this.handleMenuButtonClick.bind(this);
    this.handleMenuRequestClose = this.handleMenuRequestClose.bind(this);
    this.setMenuButtonNode = this.setMenuButtonNode.bind(this);
    this.getMenuButtonNode = this.getMenuButtonNode.bind(this);
    this.handleBeginHover = this.handleBeginHover.bind(this);
    this.handleSelectionEnabledCheckboxChange =
      this.handleSelectionEnabledCheckboxChange.bind(this);
    this.state = {
      userAction: '',
      actionId: '',
      menuOpen: false,
      selectionEnabled: true,
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

  setMenuButtonNode(node) {
    this.buttonNode = node;
  }

  getMenuButtonNode() {
    return this.buttonNode;
  }

  handleMenuButtonClick() {
    this.setState({ menuOpen: true });
  }

  handleMenuRequestClose() {
    this.setState({ menuOpen: false });
    if (this.state.endHoverCallBack) {
      this.state.endHoverCallBack();
    }
  }

  handleFolderExpand(id) {
    this.setState({
      userAction: 'Expand folder',
      actionId: id,
    });
  }

  handleFolderCollapse(id) {
    this.setState({
      userAction: 'Collapse folder',
      actionId: id,
    });
  }

  handleExpandAll() {
    this.setState({
      userAction: 'Expand all folders',
      actionId: 'N/A',
    });
  }

  handleCollapseAll() {
    this.setState({
      userAction: 'Collapse all folders',
      actionId: 'N/A',
    });
  }

  handleBeginHover(endHoverCallBack) {
    this.setState({
      endHoverCallBack,
    });
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
  /* eslint-enable class-methods-use-this, no-alert */

  handleSelectionEnabledCheckboxChange() {
    this.setState({
      selectionEnabled: !this.state.selectionEnabled,
      renderCount: this.state.renderCount + 1,
    });
  }

  render() {
    const onExpandPropStr = '{this.handleFolderExpand}';
    const onCollapsePropStr = '{this.handleFolderCollapse}';
    const onExpandAllPropStr = '{this.handleExpandAll}';
    const onCollapseAllPropStr = '{this.handleCollapseAll}';
    const onClickStr = '{this.handleEditOnClick}';
    const iconStr = '{<IconEdit />}';
    const actionsStr = '{itemAction}';
    let menuAction = (
      <div style={{ display: 'inline-block' }} ref={this.setMenuButtonNode}>
        <Menu
          isOpen={this.state.menuOpen}
          targetRef={this.getMenuButtonNode}
          onRequestClose={this.handleMenuRequestClose}
          contentWidth="240"
          isArrowDisplayed
        >
          <Menu.Item
            text="Toggle Item 1"
            key="Toggle1"
            isSelectable
          />
          <Menu.Item
            text="Toggle Item 2"
            key="Toggle2"
            isSelectable
          />
          <Menu.Divider key="Divider2" />
          <Menu.Item text="Close Action" key="Action2" onClick={this.handleMenuRequestClose} />
        </Menu>
        <Button onClick={this.handleMenuButtonClick} text="Menu" />
      </div>
    );
    if (!this.state.selectionEnabled) {
      menuAction = null;
    }
    return (
      <div>
        <h1>TreeView Structure - Action Section Usage</h1>
        <p>
          This page shows how the actions section of folders and leaf items can be
          populated in the TreeView component. The `actions` prop can be provided on the
          TreeView.Folder and TreeView.Item JSX tags.  The prop must consist of a react node.
          For example, the node could be a DIV element that contains zero, one or more
          Terra Buttons.  In this example, the leaf items show two Terra Buttons containing Terra
          IconEdit and IconTrsh icons. The `Folder 2` folder shows a Terra Button containing
          a Terra IconAlert. The application component provides the click handlers for the buttons.
          The TreeView component has no involvement in what happens when the user clicks the action
          buttons.  NOTE: The actions section will be visible when the leaf item is selected or when
          the user hovers the mouse over the leaf item row (regardless of whether selection is
          enabled or not).
        </p>
        <p>
          Because the action buttons are controlled by the application, the TreeView component
          has no knowledge of the contents of the actions section and has no control over the
          behavior within it.  It is the responsibility of the application to provide a mechanism
          to connect the elements in the actions section with the row so that any handler that
          responds to an event such as a click in the actions section can have access to the row
          for which the action is to occur.  In this example, the `id` that is assigned to the
          folder / leaf item is also assigned in the `name` custom prop on the action buttons for
          each row.  The click handler for the buttons then accepts the click event object and can
          get the row id from the buttons name attribute: event.currentTarget.name.
        </p>
        <p>
          In the example below, Folder 1 has an action button that when clicked will show a Terra
          Menu.  If you click this button while the folder is not selected the hover state (light
          blue background color and visible action button) is still active.  However, the hover
          state is still active when the Terra Menu is closed as well because the folder row
          never received a mouseLeave event.  To address this, the TreeView component accepts a
          `onBeginHover` prop. This application example provides a callback function to the
          `onBeginHover` prop. So, when the mouse moves over a folder or leaf item, the callback
          function is called and passed a TreeView function reference that when called will force
          the hover state to be removed from the folder / leaf item. So, the application saves this
          TreeView function in its state and when the Terra Menu is closed, it calls the function
          to clear the hover state from the row.
        </p>
        <br />
        <div
          style={{
              width: '300px',
              height: '300px',
          }}
        >
          <TreeView
            title="Test TreeView - Action Section"
            selectionEnabled={this.state.selectionEnabled}
            onExpand={this.handleFolderExpand}
            onCollapse={this.handleFolderCollapse}
            onExpandAll={this.handleExpandAll}
            onCollapseAll={this.handleCollapseAll}
            onBeginHover={this.handleBeginHover}
            key={this.state.renderCount}
          >
            <TreeView.Item id="i1" text="Item 1" actions={this.getItemActions('i1')} />
            <TreeView.Item id="i2" text="Item 2" actions={this.getItemActions('i2')} />
            <TreeView.Folder id="f1" text="Folder 1" actions={menuAction} >
              <TreeView.Item id="f1_i1" text="Folder 1 / Item 1" actions={this.getItemActions('f1_i1')} />
              <TreeView.Item id="f1_i2" text="Folder 1 / Item 2" actions={this.getItemActions('f1_i2')} />
              <TreeView.Folder id="f1a" text="Folder 1a" >
                <TreeView.Item id="f1a_i1" text="Folder 1a / Item 1" actions={this.getItemActions('f1a_i1')} />
                <TreeView.Item id="f1a_i2" text="Folder 1a / Item 2" actions={this.getItemActions('f1a_i2')} />
              </TreeView.Folder>
              <TreeView.Folder id="f1b" text="Folder 1b" >
                <TreeView.Item id="f1b_i1" text="Folder 1b / Item 1" actions={this.getItemActions('f1b_i1')} />
                <TreeView.Item id="f1b_i2" text="Folder 1b / Item 2" actions={this.getItemActions('f1b_i2')} />
                <TreeView.Folder id="f1ba" text="Folder 1ba with extra text to cause truncation" actions={this.getAlertAction('f1ba')} >
                  <TreeView.Item id="f1ba_i1" text="Folder 1ba / Item 1" actions={this.getItemActions('f1ba_i1')} />
                  <TreeView.Item id="f1ba_i2" text="Folder 1ba / Item 2 with extra text to cause truncation" actions={this.getItemActions('f1ba_i2')} />
                </TreeView.Folder>
              </TreeView.Folder>
            </TreeView.Folder>
            <TreeView.Folder id="f2" text="Folder 2" actions={this.getAlertAction('f2')} >
              <TreeView.Item id="f2_i1" text="Folder 2 / Item 1" actions={this.getItemActions('f2_i1')} />
            </TreeView.Folder>
            <TreeView.Folder id="f3" text="Folder 3" >
              <TreeView.Item id="f3_i1" text="Folder 3 / Item 1" actions={this.getItemActions('f3_i1')} />
              <TreeView.Item id="f3_i2" text="Folder 3 / Item 2" actions={this.getItemActions('f3_i2')} />
            </TreeView.Folder>
          </TreeView>
          <div>
            <Checkbox
              labelText="Selection Enabled"
              isInline
              checked={this.state.selectionEnabled}
              onChange={this.handleSelectionEnabledCheckboxChange}
            />
          </div>
        </div>
        <br />
        <h3>Expand/Collapse Action Log</h3>
        <p>
          The TreeView component above is configured with the onExpand
          onCollapse callback props. Those callback functions
          are passed the id of the folder that the user expanded/collapsed.
          The user action and id of the folder that was last expanded or
          collapsed is logged here. The TreeView component is also configured with the
          onExpandAll and onCollapseAll callback props. Those callback functions are
          not passed any parameters and they log the user actions here.
        </p>
        <div style={{ border: '1px solid black', padding: '5px' }}>
          <p id="userAction">User Action: {this.state.userAction}</p>
          <p id="actionId">Action ID: {this.state.actionId}</p>
        </div>
        <h2>Sample Code:</h2>
        {/* eslint-disable react/jsx-indent, max-len */}
        <code>
          const itemAction = (<br />
            <span style={{ marginLeft: '10px' }} >&lt;div&gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;Button text=&quot;Edit&quot; variant=&quot;utility&quot; isCompact onClick={onClickStr} icon={iconStr} /&gt;</span><br />
            <span style={{ marginLeft: '10px' }} >&lt;/div&gt;</span><br />
          );<br />
          . . .<br />
        &lt;TreeView title=&quot;Test Tree - Indicator Section&quot; selectionEnabled onexpand={onExpandPropStr} onCollapse={onCollapsePropStr} onExpandAll={onExpandAllPropStr} onCollapseAll={onCollapseAllPropStr}&gt;<br />
            <span style={{ marginLeft: '10px' }} >&lt;TreeView.Folder text=&quot;Folder 1&quot; id=&quot;f1&quot; &gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;TreeView.Item text=&quot;Folder 1 / Item 1&quot; actions={actionsStr} id=&quot;f1_i1&quot; /&gt;</span>;<br />
            <span style={{ marginLeft: '10px' }} >&lt;/TreeView.Folder&gt;</span><br />
          &lt;/TreeView&gt;<br />
        </code>
        {/* eslint-enable react/jsx-indent, max-len */}
      </div>
    );
  }
}
