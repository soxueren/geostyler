import { TextEditor, TextEditorProps } from './TextEditor';
import TestUtil from '../../../Util/TestUtil';
import SymbolizerUtil from '../../../Util/SymbolizerUtil';
import en_US from '../../../locale/en_US';
import { TextSymbolizer } from 'geostyler-style';

describe('TextEditor', () => {

  let wrapper: any;
  let dummySymbolizer: TextSymbolizer = SymbolizerUtil.generateSymbolizer('Text') as TextSymbolizer;
  let onSymbolizerChangeDummy: jest.Mock;
  beforeEach(() => {
    onSymbolizerChangeDummy = jest.fn();
    const props: TextEditorProps = {
      symbolizer: dummySymbolizer as TextSymbolizer,
      locale: en_US.GsTextEditor,
      onSymbolizerChange: onSymbolizerChangeDummy
    };
    wrapper = TestUtil.shallowRenderComponent(TextEditor, props);
  });

  it('is defined', () => {
    expect(TextEditor).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

  describe('onLabelChange', () => {
    it('calls the onSymbolizerChange prop with correct symbolizer ', () => {
      const onLabelChange = wrapper.instance().onLabelChange;
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.label = 'Peter {{age}} Pan';
      onLabelChange('Peter {{age}} Pan');
      expect(onSymbolizerChangeDummy).toBeCalledWith(newSymbolizer);
    });
  });

  describe('onColorChange', () => {
    it('calls the onSymbolizerChange prop with correct symbolizer ', () => {
      const onColorChange = wrapper.instance().onColorChange;
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.color = '#00AA00';
      onColorChange('#00AA00');
      expect(onSymbolizerChangeDummy).toBeCalledWith(newSymbolizer);
    });
  });

  describe('onFontChange', () => {
    it('calls the onSymbolizerChange prop with correct symbolizer ', () => {
      const onFontChange = wrapper.instance().onFontChange;
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.font = ['Arial', 'Times new Roman'];
      onFontChange(['Arial', 'Times new Roman']);
      expect(onSymbolizerChangeDummy).toBeCalledWith(newSymbolizer);
    });
  });

  describe('onOpacityChange', () => {
    it('calls the onOpacityChange prop with correct symbolizer ', () => {
      const onOpacityChange = wrapper.instance().onOpacityChange;
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.opacity = 0.7;
      onOpacityChange(0.7);
      expect(onSymbolizerChangeDummy).toBeCalledWith(newSymbolizer);
    });
  });

  describe('onSizeChange', () => {
    it('calls the onSizeChange prop with correct symbolizer ', () => {
      const onSizeChange = wrapper.instance().onSizeChange;
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.size = 7;
      onSizeChange(7);
      expect(onSymbolizerChangeDummy).toBeCalledWith(newSymbolizer);
    });
  });

  describe('onOffsetXChange', () => {
    it('calls the onOffsetXChange prop with correct symbolizer ', () => {
      const onOffsetXChange = wrapper.instance().onOffsetXChange;
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.offset = [7, 0];
      onOffsetXChange(7);
      expect(onSymbolizerChangeDummy).toBeCalledWith(newSymbolizer);
    });
  });

  describe('onOffsetYChange', () => {
    it('calls the onOffsetYChange prop with correct symbolizer ', () => {
      const onOffsetYChange = wrapper.instance().onOffsetYChange;
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.offset = [0, 8];
      onOffsetYChange(8);
      expect(onSymbolizerChangeDummy).toBeCalledWith(newSymbolizer);
    });
  });

  describe('onRotateChange', () => {
    it('calls the onRotateChange prop with correct symbolizer ', () => {
      const onRotateChange = wrapper.instance().onRotateChange;
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.rotate = 45;
      onRotateChange(45);
      expect(onSymbolizerChangeDummy).toBeCalledWith(newSymbolizer);
    });
  });

  describe('onHaloColorChange', () => {
    it('calls the onHaloColorChange prop with correct symbolizer ', () => {
      const onHaloColorChange = wrapper.instance().onHaloColorChange;
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.haloColor = '#FFAA00';
      onHaloColorChange('#FFAA00');
      expect(onSymbolizerChangeDummy).toBeCalledWith(newSymbolizer);
    });
  });

  describe('onHaloWidthChange', () => {
    it('calls the onHaloWidthChange prop with correct symbolizer ', () => {
      const onHaloWidthChange = wrapper.instance().onHaloWidthChange;
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.haloWidth = 12;
      onHaloWidthChange(12);
      expect(onSymbolizerChangeDummy).toBeCalledWith(newSymbolizer);
    });
  });

});
