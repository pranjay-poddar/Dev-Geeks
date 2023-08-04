import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { FaCheck, FaExchangeAlt, FaTimes } from 'react-icons/fa';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import Button from '../../../../components/Basic/Button';
import PageContent from '../../../../components/PageContent/PageContent';
import PageHeader from '../../../../components/PageHeader/PageHeader';
import { useInjectReducer } from '../../../../hooks/useInjectReducer';
import { useInjectSaga } from '../../../../hooks/useInjectSaga';
import * as mapDispatchToProps from '../actions';
import reducer from '../reducer';
import saga from '../saga';
import { makeSelectAccess, makeSelectLoading } from '../selectors';

const key = 'adminModuleManage';

const AccessManagePage = (props) => {
  const { id: routeID } = useParams();
  const navigate = useNavigate();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    props.loadAccessRequest(routeID);
  }, []);

  const handleSave = () => {
    props.updateAccessRequest(routeID);
  };

  const handleBack = () => {
    navigate('/admin/module-manage');
  };
  const handleEditAccess = () => {
    props.clearOne();
    navigate(`/admin/module-manage/edit/${routeID}`);
  };

  const handleAccessUpdate = (module_id, roleId, ModuleId, singlePath) => {
    props.setAccessUpdate({
      module_id,
      roleId,
      ModuleId,
      singlePath,
    });
  };

  const {
    access: { Roles, Module, Access },
    loading,
  } = props;
  return loading && loading == true ? (
    <div className="circular_loader waftloader"></div>
  ) : (
    <>
      <Helmet>
        <title>Module Access</title>
      </Helmet>
      <PageHeader
        title={`Edit Access for ${Module.module_name}`}
        back="/admin/module-manage"
        actions={
          <>
            <Button onClick={handleBack} variant="error">
              <FaTimes /> Cancel
            </Button>
            <Button variant={'primary'} onClick={handleEditAccess}>
              <FaExchangeAlt />
              Change Routes
            </Button>
            <Button variant={'success'} onClick={handleSave}>
              <FaCheck />
              Save
            </Button>
          </>
        }
      />

      <PageContent>
        {Roles.map((role) => {
          const accessFiltered = Access.filter(
            (each) => each.role_id === role._id,
          );
          let accesses = [];
          if (accessFiltered.length > 0) {
            accesses = [...accessFiltered[0].access_type];
          }
          return (
            <div className="mb-4 border rounded mt-6 p-2" key={role._id}>
              <h3
                className="font-bold bg-white px-2 relative text-lg ml-2 inline-block"
                style={{ top: -21 }}
              >
                {role.role_title}
              </h3>
              <div value={accesses}>
                {Module.path.map((eachPath) => (
                  <div
                    className={`bg-white text-sm px-2 py-1 inline-flex mr-2 mb-2 rounded border lowercase cursor-pointer hover:bg-blue-100 hover:border-blue-200 hover:text-blue-500 ${
                      accesses.includes(eachPath._id)
                        ? 'border-secondary bg-secondary text-white'
                        : ''
                    }`}
                    key={`${eachPath._id}-${role._id}`}
                    value={eachPath._id}
                    onClick={(_, module_id) =>
                      handleAccessUpdate(
                        accesses,
                        role._id,
                        Module._id,
                        eachPath._id,
                      )
                    }
                  >
                    {eachPath.access_type}{' '}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </PageContent>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  access: makeSelectAccess(),
  loading: makeSelectLoading(),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccessManagePage);
