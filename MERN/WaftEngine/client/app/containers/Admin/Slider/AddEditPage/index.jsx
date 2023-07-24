import { useEffect, useState } from 'react';
import {
  FaArrowsAlt,
  FaCheck,
  FaImage,
  FaTimes,
  FaTrash,
} from 'react-icons/fa';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc';
import { createStructuredSelector } from 'reselect';
import Button from '../../../../components/Basic/Button';
import Checkbox from '../../../../components/Basic/Checkbox';
import TextArea from '../../../../components/Basic/TextArea';
import TextField from '../../../../components/Basic/TextField';
import CKEditor from '../../../../components/CkEditor';
import Dialog from '../../../../components/Dialog/index';
import Loading from '../../../../components/Loading';
import PageContent from '../../../../components/PageContent/PageContent';
import PageHeader from '../../../../components/PageHeader/PageHeader';
import { useInjectReducer } from '../../../../hooks/useInjectReducer';
import { useInjectSaga } from '../../../../hooks/useInjectSaga';
import arrayMove from '../../../../utils/arrayMove';
import { IMAGE_BASE } from '../../../App/constants';
import EditorFileSelect from '../../../EditorFileSelect';
import * as mapDispatchToProps from '../actions';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectErrors,
  makeSelectLoading,
  makeSelectMedia,
  makeSelectOne,
} from '../selectors';

const DragHandle = SortableHandle(() => (
  <span className="hover:bg-blue-100 cursor-move w-8 h-8 inline-flex justify-center items-center rounded-full">
    <FaArrowsAlt className="text-base transform scale-110 text-blue-500" />
  </span>
));

const SortableImageItem = SortableElement(({ value }) => (
  <div className="bg-gray-50 rounded p-4 border"> {value}</div>
));

const SortableImageList = SortableContainer(
  ({
    items,
    _this,
    handleSetImage,
    handleImageLinkChange,
    setOneValue,
    handleRemoveSlide,
    state,
    handleImageEditorChange,
  }) => (
    <div>
      {items.map((value, index) => (
        <div
          key={`${value._id}-item-image-${index}`}
          className="bg-gray-200 rounded mt-2"
        >
          <SortableImageItem
            index={index}
            _this={_this}
            value={
              <>
                <div className="flex">
                  <div className="w-1/4">
                    <label>Image</label>
                    {value.image ? (
                      <div
                        className="h-32 overflow-hidden"
                        onClick={handleSetImage(index)}
                      >
                        <img
                          src={
                            typeof value.image === 'string'
                              ? `${IMAGE_BASE}${state.files[value.image].path}`
                              : `${IMAGE_BASE}${value.image.path}`
                          }
                          className="object-fit"
                        />
                      </div>
                    ) : (
                      <div
                        className="bg-white border border-gray-300 hover:border-gray-400 flex items-center justify-center text-gray-300 hover:text-gray-500 h-32 cursor-pointer"
                        onClick={handleSetImage(index)}
                      >
                        <FaImage className="text-4xl" />
                      </div>
                    )}
                    <TextField
                      label={'Link'}
                      className={'mt-4'}
                      id={`slider-link-${index}`}
                      type="text"
                      value={value.link || ''}
                      onChange={handleImageLinkChange(index)}
                    />
                  </div>
                  <div className="flex-1 px-2">
                    <CKEditor
                      description={value.description}
                      label={'Description'}
                      getValue={handleImageEditorChange}
                      forArray={index}
                    />
                  </div>
                  <div className="w-10 flex flex-col justify-center items-center py-px">
                    <DragHandle className="text-lg text-blue-500" />
                    <span
                      className="icon-trash"
                      onClick={() => handleRemoveSlide(index)}
                    >
                      <FaTrash />
                    </span>
                  </div>
                </div>
              </>
            }
          />
        </div>
      ))}
    </div>
  ),
);
const key = 'sliderManagePage';

