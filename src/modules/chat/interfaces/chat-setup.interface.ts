export interface IChatSetupOptionResponse {
  ID: number;
  Name: string;
  CreatedAt: string;
  SubModulesTypeID: number;
  SubModulesTypeName: string;
}

export interface IChatSetupOptionsItem {
  id: number;
  name: string;
  createdAt: string;
}

export interface IChatSetupSubmoduleItem {
  id: number;
  name: string;
  typeId: number;
  typeName: string;
}

export interface IChatSetupModuleItem extends IChatSetupOptionsItem {
  submodules: IChatSetupSubmoduleItem[];
}
