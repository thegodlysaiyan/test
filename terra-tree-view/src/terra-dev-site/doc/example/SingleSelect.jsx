import React from 'react';
import Checkbox from 'terra-form-checkbox';
import Button from 'terra-button';
import IconEdit from 'terra-icon/lib/icon/IconEdit';
import IconTrash from 'terra-icon/lib/icon/IconTrash';
import IconAlert from 'terra-icon/lib/icon/IconAlert';
import CollapsibleMenuView from 'terra-collapsible-menu-view';
import SingleSelectTreeView from '../../SingleSelectTreeView';

export default class SingleSelect extends React.Component {
  constructor(props) {
    super(props);
    this.handleFolderExpand = this.handleFolderExpand.bind(this);
    this.handleOnSelect = this.handleOnSelect.bind(this);
    this.handleDoubleClickHandlerChange = this.handleDoubleClickHandlerChange.bind(this);
    this.handleEditOnClick = this.handleEditOnClick.bind(this);
    this.handleTrashOnClick = this.handleTrashOnClick.bind(this);
    this.handleAlertOnClick = this.handleAlertOnClick.bind(this);
    this.handleBeginHover = this.handleBeginHover.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.state = {
      f_2_data_loaded: false,
      selectedId: 'i1',
      doubleClickHandler: false,
    };
  }

  handleFolderExpand(id) {
    switch (id) {
      case 'f2':
        this.setState({ f_2_data_loaded: true });
        break;
      default:
        break;
    }
  }

  handleOnSelect(id) {
    this.setState({
      selectedId: id,
    });
  }

  handleDoubleClickHandlerChange() {
    this.setState({
      doubleClickHandler: !this.state.doubleClickHandler,
    });
  }

  handleBeginHover(endHoverCallBack) {
    this.setState({
      endHoverCallBack,
    });
  }

  handleMenuClick() {
    if (this.state.endHoverCallBack) {
      this.state.endHoverCallBack();
    }
  }

  /* eslint-disable class-methods-use-this, no-alert */
  handleDoubleClick(id) {
    alert(`double click ${id}`);
  }

  handleEditOnClick() {
    alert('Edit button clicked');
  }

  handleTrashOnClick() {
    alert('Trash button clicked');
  }

  handleAlertOnClick() {
    alert('Alert button clicked');
  }
  /* eslint-enable class-methods-use-this, no-alert */

