import React from 'react';
import PropTypes from 'prop-types';
import {CSSTransitionGroup} from 'react-transition-group';
import Checkbox from 'material-ui/Checkbox';
import {List, ListItem} from 'material-ui/List';
import MobileTearSheet from './MobileTearSheet';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import './ColumnList.css';

/**
 * This object is used for type checking the props of the component.
 */
const propTypes = {
	title: PropTypes.string.isRequired,
	items: PropTypes.array,
	updateTask: PropTypes.func.isRequired,
	removeTask: PropTypes.func.isRequired,
	removeMode: PropTypes.bool,
};

/**
 * This object sets default values to the optional props.
 */
const defaultProps = {
	items: [],
	removeMode: [],
};

/**
 * This callback type is called `removeTask` and is displayed as a global symbol.
 *
 * @callback removeTask
 * @param {Object} event - The event generate by remove click.
 */

/**
 * This callback type is called `updateTask` and is displayed as a global symbol.
 *
 * @callback updateTask
 * @param {Object} target - The event generate by onChange.
 * @param {Object} item - The item to be updated.
 */

/**
 * @description Represents the column list element.
 * @param {Object} props - The props that were defined by the caller of this component.
 * @param {string} props.title - The title of this column list.
 * @param {Object[]} [props.items=[]] - The array of tasks/items of the list.
 * @param {removeTask} props.removeTask - Callback executed when user click to remove the task.
 * @param {updateTask} props.updateTask - Callback executed when when user the done checkbox.
 * @param {boolean} [props.removeMode=false] - Indicates whether the app is in remove mode.
 * @returns {XML} Return the stateless component markup
 * @constructor
 */
const ColumnList = (props) => {
	return (
		<div className="column-list">
			<MobileTearSheet style={{pading: 10}}>
				<List>
					<CSSTransitionGroup
						transitionName="task-animation"
						transitionEnterTimeout={500}
						transitionLeaveTimeout={300}>
						{props.items.map(item => (
							<ListItem
								key={item.id+item.title}
								onClick={() => (props.removeMode ? props.removeTask(item) : props.updateTask(item))}
								rightIcon={props.removeMode ? <DeleteIcon /> :
									<DeleteIcon style={{visibility: 'hidden'}} />}
							>
								<Checkbox
									label={item.title}
									disabled={props.removeMode}
									checked={item.status === 'Done'}
									className={(item.status === 'Done') ? 'task-done': ''}
								/>
							</ListItem>
						))}
					</CSSTransitionGroup>
				</List>
			</MobileTearSheet>
		</div>
	)
};

// Type checking the props of the component
ColumnList.propTypes = propTypes;

// Assign default values to the optional props
ColumnList.defaultProps = defaultProps;

export default ColumnList;