const AddEdit = (props) => {
  const { one, classes, media, match, loading, errors, setArrayValue } = props;

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [state, setState] = useState({
    open: false,
    index: -1,
    files: {},
    fullWidth: true,
    maxWidth: 'lg',
  });

  const { id: routeID } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    props.clearErrors();
    if (routeID) {
      props.loadOneRequest(routeID);
    }
  }, []);

  const handleOpen = () => {
    setState({ ...state, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const handleChange = (name) => (event) => {
    event.persist();
    props.setOneValue({ key: name, value: event.target.value });
  };

  const handleImageCaptionChange = (index) => (event) => {
    event.persist();
    const tempImages = [...props.one.images];
    tempImages[index] = { ...tempImages[index], caption: event.target.value };
    props.setOneValue({ key: 'images', value: tempImages });
  };

  const handleImageLinkChange = (index) => (event) => {
    event.persist();

    setArrayValue({ key: 'link', index, value: event.target.value });
  };

  const handleImageEditorChange = ({ index, value }) => {
    if (setArrayValue) {
      setArrayValue({ key: 'description', index, value });
    }
  };

  const handleImageImageChange = (file) => {
    setArrayValue({ key: 'image', index: state.index, value: file._id });

    setState((state) => ({
      open: false,
      index: -1,
      files: { ...state.files, [file._id]: file },
    }));
  };

  const handleAddSlide = () => {
    let tempImages = [...props.one.images];
    let newSlide = { image: '', link: '', caption: '' };
    props.setOneValue({
      key: 'images',
      value: [newSlide, ...tempImages],
    });
  };

  const handleRemoveSlide = (index) => {
    let tempImages = [...props.one.images];
    props.setOneValue({
      key: 'images',
      value: [...tempImages.slice(0, index), ...tempImages.slice(index + 1)],
    });
  };

  const handleSetImage = (index) => () => {
    setState({ ...state, open: true, index });
  };

  const handleGoBack = () => {
    navigate('/admin/slider-manage');
  };

  const handleSave = () => {
    props.addEditRequest();
  };

  const handleImagePagination = (query) => {
    props.loadMediaRequest(query);
  };

  const onImageSortEnd = ({ oldIndex, newIndex }) => {
    props.setOneValue({
      key: 'images',
      value: arrayMove(props.one.images, oldIndex, newIndex),
    });
  };

  const handleEditorChange = (e, index, name) => {
    const newContent = e.editor.getData();
    const tempImages = [...props.one.images];
    tempImages[index] = { ...tempImages[index], caption: newContent };
    props.setOneValue({ key: 'images', value: tempImages });
  };
  const handleSliderChange = (name) => (event) => {
    event.persist();
    if (name === 'slidesPerRow') {
      if (Number(event.target.value) > 6) {
        props.setSliderValue({ key: name, value: 6 });
      } else if (Number(event.target.value) < 1) {
        props.setSliderValue({ key: name, value: 1 });
      } else {
        props.setSliderValue({
          key: name,
          value: Number(event.target.value),
        });
      }
    } else {
      props.setSliderValue({ key: name, value: event.target.value });
    }
  };

  const handleCheckedChange = (name) => (event) => {
    event.persist();
    props.setSliderValue({ key: name, value: event.target.checked });
  };
  // media next prev logic
  const lastPage = Math.ceil(media.totaldata / media.size);
  const firstPage = 1;
  const isFirstPage = media.page === firstPage;
  const isLastPage = media.page === lastPage;

  return loading ? (
    <Loading />
  ) : (
    <>
      <PageHeader
        title={routeID ? 'Edit Slider' : 'Add Slider'}
        back="/admin/slider-manage"
        actions={
          <>
            <Button onClick={handleGoBack} variant="secondary">
              <FaTimes className="mr-1" /> Cancel
            </Button>
            <Button variant="success" onClick={handleSave}>
              <FaCheck className="mr-1" /> Save Slide
            </Button>
          </>
        }
      ></PageHeader>
      <PageContent>
        <TextField
          className="md:w-1/2"
          label="Slider Name"
          id="slider-name"
          type="text"
          value={one.slider_name}
          onChange={handleChange('slider_name')}
          error={errors.slider_name}
        />

        <TextField
          className="md:w-1/2 mt-4"
          label="Slider Key"
          id="slider_key"
          type="text"
          value={one.slider_key}
          onChange={handleChange('slider_key')}
          error={errors.slider_key}
        />

        <h3 className="text-base mt-10">Slider Settings</h3>
        <Checkbox
          handleChange={handleCheckedChange('arrows', null)}
          checked={one.slider_setting.arrows || false}
          id="arrows"
          name="arrows"
          type="checkbox"
          label="Arrows"
        />
        <Checkbox
          handleChange={handleCheckedChange('dots', null)}
          checked={one.slider_setting.dots || false}
          id="dots"
          name="dots"
          type="checkbox"
          label="Dots"
        />
        <Checkbox
          label="Center Mode"
          name="centerMode"
          id="centerMode"
          handleChange={handleCheckedChange('centerMode', null)}
          checked={one.slider_setting.centerMode || false}
        />
        <Checkbox
          label="AutoPlay"
          name="autoplay"
          id="autoplay"
          handleChange={handleCheckedChange('autoplay', null)}
          checked={one.slider_setting.autoplay || false}
        />
        <Checkbox
          label="Responsive"
          name="responsive"
          id="responsive"
          handleChange={handleCheckedChange('responsive', null)}
          checked={one.slider_setting.responsive || false}
        />
        <div className="grid grid-cols-4 gap-4 max-w-2xl mt-10">
          <TextField
            type="number"
            value={one.slider_setting.slidesToShow}
            name="slidesToShow"
            id="slidesToShow"
            onChange={handleSliderChange('slidesToShow')}
            error={errors.slidesToShow}
            label="Slides To Show"
          />

          <TextField
            type="number"
            value={one.slider_setting.slidesToScroll}
            name="slidesToScroll"
            id="slidesToScroll"
            onChange={handleSliderChange('slidesToScroll')}
            error={errors.slidesToScroll}
            label="Slides To Scroll"
          />
          <TextField
            type="number"
            value={one.slider_setting.slidesPerRow}
            name="slidesPerRow"
            id="slidesPerRow"
            onChange={handleSliderChange('slidesPerRow')}
            error={errors.slidesPerRow}
            label="Slides Per Row"
          />
          <TextField
            type="number"
            value={one.slider_setting.autoplaySpeed}
            name="autoplaySpeed"
            id="autoplaySpeed"
            onChange={handleSliderChange('autoplaySpeed')}
            error={errors.autoplaySpeed}
            label="AutoPlay Speed(ms)"
          />
        </div>
        {one.slider_setting.responsive && (
          <TextArea
            className="mt-4"
            label="Responsive Settings"
            value={one.settings || ''}
            handleChange={handleChange('settings')}
            placeholder="Enter Settings"
          />
        )}

        <div>
          <SortableImageList
            items={one.images}
            _this={this}
            onSortEnd={onImageSortEnd}
            useDragHandle
            handleEditorChange={handleEditorChange}
            handleImageLinkChange={handleImageLinkChange}
            handleRemoveSlide={handleRemoveSlide}
            handleImageEditorChange={handleImageEditorChange}
            handleSetImage={handleSetImage}
            setOneValue={props.setOneValue}
            state={state}
          />
        </div>

        <div>
          <div className="mt-4">
            <Button onClick={handleAddSlide} variant="primary">
              Add Slide
            </Button>
          </div>
        </div>
      </PageContent>

      <Dialog
        fullScreen
        open={state.open}
        onClose={handleClose}
        title={`Select Media`}
        body={
          <div>
            <EditorFileSelect
              location={location}
              selectFile={(file) => handleImageImageChange(file)}
            />
          </div>
        }
      />
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  media: makeSelectMedia(),
  loading: makeSelectLoading(),
  errors: makeSelectErrors(),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddEdit);