  render() {
    const itemAction = (
      <div>
        <Button text="Edit" variant="utility" isCompact onClick={this.handleEditOnClick} style={{ width: '25px' }} icon={<IconEdit />} />
        <Button text="Edit" variant="utility" isCompact onClick={this.handleTrashOnClick} style={{ width: '25px' }} icon={<IconTrash />} />
      </div>
    );
    const alertAction = (
      <div>
        <Button text="Edit" variant="utility" isCompact onClick={this.handleAlertOnClick} style={{ width: '25px' }} icon={<IconAlert />} />
      </div>
    );
    const menuAction = (
      <div>
        <CollapsibleMenuView>
          <CollapsibleMenuView.Item
            text="Menu Button"
            key="MenuButton 2"
            shouldCloseOnClick={false}
            subMenuItems={[
              <CollapsibleMenuView.Item text="Menu Item 1" key="defaultItem1" onClick={this.handleMenuClick} />,
              <CollapsibleMenuView.Item text="Menu Item 2" key="defaultItem2" onClick={this.handleMenuClick} />,
            ]}
          />
        </CollapsibleMenuView>
      </div>
    );
    let folder2Contents = null;
    if (this.state.f_2_data_loaded) {
      folder2Contents = <SingleSelectTreeView.Item id="f2_i1" text="Folder 2 / Item 1" actions={itemAction} />;
    }
    const onSelectPropStr = '{this.handleOnSelect}';
    const editClickStr = '{this.handleEditOnClick}';
    const trashClickStr = '{this.handleTrashOnClick}';
    const alertClickStr = '{this.handleAlertOnClick}';
    const editIconStr = '{<IconEdit />}';
    const trashIconStr = '{<IconTrash />}';
    const alertIconStr = '{<IconAlert />}';
    const actionsStr = '{itemAction}';
    const alertActionsStr = '{alertAction}';
    return (
      <div>
        <h1>TreeView - Single Selection Model</h1>
        <div>
          This page shows how the the TreeView component single selection
          model works. To use the single selection model, you should use the
          &lt;SingleSelectTreeView&gt; component, which is considered `uncontrolled`.
          This means that the consuming application component has no control over the selections
          within the &lt;SingleSelectTreeView&gt; component.  The component manages the selections
          itself. The single selection behavior is as follows:
          <ul>
            <li>
              The user can click anywhere on a folder or item row (except the folder chevron and
              actions) in order to select a row.  There are no checkboxes for selection.
            </li>
            <li>
              Selecting a folder does not select its descendants.
            </li>
            <li>
              There is no mechanism to unselect a row in the &lt;SingleSelectTreeView&gt; component.
              When you click on a folder/item, the previously selected folder/item is unselected.
            </li>
          </ul>
        </div>
        <br />
        <div
          style={{
              width: '300px',
              height: '300px',
          }}
        >
          <SingleSelectTreeView
            onExpand={this.handleFolderExpand}
            onSelect={this.handleOnSelect}
            title="Test TreeView - Single Selection"
            onDoubleClick={this.state.doubleClickHandler ? this.handleDoubleClick : null}
            onBeginHover={this.handleBeginHover}
          >
            <SingleSelectTreeView.Item id="i1" text="Item 1" actions={itemAction} />
            <SingleSelectTreeView.Item id="i2" text="Item 2" actions={itemAction} />
            <SingleSelectTreeView.Folder id="f1" text="Folder 1" >
              <SingleSelectTreeView.Item id="f1_i1" text="Folder 1 / Item 1" actions={itemAction} />
              <SingleSelectTreeView.Item id="f1_i2" text="Folder 1 / Item 2" actions={itemAction} />
              <SingleSelectTreeView.Folder id="f1a" text="Folder 1a">
                <SingleSelectTreeView.Item id="f1a_i1" text="Folder 1a / Item 1" actions={itemAction} />
                <SingleSelectTreeView.Item id="f1a_i2" text="Folder 1a / Item 2" actions={itemAction} />
              </SingleSelectTreeView.Folder>
              <SingleSelectTreeView.Folder id="f1b" text="Folder 1b" actions={alertAction}>
                <SingleSelectTreeView.Item id="f1b_i1" text="Folder 1b / Item 1" isInitiallySelected actions={itemAction} />
                <SingleSelectTreeView.Item id="f1b_i2" text="Folder 1b / Item 2" actions={itemAction} />
                <SingleSelectTreeView.Folder id="f_1ba" text="Folder 1ba with extra text to cause truncation" actions={menuAction}>
                  <SingleSelectTreeView.Item id="f1ba_i1" text="Folder 1ba / Item 1" actions={itemAction} />
                  <SingleSelectTreeView.Item id="f1ba_i2" text="Folder 1ba / Item 2 with extra text to cause truncation" actions={itemAction} />
                </SingleSelectTreeView.Folder>
              </SingleSelectTreeView.Folder>
            </SingleSelectTreeView.Folder>
            <SingleSelectTreeView.Folder id="f2" text="Folder 2" actions={menuAction} >
              {folder2Contents}
            </SingleSelectTreeView.Folder>
            <SingleSelectTreeView.Folder id="f3" text="Folder 3">
              <SingleSelectTreeView.Item id="f3_i1" text="Folder 3 / Item 1" isInitiallySelected actions={itemAction} />
              <SingleSelectTreeView.Item id="f3_i2" text="Folder 3 / Item 2" actions={itemAction} />
            </SingleSelectTreeView.Folder>
            <SingleSelectTreeView.Folder id="f4" text="Folder 4" />
            <SingleSelectTreeView.Folder id="f5" text="Folder 5" isEmpty />
          </SingleSelectTreeView>
        </div>
        <br />
        <div>
          <Checkbox
            labelText="Enable double-click handler"
            isInline
            checked={this.state.doubleClickHandler}
            onChange={this.handleDoubleClickHandlerChange}
          />
        </div>
        <div>
          <h3>Selection Action Log</h3>
          <div>
            The SingleSelectTreeView component above is configured with the onSelect callback prop.
            That callback is passed the id of the selected folder/item which this page logs
            below.
          </div>
          <div style={{ border: '1px solid black', padding: '5px' }}>
            <p id="selectedId">Selected ID: {this.state.selectedId}</p>
          </div>
        </div>
        <h2>Sample Code:</h2>
        <div>
          In code for the above SingleSelectTreeView component is shown here. It is configured with
          the following features;
          <ul>
            <li>The single selection model is in effect because the &lt;SingleSelectTreeView&gt;
              component is used.
            </li>
            <li>
              The title `Test TreeView - Single Selection` is displayed in the component header.
            </li>
            <li>
              Folder 1b / Item 1 is initially selected because its isInitiallySelected prop is set
              to true.  Note that on the initial rendering of the component, the appropriate
              folders are expanded so that the selected row is visible, and the selected row is
              scrolled into view.
            </li>
            <li>
              The application is informed when the following occurs via the
              callback props provided.
              <ul>
                <li>onSelect: when a folder or leaf item is selected</li>
              </ul>
            </li>
            <li>
              The actions prop is configured for all leaf items and for a couple of folders so that
              action buttons are displayed on those rows when the row is selected or when the user
              hovers the mouse over the row.
            </li>
          </ul>
        </div>
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
          . . .<br />
          &lt;SingleSelectTreeView<br />
            <span style={{ marginLeft: '10px' }} >onSelect={onSelectPropStr}</span><br />
            <span style={{ marginLeft: '10px' }} >title=&quot;Test Tree&quot;</span><br />
          &gt;<br />
            <span style={{ marginLeft: '10px' }} >&lt;SingleSelectTreeView.Item id=&quot;i1&quot; text=&quot;Item 1&quot; actions={actionsStr} /&gt;</span><br />
            <span style={{ marginLeft: '10px' }} >&lt;SingleSelectTreeView.Item id=&quot;i2&quot; text=&quot;Item 2&quot; actions={actionsStr} /&gt;</span><br />
            <span style={{ marginLeft: '10px' }} >&lt;SingleSelectTreeView.Folder id=&quot;f1&quot; text=&quot;Folder 1&quot; &gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;SingleSelectTreeView.Item id=&quot;f1_i1&quot; text=&quot;Folder 1 / Item 1&quot; actions={actionsStr} /&gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;SingleSelectTreeView.Item id=&quot;f1_i2&quot; text=&quot;Folder 1 / Item 2&quot; actions={actionsStr} /&gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;SingleSelectTreeView.Folder id=&quot;f1a&quot; text=&quot;Folder 1a&quot;&gt;</span><br />
                <span style={{ marginLeft: '30px' }} >&lt;SingleSelectTreeView.Item id=&quot;f1a_i1&quot; text=&quot;Folder 1a / Item 1&quot; actions={actionsStr} /&gt;</span><br />
                <span style={{ marginLeft: '30px' }} >&lt;SingleSelectTreeView.Item id=&quot;f1a_i2&quot; text=&quot;Folder 1a / Item 2&quot; actions={actionsStr} /&gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;/SingleSelectTreeView.Folder&gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;SingleSelectTreeView.Folder id=&quot;f1b&quot; text=&quot;Folder 1b&quot;&gt;</span><br />
                <span style={{ marginLeft: '30px' }} >&lt;SingleSelectTreeView.Item id=&quot;f1b_i1&quot; text=&quot;Folder 1b / Item 1&quot; actions={actionsStr} isInitiallySelected /&gt;</span><br />
                <span style={{ marginLeft: '30px' }} >&lt;SingleSelectTreeView.Item id=&quot;f1b_i2&quot; text=&quot;Folder 1b / Item 2&quot; actions={actionsStr} /&gt;</span><br />
                <span style={{ marginLeft: '30px' }} >&lt;SingleSelectTreeView.Folder id=&quot;f_1ba&quot; text=&quot;Folder 1ba with extra text to cause truncation&quot; actions={alertActionsStr} &gt;</span><br />
                  <span style={{ marginLeft: '40px' }} >&lt;SingleSelectTreeView.Item id=&quot;f1ba_i1&quot; text=&quot;Folder 1ba / Item 1&quot; actions={actionsStr} /&gt;</span><br />
                  <span style={{ marginLeft: '40px' }} >&lt;SingleSelectTreeView.Item id=&quot;f1ba_i2&quot; text=&quot;Folder 1ba / Item 2 with extra text to cause truncation&quot; actions={actionsStr} /&gt;</span><br />
                <span style={{ marginLeft: '30px' }} >&lt;/SingleSelectTreeView.Folder&gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;/SingleSelectTreeView.Folder&gt;</span><br />
            <span style={{ marginLeft: '10px' }} >&lt;/SingleSelectTreeView.Folder&gt;</span><br />
            <span style={{ marginLeft: '10px' }} >&lt;SingleSelectTreeView.Folder id=&quot;f2&quot; text=&quot;Folder 2&quot; actions={alertActionsStr} &gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;SingleSelectTreeView.Item id=&quot;f2_i1&quot; text=&quot;Folder 2 / Item 1&quot; actions={actionsStr} /&gt;</span><br />
            <span style={{ marginLeft: '10px' }} >&lt;/SingleSelectTreeView.Folder&gt;</span><br />
            <span style={{ marginLeft: '10px' }} >&lt;SingleSelectTreeView.Folder id=&quot;f3&quot; text=&quot;Folder 3&quot;&gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;SingleSelectTreeView.Item id=&quot;f3_i1&quot; text=&quot;Folder 3 / Item 1&quot; actions={actionsStr} /&gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;SingleSelectTreeView.Item id=&quot;f3_i2&quot; text=&quot;Folder 3 / Item 2&quot; actions={actionsStr} /&gt;</span><br />
            <span style={{ marginLeft: '10px' }} >&lt;/SingleSelectTreeView.Folder&gt;</span><br />
            <span style={{ marginLeft: '10px' }} >&lt;SingleSelectTreeView.Folder id=&quot;f4&quot; text=&quot;Folder 4&quot; /&gt;</span><br />
            <span style={{ marginLeft: '10px' }} >&lt;SingleSelectTreeView.Folder id=&quot;f5&quot; text=&quot;Folder 5&quot; isEmpty /&gt;</span><br />
          &lt;/SingleSelectTreeView&gt;<br />
        </code>
        {/* eslint-enable react/jsx-indent, max-len */}
      </div>
    );
  }
}
