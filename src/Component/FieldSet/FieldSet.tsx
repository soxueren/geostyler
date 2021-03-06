import * as React from 'react';
import { Checkbox } from 'antd';

import './FieldSet.less';

// default props
interface FieldSetDefaultProps {
  /** Check/uncheck Checkbox */
  checked: boolean;
}

// non default props
export interface FieldSetProps extends Partial<FieldSetDefaultProps> {
  /** Title to be rendered on top of the FieldSet */
  title?: string;
  /** Callback function for onChange of the checkbox  */
  onCheckChange?: (e: any) => void;
}

/**
 * A container for grouping sets of fields similar to a HTML fieldset element.
 * A title and a checkbox will be rendered on the top border of the component.
 */
export class FieldSet extends React.Component<FieldSetProps> {

  constructor(props: FieldSetProps) {
    super(props);
  }

  public static defaultProps: FieldSetDefaultProps = {
    checked: true
  };

  /**
   * Toggles the state according to the checkbox check state.
   */
  onCheckChange = (e: any) => {
    if (this.props.onCheckChange) {
      this.props.onCheckChange(e);
    }
  }

  render() {

    const {
      children,
      checked,
      title
    } = this.props;

    return (

        <fieldset className="gs-fieldset">
          <legend>
            <Checkbox
              checked={checked}
              onChange={this.onCheckChange}
            >
              {title}
            </Checkbox>
          </legend>
          {React.Children.map(children, (child, i) => {
            // Ignore all childs if checkbox is unchecked
            if (checked) {
              return child;
            }
            return undefined;
          })}
        </fieldset>

    );
  }
}

export default FieldSet;
