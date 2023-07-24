/* eslint-disable no-underscore-dangle */
import PropTypes from 'prop-types';
import React from 'react';
import { FaTrash } from 'react-icons/fa';
import SelectField from '../../../../../components/Basic/Select';
import TextField from '../../../../../components/Basic/TextField';

const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

const Path = (props) => {
  const {
    each,
    classes,
    pathIndex,
    handleAccessTypeChange,
    handleAdminRoutesChange,
    handleRemoveAdminRoute,
    handleAddAdminRoute,
    handleServerRoutesMethodChange,
    handleServerRoutesRouteChange,
    handleRemoveServerRoute,
    handleAddServerRoute,
    handleRemovePath,
  } = props;

  const methodOptions = methods.map((each) => {
    let obj = {
      label: each,
      value: each,
    };
    return obj;
  });

  let listMethodNormalized = {};

  let listMethod = methodOptions.map((each) => {
    let obj = {
      label: each.label,
      value: each.value,
    };

    listMethodNormalized = {
      ...listMethodNormalized,
      [each.value]: obj,
    };
    return obj;
  });

  return (
    <section className="rounded border p-4 mb-2">
      <div className="flex items-center">
        <TextField
          placeholder="Access Type"
          id={`${each._id}-access-type-${pathIndex}`}
          value={each.access_type}
          handleChange={handleAccessTypeChange(pathIndex)}
          className="md:w-1/2 pb-2"
        />
        <button
          className="icon-trash mx-4"
          onClick={handleRemovePath(pathIndex)}
        >
          <FaTrash className="text-red-500" />
        </button>
      </div>

      <div className="bg-gray-100 flex justify-between p-2 rounded">
        <div className="w-1/2 border-r">
          <div className="flex mb-2">
            <label className="label tracking-wide text-gray-800 text-xs pl-4">
              Client Route
            </label>
          </div>
          {(each.admin_routes || []).map((eachAdminRoute, index) => (
            <div
              className="w-full pb-1 pl-4"
              key={`${each._id}-${pathIndex}-each-admin-route-${index}`}
            >
              <div className="flex items-center">
                <TextField
                  className="flex-1 mr-2"
                  id={`${each._id}-each-admin-route-access-type-${index}`}
                  value={eachAdminRoute}
                  handleChange={handleAdminRoutesChange(pathIndex, index)}
                />
                <span
                  className="icon-trash mx-4"
                  onClick={handleRemoveAdminRoute(pathIndex, index)}
                >
                  <FaTrash />
                </span>
              </div>
            </div>
          ))}
          <div className="mt-2">
            <button
              className="py-1 px-2 text-sm rounded font-bold text-primary  mx-4"
              onClick={handleAddAdminRoute(pathIndex)}
            >
              Add Client Route
            </button>
          </div>
        </div>
        <div className="w-1/2">
          <div className="flex mb-2">
            <label className="tracking-wide text-gray-800 text-xs pl-4">
              Method
            </label>
            <label className="tracking-wide text-gray-800 text-xs pl-10">
              Server Route
            </label>
          </div>
          {(each.server_routes || []).map((eachServerRoute, index) => (
            <div
              className="w-full pb-1 pl-4"
              key={`${each._id}-${pathIndex}-${eachServerRoute._id}-each-server-route-${index}`}
            >
              <div className="flex">
                <div className="mr-2">
                  <SelectField
                    className="w-28"
                    placeholder="Method"
                    value={listMethodNormalized[eachServerRoute.method] || null}
                    onChange={handleServerRoutesMethodChange(pathIndex, index)}
                    options={listMethod}
                  />
                </div>
                <div className="flex items-center w-full">
                  <TextField
                    className="mr-2 flex-1"
                    id={`${each._id}-${eachServerRoute._id}-each-admin-server-route-route-access-type-${index}`}
                    value={eachServerRoute.route}
                    handleChange={handleServerRoutesRouteChange(
                      pathIndex,
                      index,
                    )}
                  />
                  <span
                    className="icon-trash mx-4"
                    onClick={handleRemoveServerRoute(pathIndex, index)}
                  >
                    <FaTrash />
                  </span>
                </div>
              </div>
            </div>
          ))}

          <div className="mt-2">
            <button
              className="py-1 text-sm rounded font-bold text-primary  mx-4"
              onClick={handleAddServerRoute(pathIndex)}
            >
              Add Server Route
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

Path.propTypes = {
  each: PropTypes.object.isRequired,
  pathIndex: PropTypes.number.isRequired,
  handleAccessTypeChange: PropTypes.func.isRequired,
  handleAdminRoutesChange: PropTypes.func.isRequired,
  handleRemoveAdminRoute: PropTypes.func.isRequired,
  handleAddAdminRoute: PropTypes.func.isRequired,
  handleServerRoutesMethodChange: PropTypes.func.isRequired,
  handleServerRoutesRouteChange: PropTypes.func.isRequired,
  handleRemoveServerRoute: PropTypes.func.isRequired,
  handleAddServerRoute: PropTypes.func.isRequired,
  handleRemovePath: PropTypes.func.isRequired,
};

export default Path;
