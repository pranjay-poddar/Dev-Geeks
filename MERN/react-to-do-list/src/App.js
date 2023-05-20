import React, {Component} from 'react';
import sortBy from 'sort-by';
import {CSSTransitionGroup} from 'react-transition-group';
import SwipeableViews from 'react-swipeable-views';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import CheckIcon from 'material-ui/svg-icons/action/check-circle';
import ListIcon from 'material-ui/svg-icons/action/list';
import TodoIcon from 'material-ui/svg-icons/action/today';
import EditIcon from 'material-ui/svg-icons/action/delete';
import CloseIcon from 'material-ui/svg-icons/content/delete-sweep';
import ColumnList from './ColumnList';
import ConfirmDialog from './ConfirmDialog';
import If from './If';
import './App.css';

/**
 * @description Main App component.
 * @constructor
 * @param {Object} props - The props that were defined by the caller of this component.
 */
class App extends Component {
	constructor(props) {
		super(props);

		/**
		 * @typedef {Object} ComponentState
		 * @property {Object[]} items - All list items of the app.
		 * @property {number} taskIdCounter - The index of the last task added.
		 * @property {boolean} submitDisabled - Indicates whether submit is disabled.
		 * @property {number} slideIndex - The index of the tab component.
		 * @property {boolean} dialogOpen - Visibility of the clear tasks dialog.
		 * @property {boolean} removeMode - Indicates if the remove mode is active.
		 */

		/** @type {ComponentState} */
		this.state = {
			items: [],
			taskIdCounter: 0,
			submitDisabled: true,
			slideIndex: 0,
			dialogOpen: false,
			removeMode: false,
		};
	}

	/**
	 * Lifecycle event handler called just after the App loads into the DOM.
	 * Get any saved items and taskIdCounter from the local storage and setup state with it.
	 */
	componentWillMount() {
		const toDoListItems = window.localStorage.getItem('toDoListItems') || '[]';
		const taskIdCounter = window.localStorage.getItem('taskIdCounter') || 0;
		//Get
		this.setState(
			{
				items: JSON.parse(toDoListItems),
				taskIdCounter: taskIdCounter,
			}
		);
	}

	/**
	 * @description Add task to the To Do list.
	 */
	addTask = () => {
		const input = this.taskInput.input || {};
		const { value = '' } = input;

		if (value === '') return;

		this.setState(previousState => {
			const { items = [] } = previousState;
			const { taskIdCounter = 0 } = previousState;
			const taskId = taskIdCounter+1;
			const newTask = {
				id: taskId,
				title: value,
				status: 'To Do'
			};
			items.push(newTask);
			return {
				items: items.sort(sortBy('id')),
				submitDisabled: true,
				taskIdCounter: taskId,
			}
		}, function stateUpdateComplete() {
			this.taskInput.input.value = '';
			this.updateLocalStorageItems(this.state.items);
			this.updateTaskCounter(this.state.taskIdCounter);
		}.bind(this));
	};

	/**
	 * @description Update task toggling between To Do/Done status.
	 * @param {Object} task - The task to be updated
	 */
	handleUpdateTask = (task) => {
		this.setState(previousState => {
			const { items } = previousState;
			const filteredItems = items.filter( item => item.id !== task.id);
			task.status = (task.status === 'To Do') ? 'Done' : 'To Do';
			filteredItems.push(task);
			return {
				items: filteredItems.sort(sortBy('id'))
			}
		}, function stateUpdateComplete() {
			this.updateLocalStorageItems(this.state.items);
		}.bind(this));
	};

	/**
	 * @description Remove task.
	 * @param {Object} task - The task to be removed.
	 */
	handleRemoveTask = (task) => {
		this.setState(previousState => {
			const { items } = previousState;
			const filteredItems = items.filter( item => item.id !== task.id);
			return {
				items: filteredItems.sort(sortBy('id'))
			}
		}, function stateUpdateComplete() {
			this.updateLocalStorageItems(this.state.items);
		}.bind(this));
	};

	/**
	 * @description Handle the Account Key TextField input change. It enable the submit button if field is not empty or
	 * disable it otherwise.
	 * @param {Object} event - On click event object
	 * @param {value} value - The task description
	 */
	handleTextFieldChange = (event, value) => {
		if((value.length > 0) && this.state.submitDisabled){
			this.setState({submitDisabled: false});
		}
		else if((value.length === 0) && !this.state.submitDisabled){
			this.setState({submitDisabled: true});
		}
	};

	/**
	 * @description Save items to local storage.
	 * @param {Object[]} items - Array of items/tasks to be saved.
	 */
	updateLocalStorageItems = (items) => {
		window.localStorage.setItem('toDoListItems', JSON.stringify(items));
	};

	/**
	 * @description Update current taskId into local storage.
	 * @param {number} taskCounter - Id of the task to be saved at local storage.
	 */
	updateTaskCounter = (taskCounter) => {
		window.localStorage.setItem('taskIdCounter', taskCounter);
	};

