interface IComponentAuth {
  editable: boolean;
  entityId: string;
  readable: string;
}
interface IComponentInfoBasic {
  chooseModel: boolean;
  isDefaultValuePadding: boolean;
  isEncrypt: boolean;
  isThirdStorage: boolean;
  maxLength: number;
  required: boolean;
  title: string;
  colorstyle: string;
  placeholder: string;
  urllink: string;
  extensions: any;
  defaultValue: string;
  options: { label: string; value: string }[];
}
interface IComponentInfoAdvancedInfo {
  conditions: [];
}
interface IComponentInfo {
  entityName: string;
  entityTitle: string;
  entityId: string;
  isEncrypt: number;
  isRequiredEntity: number;
  isThirdStorage: number;
  entityBasicConfig: IComponentInfoBasic;
  entityAdvancedConfig: IComponentInfoAdvancedInfo;
}

interface IFormInfo {
  basicConfig: {
    comment: boolean;
    matterType: string;
    processCategory: string;
    processId: string;
    processName: string;
    thirdStorageUrl: string;
  };
  cc: boolean;
  formAuth: IComponentAuth[];
  formInfoList: IComponentInfo[];
}
