import {FormInstance} from "antd";
import { FormLabelAlign } from "antd/es/form/interface";
import {ReactNode} from "react";

export interface FormProps {
    form: FormInstance,
    formName: string,
}

export interface FormItemProps extends FormProps {
    name: any,
    disable?: boolean,
    required?: boolean,
    label?: ReactNode,
    labelAlign?: FormLabelAlign,
    extra?: ReactNode,
    marginBottom?: number,
    isSecondString?: boolean,
    bordered?: boolean,
    onFocus?: () => void,
    onBlur?: () => void
}