	/**
	 * @description Handle the tab change.
	 * @param {number} value - The index of the Tab.
	 */
	handleChange = (value) => {
		this.setState({
			slideIndex: value,
		}, function stateUpdateComplete() {
			// Fix scroll in swipe transitions
			window.scrollTo(0, 0);
		});
	};


	/**
	 * @description Enable the remove task mode.
	 */
	enableRemoveMode = () => {
		if (!this.state.removeMode) {
			this.setState({removeMode: true});
		}
	};

	/**
	 * @description Disable the remove task mode.
	 */
	disableRemoveMode = () => {
		if (this.state.removeMode) {
			this.setState({removeMode: false});
		}
	};

	/**
	 * @description Remove all tasks from the App.
	 */
	clearTasks = () => {
		this.handleDialogClose();
		this.setState({removeMode: false, items: []}, function stateUpdateComplete() {
			// Update local storage
			this.updateLocalStorageItems(this.state.items);
		});
	};

	/**
	 * @description Open the clear tasks dialog.
	 */
	handleDialogOpen = () => {
		this.setState({dialogOpen: true});
	};

	/**
	 * @description Close the clear task dialog.
	 */
	handleDialogClose = () => {
		this.setState({dialogOpen: false});
	};

	/**
	 * @description Handle the enter key pressed under the add task input.
	 * @param {Object} e - Key press event
	 */
	keyPress = (e) => {
		// If Enter key
		if(e.keyCode === 13){
			// Call method to add the task if not empty
			this.addTask();
			// put the login here
		}
	};

	render() {
		const { items = [] }  = this.state;
		const columns = [
			{ title: 'To Do', items: items.filter( item => item.status === 'To Do'), icon: <TodoIcon />},
			{ title: 'Done', items: items.filter( item => item.status === 'Done'), icon: <CheckIcon />},
			{ title: 'All', items, icon: <ListIcon />},
		];
		return (
			<MuiThemeProvider>
				<div className="App">
					{/* Clear Tasks Confirmation Dialog */}
					<ConfirmDialog
						title="Clear All Tasks"
						message={'Are you sure you want to remove all tasks from the App?'}
						onCancel={this.handleDialogClose}
						onConfirm={this.clearTasks}
						open={this.state.dialogOpen}
					/>
					<AppBar
						title={<span style={{color: 'white'}}>To-Do List</span>}
						showMenuIconButton={false}
						style={{backgroundColor: 'rgb(0, 151, 167)', position: 'fixed', zIndex: 9999,}}
					/>
					<div className="App-container">
						<div style={{position: 'fixed', width: '100%', paddingTop: 64, zIndex: 8888, backgroundColor: 'white'}}>
							<TextField
								hintText="Type task"
								floatingLabelText="Add Task"
								ref={(taskInput) => {
									this.taskInput = taskInput;
								}}
								disabled={this.state.removeMode}
								style={{margin: 10, width: '60%', maxWidth: 300}}
								onChange={this.handleTextFieldChange}
								onKeyDown={this.keyPress}
							/>
							<RaisedButton
								style={{margin: 10, width: '30%', maxWidth: 56}}
								label="Create"
								onClick={this.addTask}
								disabled={this.state.submitDisabled} />
							<Tabs
								onChange={this.handleChange}
								value={this.state.slideIndex}
							>
								{columns.map((column,index) => (
									<Tab
										key={index}
										value={index}
										icon={column.icon}
										label={
											<div>
												{column.title} ({(column.title !== 'All') ? column.items.filter(item => item.status === column.title).length: items.length})
											</div>
										}
									/>
								))}
							</Tabs>
						</div>
						<div className="app-separator">-</div>
						<CSSTransitionGroup
							transitionName="remove-mode-animation"
							transitionEnterTimeout={300}
							transitionLeaveTimeout={300}>
							{this.state.removeMode &&
								<div className="remove-mode">
									<RaisedButton
									label="Delete All Tasks"
									secondary={true}
									onClick={this.handleDialogOpen}
									/>
								</div>
							}
							<div className="app-lists">
								<SwipeableViews
									index={this.state.slideIndex}
									onChangeIndex={this.handleChange}
									style={{width: '100%'}}
								>
									{columns.map((column,index) => (
										<div
											className="swipeable-views"
											key={index}>
											<ColumnList
												title={column.title}
												items={column.items}
												updateTask={this.handleUpdateTask}
												removeTask={this.handleRemoveTask}
												removeMode={this.state.removeMode}
											/>
										</div>
									))}
								</SwipeableViews>
							</div>
						</CSSTransitionGroup>
					</div>
					<div className="enable-remove-mode">
						<If test={!this.state.removeMode}>
							<FloatingActionButton onClick={this.enableRemoveMode}>
								<EditIcon />
							</FloatingActionButton>
						</If>
						<If test={this.state.removeMode}>
							<FloatingActionButton secondary={true} onClick={this.disableRemoveMode}>
								<CloseIcon />
							</FloatingActionButton>
						</If>
					</div>
				</div>
			</MuiThemeProvider>
		);
	}
}

export default App;
