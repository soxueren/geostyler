import * as React from 'react';

import { Select } from 'antd';
const Option = Select.Option;
const _isEqual = require('lodash/isEqual');

import {
  Style as GsStyle,
  Style,
  StyleParser
} from 'geostyler-style';

import UploadButton, { CustomRequest } from '../../UploadButton/UploadButton';

import { localize } from '../../LocaleWrapper/LocaleWrapper';
import en_US from '../../../locale/en_US';

// i18n
export interface StyleLoaderLocale {
  label: string;
  uploadButtonLabel: string;
}

// default props
interface StyleLoaderDefaultProps {
  /** The callback method that is triggered when the state changes */
  onStyleRead: (style: GsStyle) => void;
  /** Locale object containing translated text snippets */
  locale: StyleLoaderLocale;
}

// non default props
export interface StyleLoaderProps extends Partial<StyleLoaderDefaultProps> {
  /** List of data parsers to use */
  parsers: StyleParser[];
}

// state
interface StyleLoaderState {
  activeParser?: StyleParser;
}

export class StyleLoader extends React.Component<StyleLoaderProps, StyleLoaderState> {

  constructor(props: StyleLoaderProps) {
    super(props);
    this.state = {};
  }

  public shouldComponentUpdate(nextProps: StyleLoaderProps, nextState: StyleLoaderState): boolean {
    const diffProps = !_isEqual(this.props, nextProps);
    const diffState = !_isEqual(this.state, nextState);
    return diffProps || diffState;
  }

  static componentName: string = 'StyleLoader';

  public static defaultProps: StyleLoaderDefaultProps = {
    locale: en_US.GsStyleLoader,
    onStyleRead: (style: GsStyle) => {return; }
  };

  parseStyle = async (uploadObject: CustomRequest): Promise<Style|undefined> => {
    const {
      activeParser
    } = this.state;
    if (!activeParser) {
      return undefined;
    }
    const file = uploadObject.file as File;
    let fileContent;
    try {
      fileContent = await this.readFile(file);
    } catch (error) {
      uploadObject.onError(error);
      return error;
    }

    try {
      const style = await activeParser.readStyle(fileContent);
      uploadObject.onSuccess(uploadObject.file);
      this.props.onStyleRead(style);
      return style;
    } catch (error) {
      uploadObject.onError(error);
      return error;
    }
  }

  readFile = async (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const fileContent = reader.result;
        resolve(fileContent);
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }

  getParserOptions = () => {
    return this.props.parsers.map((parser: any) => {
      return <Option key={parser.title} value={parser.title}>{parser.title}</Option>;
    });
  }

  onSelect = (selection: string) => {
    const activeParser = this.props.parsers.find(parser => parser.title === selection);
    if (activeParser) {
      this.setState({activeParser});
    }
  }

  render() {
    const {
      activeParser
    } = this.state;

    const {
      locale
    } = this.props;

    return (
      <div className={activeParser ? 'gs-dataloader-right' : ''}>
        {locale.label}
        <Select
          style={{ width: 300 }}
          onSelect={this.onSelect}
        >
          {this.getParserOptions()}
        </Select>
        {
          activeParser ?
          <UploadButton
            onUpload={this.parseStyle}
          /> : null
        }
      </div>
    );
  }
}

export default localize(StyleLoader, StyleLoader.componentName);
